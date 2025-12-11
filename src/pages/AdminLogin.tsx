import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      setError(error.message);
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (data.user) {
      // Check if user has admin role
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .single();

      if (roles) {
        toast({
          title: "Welcome Admin",
          description: "Successfully logged in.",
        });
        navigate("/admin");
      } else {
        await supabase.auth.signOut();
        setError("You don't have admin privileges.");
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
      }
    }
    setLoading(false);
  };

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage: 'linear-gradient(rgba(15, 15, 30, 0.85) 0%, rgba(15, 15, 30, 0.95) 100%), url("https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2070")'
      }}
    >
      <div className="w-full max-w-md rounded-xl bg-[#1A1A2E]/80 p-8 shadow-2xl backdrop-blur-sm border border-white/10">
        <div className="flex flex-col items-center gap-2 text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-glow mb-2">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter text-white">
            Admin Access
          </h1>
          <h2 className="text-base font-normal leading-normal text-[#F0F0F0]/70">
            Secure Control Panel
          </h2>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <label className="flex flex-col flex-1">
              <p className="text-sm font-medium leading-normal text-[#F0F0F0] pb-2">Admin Email</p>
              <Input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#F0F0F0] focus:outline-0 focus:ring-2 focus:ring-orange-500/50 border border-[#3a3a5c] bg-[#1A1A2E]/70 focus:border-orange-500 h-12 placeholder:text-[#F0F0F0]/50 px-4 text-base font-normal leading-normal"
                placeholder="admin@fitcoachpro.com"
                type="email"
                value={credentials.email}
                onChange={(e) => {
                  setCredentials({ ...credentials, email: e.target.value });
                  setError("");
                }}
                required
              />
            </label>

            <label className="flex flex-col flex-1">
              <p className="text-sm font-medium leading-normal text-[#F0F0F0] pb-2">Password</p>
              <div className="relative flex w-full flex-1 items-stretch">
                <Input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#F0F0F0] focus:outline-0 focus:ring-2 focus:ring-orange-500/50 border border-[#3a3a5c] bg-[#1A1A2E]/70 focus:border-orange-500 h-12 placeholder:text-[#F0F0F0]/50 px-4 pr-12 text-base font-normal leading-normal"
                  placeholder="Enter admin password"
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => {
                    setCredentials({ ...credentials, password: e.target.value });
                    setError("");
                  }}
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#F0F0F0]/50 cursor-pointer hover:text-[#F0F0F0] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </div>
              </div>
            </label>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button
            className="flex h-12 w-full items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 text-base font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-glow"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Login as Admin'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
