import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, CheckCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface Coach {
    name: string;
    specialty: string;
    image: string;
    price: string;
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    coach: Coach | null;
}

export function BookingModal({ isOpen, onClose, coach }: BookingModalProps) {
    const { toast } = useToast();
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [step, setStep] = useState<1 | 2>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock time slots
    const timeSlots = [
        "09:00 AM", "10:00 AM", "11:00 AM",
        "01:00 PM", "02:00 PM", "03:00 PM",
        "04:00 PM", "05:00 PM"
    ];

    const handleClose = () => {
        onClose();
        // Reset state after a short delay to allow animation to finish
        setTimeout(() => {
            setDate(undefined);
            setSelectedTime(null);
            setStep(1);
        }, 300);
    };

    const handleConfirm = async () => {
        if (!date || !selectedTime || !coach) return;

        setIsSubmitting(true);

        try {
            // Get current user session
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError || !session || !session.user) {
                toast({
                    title: "Error",
                    description: "You must be logged in to book a session.",
                    variant: "destructive",
                });
                setIsSubmitting(false);
                return;
            }
            
            const user = session.user;

            // Convert time from "09:00 AM" format to "09:00:00" format
            const time24 = convertTo24Hour(selectedTime);

            // Save booking to schedules table
            const { error } = await supabase
                .from('schedules')
                .insert({
                    user_id: user.id,
                    title: `${coach.name} - ${coach.specialty}`,
                    description: `Session with ${coach.name}`,
                    date: format(date, 'yyyy-MM-dd'),
                    time: time24,
                    created_by: user.id, // Using current user as created_by for now
                });

            if (error) throw error;

            toast({
                title: "Booking Confirmed! 🎉",
                description: `You're booked with ${coach.name} on ${format(date, "MMM d")} at ${selectedTime}.`,
            });

            handleClose();
            
            // Trigger a custom event to refresh bookings
            window.dispatchEvent(new CustomEvent('bookingCreated'));
        } catch (error: any) {
            console.error("Error booking session:", error);
            toast({
                title: "Booking Failed",
                description: error.message || "Failed to book session. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
            handleClose();
        }
    };

    const convertTo24Hour = (time12: string): string => {
        const [time, period] = time12.split(' ');
        const [hours, minutes] = time.split(':');
        let hour24 = parseInt(hours);
        
        if (period === 'PM' && hour24 !== 12) {
            hour24 += 12;
        } else if (period === 'AM' && hour24 === 12) {
            hour24 = 0;
        }
        
        return `${hour24.toString().padStart(2, '0')}:${minutes}:00`;
    };

    if (!coach) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px] glass-card border-primary/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        {step === 1 ? "Book a Session" : "Confirm Booking"}
                    </DialogTitle>
                    <DialogDescription>
                        {step === 1
                            ? "Select a date and time for your training session."
                            : "Please review your booking details below."}
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                    {/* Coach Summary */}
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 mb-6 border border-border">
                        <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary">
                            <img src={coach.image} alt={coach.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg">{coach.name}</h4>
                            <p className="text-sm text-muted-foreground">{coach.specialty} • {coach.price}</p>
                        </div>
                    </div>

                    {step === 1 ? (
                        <div className="space-y-6">
                            {/* Date Selection */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <CalendarIcon className="w-4 h-4 text-primary" />
                                    Select Date
                                </Label>
                                <div className="border rounded-lg p-2 bg-background/50 flex justify-center">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                        initialFocus
                                        className="rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Time Selection */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" />
                                    Select Time
                                </Label>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                    {timeSlots.map((time) => (
                                        <Button
                                            key={time}
                                            variant={selectedTime === time ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setSelectedTime(time)}
                                            className={cn(
                                                "text-xs transition-all",
                                                selectedTime === time && "bg-gradient-primary border-none"
                                            )}
                                        >
                                            {time}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-fade-in">
                            <div className="space-y-4 border rounded-xl p-6 bg-background/50">
                                <div className="flex items-center gap-3">
                                    <CalendarIcon className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Date</p>
                                        <p className="font-semibold">{date ? format(date, "EEEE, MMMM do, yyyy") : "-"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Time</p>
                                        <p className="font-semibold">{selectedTime}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Coach</p>
                                        <p className="font-semibold">{coach.name}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary/10 p-4 rounded-lg flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                                <p className="text-sm text-muted-foreground">
                                    By confirming, you agree to our cancellation policy. You will receive a confirmation email shortly.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="mt-6 flex gap-2 sm:gap-0">
                    {step === 1 ? (
                        <Button
                            className="w-full bg-gradient-primary"
                            disabled={!date || !selectedTime}
                            onClick={() => setStep(2)}
                        >
                            Continue
                        </Button>
                    ) : (
                        <div className="flex w-full gap-2">
                            <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                                Back
                            </Button>
                            <Button
                                className="flex-1 bg-gradient-primary"
                                onClick={handleConfirm}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Confirming..." : "Confirm Booking"}
                            </Button>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
