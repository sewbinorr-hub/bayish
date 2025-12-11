import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, LogOut, Users, Calendar, MessageSquare, Utensils, Shield, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { AdminScheduleManager } from "@/components/admin/AdminScheduleManager";
import { AdminMessageSender } from "@/components/admin/AdminMessageSender";
import { AdminNutritionManager } from "@/components/admin/AdminNutritionManager";
import { AdminProgressPhotos } from "@/components/admin/AdminProgressPhotos";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSchedules: 0,
    unreadMessages: 0,
    mealPlans: 0
  });

  useEffect(() => {
    checkAdminStatus();
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch Total Users
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch Active Schedules (Total schedules for now)
      const { count: scheduleCount } = await supabase
        .from('schedules')
        .select('*', { count: 'exact', head: true });

      // Fetch Unread Messages
      const { count: messageCount } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('read', false);

      // Fetch Meal Plans (Nutrition entries)
      const { count: nutritionCount } = await supabase
        .from('nutrition')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalUsers: userCount || 0,
        activeSchedules: scheduleCount || 0,
        unreadMessages: messageCount || 0,
        mealPlans: nutritionCount || 0
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const checkAdminStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      navigate("/auth");
      return;
    }

    // Check if user has admin role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .single();

    if (roles) {
      setIsAdmin(true);
    } else {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Dumbbell className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#101622] font-sans text-white">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center py-5 sm:px-6 lg:px-8 xl:px-40">
            <div className="layout-content-container flex flex-col w-full max-w-[1280px] flex-1">
              {/* TopNavBar */}
              <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-4 md:px-10 py-3">
                <div className="flex items-center gap-4 text-white">
                  <div className="size-6 text-primary">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">FitAdmin</h2>
                </div>
                <div className="hidden md:flex flex-1 justify-center gap-8">
                  <div className="flex items-center gap-9">
                    <a className="text-white text-sm font-medium leading-normal" href="#">Dashboard</a>
                    <a className="text-slate-400 hover:text-white text-sm font-medium leading-normal transition-colors" href="#schedules">Schedule</a>
                    <a className="text-slate-400 hover:text-white text-sm font-medium leading-normal transition-colors" href="#nutrition">Nutrition</a>
                    <a className="text-slate-400 hover:text-white text-sm font-medium leading-normal transition-colors" href="#messages">Messages</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-white/5 hover:bg-white/10 text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                  >
                    <LogOut className="w-5 h-5" />
                  </Button>
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-secondary">
                    <div className="flex items-center justify-center h-full w-full text-white font-bold">
                      A
                    </div>
                  </div>
                </div>
              </header>

              <main className="flex-1 p-4 md:p-10">
                {/* PageHeading */}
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                  <div className="flex min-w-72 flex-col gap-2">
                    <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">Welcome back, Admin!</p>
                    <p className="text-slate-400 text-base font-normal leading-normal">Here's a summary of your platform's activity.</p>
                  </div>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary hover:bg-primary/90 text-white text-sm font-bold leading-normal tracking-[0.015em] gap-2 transition-all">
                    <span className="text-xl">+</span>
                    <span className="truncate">Add New User</span>
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  <div className="flex flex-col gap-2 rounded-xl p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <p className="text-slate-300 text-base font-medium leading-normal">Total Users</p>
                    <p className="text-white tracking-light text-3xl font-bold leading-tight">{stats.totalUsers}</p>
                    {/* <p className="text-green-500 text-sm font-medium leading-normal">+5.2% this month</p> */}
                  </div>
                  <div className="flex flex-col gap-2 rounded-xl p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <p className="text-slate-300 text-base font-medium leading-normal">Active Schedules</p>
                    <p className="text-white tracking-light text-3xl font-bold leading-tight">{stats.activeSchedules}</p>
                    {/* <p className="text-green-500 text-sm font-medium leading-normal">+1.8% this month</p> */}
                  </div>
                  <div className="flex flex-col gap-2 rounded-xl p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <p className="text-slate-300 text-base font-medium leading-normal">Unread Messages</p>
                    <p className="text-white tracking-light text-3xl font-bold leading-tight">{stats.unreadMessages}</p>
                    {/* <p className="text-red-500 text-sm font-medium leading-normal">-3 since yesterday</p> */}
                  </div>
                  <div className="flex flex-col gap-2 rounded-xl p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <p className="text-slate-300 text-base font-medium leading-normal">Meal Plans</p>
                    <p className="text-white tracking-light text-3xl font-bold leading-tight">{stats.mealPlans}</p>
                    {/* <p className="text-green-500 text-sm font-medium leading-normal">+2 created this week</p> */}
                  </div>
                </div>

                {/* Admin Sections */}
                <div className="grid gap-12">
                  <section id="schedules" className="scroll-mt-32 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Calendar className="w-6 h-6 text-purple-500" />
                      </div>
                      <div>
                        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Schedule Management</h2>
                        <p className="text-slate-400 text-sm">Manage coaching sessions and availability</p>
                      </div>
                    </div>
                    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <AdminScheduleManager />
                    </div>
                  </section>

                  <section id="nutrition" className="scroll-mt-32 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Utensils className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Nutrition Plans</h2>
                        <p className="text-slate-400 text-sm">Create and assign meal plans</p>
                      </div>
                    </div>
                    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <AdminNutritionManager />
                    </div>
                  </section>

                  <section id="messages" className="scroll-mt-32 animate-slide-up" style={{ animationDelay: "0.5s" }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <MessageSquare className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Communications</h2>
                        <p className="text-slate-400 text-sm">Send announcements and messages</p>
                      </div>
                    </div>
                    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <AdminMessageSender />
                    </div>
                  </section>

                  <section id="progress-photos" className="scroll-mt-32 animate-slide-up" style={{ animationDelay: "0.6s" }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Camera className="w-6 h-6 text-purple-500" />
                      </div>
                      <div>
                        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Progress Photos</h2>
                        <p className="text-slate-400 text-sm">View all users' progress photos organized by month</p>
                      </div>
                    </div>
                    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5 p-6">
                      <AdminProgressPhotos />
                    </div>
                  </section>

                  <section id="registered-users" className="scroll-mt-32 animate-slide-up" style={{ animationDelay: "0.7s" }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Users className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Registered Users</h2>
                        <p className="text-slate-400 text-sm">Complete list of all registered users on the platform</p>
                      </div>
                    </div>
                    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <AdminUserList />
                    </div>
                  </section>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
