import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BookingsViewProps {
    onBookCoach: (coach: any) => void;
}

interface Booking {
    id: string;
    coach: string;
    specialty: string;
    image: string;
    date: string;
    duration: string;
    location: string;
    status: string;
    price: string;
}

export const BookingsView = ({ onBookCoach }: BookingsViewProps) => {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("upcoming");

    const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
    const [pastBookings, setPastBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
        
        // Listen for booking creation events
        const handleBookingCreated = () => {
            fetchBookings();
        };
        
        window.addEventListener('bookingCreated', handleBookingCreated);
        
        return () => {
            window.removeEventListener('bookingCreated', handleBookingCreated);
        };
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            
            if (sessionError || !session || !session.user) {
                console.error("No session found:", sessionError);
                setLoading(false);
                return;
            }

            const userId = session.user.id;
            console.log("Fetching bookings for user:", userId);

            // Fetch schedules where user_id matches current user
            const { data: schedules, error } = await supabase
                .from('schedules')
                .select('*')
                .eq('user_id', userId)
                .order('date', { ascending: true })
                .order('time', { ascending: true });

            if (error) {
                console.error("Error fetching schedules:", error);
                throw error;
            }

            console.log("Fetched schedules:", schedules);

            if (schedules && schedules.length > 0) {
                console.log("Processing", schedules.length, "schedules");
                
                // Fetch coach profiles
                const coachIds = [...new Set(schedules.map(s => s.created_by))];
                let coachMap = new Map();

                if (coachIds.length > 0) {
                    const { data: coaches } = await supabase
                        .from('profiles')
                        .select('user_id, full_name, photo_url')
                        .in('user_id', coachIds);

                    coachMap = new Map(coaches?.map(c => [c.user_id, c]) || []);
                }

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const upcoming: Booking[] = [];
                const past: Booking[] = [];

                schedules.forEach(schedule => {
                    const scheduleDate = new Date(schedule.date);
                    const coach = coachMap.get(schedule.created_by);

                    // Extract coach name from title if format is "Coach Name - Specialty"
                    let coachName = coach?.full_name || "Unknown Coach";
                    let specialty = schedule.title;
                    
                    if (schedule.title && schedule.title.includes(" - ")) {
                        const parts = schedule.title.split(" - ");
                        coachName = parts[0] || coachName;
                        specialty = parts[1] || schedule.title;
                    }

                    const booking: Booking = {
                        id: schedule.id,
                        coach: coachName,
                        specialty: specialty,
                        image: coach?.photo_url || "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop",
                        date: `${new Date(schedule.date).toLocaleDateString()}${schedule.time ? ` at ${schedule.time.slice(0, 5)}` : ''}`,
                        duration: "60 min", // Hardcoded for now
                        location: schedule.description || "Gym Floor",
                        status: "confirmed", // Hardcoded
                        price: "" // Hidden
                    };

                    if (scheduleDate >= today) {
                        upcoming.push(booking);
                    } else {
                        past.push(booking);
                    }
                });

                console.log("Upcoming bookings:", upcoming.length, "Past bookings:", past.length);
                setUpcomingBookings(upcoming);
                setPastBookings(past);
            } else {
                console.log("No schedules found");
                setUpcomingBookings([]);
                setPastBookings([]);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
            toast({
                title: "Error",
                description: "Failed to load bookings.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id: string) => {
        try {
            const { error } = await supabase
                .from('schedules')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setUpcomingBookings(prev => prev.filter(booking => booking.id !== id));
            toast({
                title: "Booking Cancelled",
                description: "Your session has been successfully cancelled.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to cancel booking.",
                variant: "destructive"
            });
        }
    };

    const handleBookAction = (booking: Booking) => {
        // Transform booking data to match Coach interface expected by BookingModal
        const coachData = {
            name: booking.coach,
            specialty: booking.specialty,
            image: booking.image,
            price: booking.price
        };
        onBookCoach(coachData);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "confirmed":
                return <Badge className="bg-green-500 hover:bg-green-600">Confirmed</Badge>;
            case "pending":
                return <Badge variant="outline" className="text-yellow-500 border-yellow-500">Pending</Badge>;
            case "completed":
                return <Badge variant="secondary">Completed</Badge>;
            case "cancelled":
                return <Badge variant="destructive">Cancelled</Badge>;
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    return (
        <Card className="glass-card col-span-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Your Bookings
                </CardTitle>
                <CardDescription>
                    Manage your upcoming sessions and view your training history
                </CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Loading bookings...</p>
                    </div>
                ) : (
                <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="past">History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming" className="space-y-4 animate-fade-in">
                        {upcomingBookings.length > 0 ? (
                            upcomingBookings.map((booking) => (
                                <div key={booking.id} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-secondary/30 border border-border hover:border-primary/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                                            <img src={booking.image} alt={booking.coach} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-semibold text-lg">{booking.coach}</h4>
                                            <p className="text-sm text-primary">{booking.specialty}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground md:hidden">
                                                {getStatusBadge(booking.status)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 items-center mt-2 md:mt-0">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <span>{booking.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="w-4 h-4 text-muted-foreground" />
                                            <span>{booking.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPin className="w-4 h-4 text-muted-foreground" />
                                            <span>{booking.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-3 mt-2 md:mt-0 md:border-l md:pl-4 border-border">
                                        <div className="hidden md:block">
                                            {getStatusBadge(booking.status)}
                                        </div>
                                        <div className="flex gap-2 w-full md:w-auto">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 md:flex-none text-destructive hover:text-destructive hover:bg-destructive/10"
                                                onClick={() => handleCancel(booking.id)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="flex-1 md:flex-none bg-primary/10 text-primary hover:bg-primary/20"
                                                onClick={() => handleBookAction(booking)}
                                            >
                                                Reschedule
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                <p>No upcoming bookings found</p>
                                <Button
                                    variant="link"
                                    className="text-primary mt-2"
                                    onClick={() => {
                                        const trainersSection = document.getElementById('trainers');
                                        if (trainersSection) {
                                            trainersSection.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    Book a session now
                                </Button>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="past" className="space-y-4 animate-fade-in">
                        {pastBookings.map((booking) => (
                            <div key={booking.id} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-secondary/10 border border-border/50">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full overflow-hidden grayscale opacity-80 shrink-0">
                                        <img src={booking.image} alt={booking.coach} className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">{booking.coach}</h4>
                                        <p className="text-xs text-muted-foreground">{booking.date}</p>
                                    </div>
                                </div>

                                <div className="flex-1 flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {booking.duration}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {booking.location}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-4 mt-2 md:mt-0">
                                    {getStatusBadge(booking.status)}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-primary hover:text-primary/80"
                                        onClick={() => handleBookAction(booking)}
                                    >
                                        Book Again
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </TabsContent>
                </Tabs>
                )}
            </CardContent>
        </Card>
    );
};
