import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dumbbell, LogOut, Activity, Calendar, TrendingUp, Heart, Users, Menu, X, ChevronRight, Target, Zap, Award, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "@/components/dashboard/UserProfile";
import { BMICalculator } from "@/components/dashboard/BMICalculator";
import { BMRCalculator } from "@/components/dashboard/BMRCalculator";
import { ScheduleView } from "@/components/dashboard/ScheduleView";
import { MessagesView } from "@/components/dashboard/MessagesView";
import { NutritionView } from "@/components/dashboard/NutritionView";
import { BookingModal } from "@/components/dashboard/BookingModal";
import { BookingsView } from "@/components/dashboard/BookingsView";
import { ProgressPhotos } from "@/components/dashboard/ProgressPhotos";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCoach, setSelectedCoach] = useState<any>(null);
  const [bmi, setBmi] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session) {
        navigate("/auth");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate("/");
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Dumbbell className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
          </div>
          <p className="text-muted-foreground text-lg font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";

  const navItems = [
    { id: "dashboard", label: "Overview", icon: Activity },
    { id: "trainers", label: "Coaches", icon: Users },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "bmi", label: "Calculators", icon: Target },
    { id: "nutrition", label: "Nutrition", icon: Heart },
    { id: "progress-photos", label: "Progress", icon: Camera },
    { id: "profile", label: "Profile", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-lg blur opacity-50" />
                <div className="relative bg-gradient-primary p-2 rounded-lg">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold text-gradient">FitCoach Pro</span>
                <p className="text-xs text-muted-foreground hidden sm:block">Your fitness journey starts here</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hidden sm:flex hover:text-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-card">
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
                <Separator className="my-2" />
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-destructive hover:text-destructive"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Welcome Section */}
        <section id="dashboard" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                Welcome back!
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                Hey, <span className="text-gradient">{userName}</span>! 👋
          </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
                Ready to crush your fitness goals today? Let's track your progress and keep the momentum going.
          </p>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
                  { icon: Activity, label: "Workouts", value: "12", change: "+2", color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-500/10" },
                  { icon: Calendar, label: "This Week", value: "4", change: "+1", color: "from-purple-500 to-pink-500", bgColor: "bg-purple-500/10" },
                  { icon: TrendingUp, label: "Progress", value: "85%", change: "+5%", color: "from-green-500 to-emerald-500", bgColor: "bg-green-500/10" },
                  { icon: Heart, label: "Calories", value: "2.4k", change: "+200", color: "from-orange-500 to-red-500", bgColor: "bg-orange-500/10" },
          ].map((stat, index) => (
                  <Card
                    key={index}
                    className="glass-card hover-lift border-0 shadow-lg animate-scale-in overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-5">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 shadow-smooth`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">{stat.change}</span>
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-12">
          {/* Calculators Section */}
          <section id="bmi" className="space-y-6 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Health Calculators</h2>
                <p className="text-sm text-muted-foreground">Track your body metrics and metabolic rate</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
            <BMICalculator />
            <BMRCalculator />
          </div>
          </section>

          {/* Schedule Section */}
          <section className="space-y-6 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Your Schedule</h2>
                <p className="text-sm text-muted-foreground">Manage your training sessions and appointments</p>
              </div>
            </div>
            <ScheduleView userId={user?.id || ""} />
          </section>

            {/* Coaches Section */}
          <section id="trainers" className="space-y-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Expert Coaches</h2>
                  <p className="text-sm text-muted-foreground">Work with certified professionals</p>
                </div>
              </div>
            </div>
            
            <Card className="glass-card border-0 shadow-lg">
              <CardContent className="p-6">
                  {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {["All", "Strength Training", "Weight Loss", "Yoga", "HIIT", "Bodybuilding"].map((specialty) => (
                      <Button
                        key={specialty}
                      variant={specialty === "All" ? "default" : "outline"}
                        size="sm"
                      className="rounded-full"
                      >
                        {specialty}
                      </Button>
                    ))}
                  </div>

                  {/* Coaches Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        name: "Sarah Johnson",
                        specialty: "Strength Training",
                        rating: 4.9,
                        reviews: 127,
                        image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop",
                        certifications: ["NASM-CPT", "CrossFit L2"],
                        price: "$80/session"
                      },
                      {
                        name: "Marcus Chen",
                        specialty: "Weight Loss",
                        rating: 4.8,
                        reviews: 203,
                        image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop",
                        certifications: ["ACE-CPT", "Nutrition"],
                        price: "$75/session"
                      },
                      {
                        name: "Emily Rodriguez",
                        specialty: "Yoga & Flexibility",
                        rating: 5.0,
                        reviews: 156,
                        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop",
                        certifications: ["RYT-500", "Pilates"],
                        price: "$65/session"
                      }
                    ].map((coach, index) => (
                    <Card
                      key={index}
                      className="glass-card hover-lift overflow-hidden border-0 shadow-md group cursor-pointer"
                      onClick={() => setSelectedCoach(coach)}
                    >
                      <div className="relative h-56 overflow-hidden">
                          <img
                            src={coach.image}
                            alt={coach.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-4 right-4 bg-white/95 dark:bg-black/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold shadow-lg">
                            <span className="text-yellow-500">★</span>
                          <span>{coach.rating}</span>
                            <span className="text-muted-foreground">({coach.reviews})</span>
                          </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="font-bold text-lg text-white mb-1">{coach.name}</h4>
                          <p className="text-sm text-white/90">{coach.specialty}</p>
                        </div>
                          </div>
                      <CardContent className="p-5 space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {coach.certifications.map((cert) => (
                              <Badge key={cert} variant="secondary" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div>
                            <span className="text-2xl font-bold text-primary">{coach.price}</span>
                            <p className="text-xs text-muted-foreground">per session</p>
                          </div>
                          <Button className="bg-gradient-primary shadow-lg hover:shadow-xl transition-all">
                              Book Now
                            <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
          </section>

            <BookingModal
              isOpen={!!selectedCoach}
              onClose={() => setSelectedCoach(null)}
              coach={selectedCoach}
            />

          {/* Bookings Section */}
          <section id="bookings" className="space-y-6 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Your Bookings</h2>
                <p className="text-sm text-muted-foreground">View and manage your scheduled sessions</p>
              </div>
            </div>
              <BookingsView onBookCoach={setSelectedCoach} />
          </section>

          {/* Nutrition Section */}
          <section id="nutrition" className="space-y-6 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Nutrition Plan</h2>
                <p className="text-sm text-muted-foreground">Personalized meal plans and nutrition tracking</p>
              </div>
            </div>
              <NutritionView bmi={bmi} />
          </section>

          {/* Progress Photos Section */}
          <section id="progress-photos" className="space-y-6 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Camera className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Progress Photos</h2>
                <p className="text-sm text-muted-foreground">Share your monthly progress with coaches and trainers</p>
              </div>
            </div>
            <ProgressPhotos userId={user?.id || ""} />
          </section>

          {/* Messages Section */}
          <section className="space-y-6 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Messages</h2>
                <p className="text-sm text-muted-foreground">Communicate with your coaches</p>
              </div>
            </div>
            <MessagesView userId={user?.id || ""} />
          </section>

            {/* Profile Section */}
          <section id="profile" className="space-y-6 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Your Profile</h2>
                <p className="text-sm text-muted-foreground">Manage your personal information and preferences</p>
              </div>
            </div>
            <UserProfile userId={user?.id || ""} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
