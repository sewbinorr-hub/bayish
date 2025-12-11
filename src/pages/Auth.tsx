import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Dumbbell, Eye, EyeOff, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ fullName: "", email: "", password: "", phone: "", height: "", weight: "" });

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
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

    // Check if user has admin role
    if (data.user) {
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .single();

      if (roles) {
        // Block admin login on regular auth page
        await supabase.auth.signOut();
        setError("Admin users must login at /admin/login");
        toast({
          title: "Admin Access Required",
          description: "Please use the admin login page at /admin/login",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Regular users go to user dashboard
      navigate("/dashboard");
    }

    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const redirectUrl = `${window.location.origin}/dashboard`;

    const { error } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: signupData.fullName,
          phone: signupData.phone,
          height: signupData.height,
          weight: signupData.weight,
        }
      }
    });

    if (error) {
      setError(error.message);
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      // Success toast removed as per new design's implied behavior
      navigate("/dashboard");
    }
    setLoading(false);
  };

  const isSignup = searchParams.get("tab") === "signup";

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage: 'linear-gradient(rgba(26, 26, 46, 0.7) 0%, rgba(26, 26, 46, 0.9) 100%), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070")'
      }}
    >
      <div className="w-full max-w-md rounded-xl bg-[#1A1A2E]/80 p-8 shadow-2xl backdrop-blur-sm border border-white/10">
        <div className="flex flex-col items-center gap-2 text-center mb-8">
          <Link to="/" className="flex items-center gap-2 group">
            <Dumbbell className="h-12 w-12 text-primary group-hover:scale-110 transition-smooth" />
          </Link>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter text-white">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
          <h2 className="text-base font-normal leading-normal text-[#F0F0F0]/70">
            Unleash Your Potential
          </h2>
        </div>

        <form onSubmit={isSignup ? handleSignup : handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {isSignup && (
              <label className="flex flex-col flex-1">
                <p className="text-sm font-medium leading-normal text-[#F0F0F0] pb-2">Full Name</p>
                <Input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#F0F0F0] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3a3a5c] bg-[#1A1A2E]/70 focus:border-primary h-12 placeholder:text-[#F0F0F0]/50 px-4 text-base font-normal leading-normal"
                  placeholder="Enter your full name"
                  type="text"
                  value={signupData.fullName}
                  onChange={(e) => {
                    setSignupData({ ...signupData, fullName: e.target.value });
                    setError("");
                  }}
                  required
                />
              </label>
            )}

            {isSignup && (
              <label className="flex flex-col flex-1">
                <p className="text-sm font-medium leading-normal text-[#F0F0F0] pb-2">Phone Number</p>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-[#F0F0F0]/50" />
                  <Input
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#F0F0F0] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3a3a5c] bg-[#1A1A2E]/70 focus:border-primary h-12 placeholder:text-[#F0F0F0]/50 pl-10 pr-4 text-base font-normal leading-normal"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    value={signupData.phone}
                    onChange={(e) => {
                      setSignupData({ ...signupData, phone: e.target.value });
                      setError("");
                    }}
                    required
                  />
                </div>
              </label>
            )}

            {isSignup && (
              <div className="flex gap-4">
                <label className="flex flex-col flex-1">
                  <p className="text-sm font-medium leading-normal text-[#F0F0F0] pb-2">Height (cm)</p>
                  <Input
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#F0F0F0] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3a3a5c] bg-[#1A1A2E]/70 focus:border-primary h-12 placeholder:text-[#F0F0F0]/50 px-4 text-base font-normal leading-normal"
                    placeholder="175"
                    type="number"
                    value={signupData.height}
                    onChange={(e) => {
                      setSignupData({ ...signupData, height: e.target.value });
                      setError("");
                    }}
                    required
                  />
                </label>
                <label className="flex flex-col flex-1">
                  <p className="text-sm font-medium leading-normal text-[#F0F0F0] pb-2">Weight (kg)</p>
                  <Input
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#F0F0F0] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3a3a5c] bg-[#1A1A2E]/70 focus:border-primary h-12 placeholder:text-[#F0F0F0]/50 px-4 text-base font-normal leading-normal"
                    placeholder="70"
                    type="number"
                    value={signupData.weight}
                    onChange={(e) => {
                      setSignupData({ ...signupData, weight: e.target.value });
                      setError("");
                    }}
                    required
                  />
                </label>
              </div>
            )}

            <label className="flex flex-col flex-1">
              <p className="text-sm font-medium leading-normal text-[#F0F0F0] pb-2">Email</p>
              <Input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#F0F0F0] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3a3a5c] bg-[#1A1A2E]/70 focus:border-primary h-12 placeholder:text-[#F0F0F0]/50 px-4 text-base font-normal leading-normal"
                placeholder="Enter your email"
                type="email"
                value={isSignup ? signupData.email : loginData.email}
                onChange={(e) => {
                  if (isSignup) {
                    setSignupData({ ...signupData, email: e.target.value });
                  } else {
                    setLoginData({ ...loginData, email: e.target.value });
                  }
                  setError("");
                }}
                required
              />
            </label>

            <label className="flex flex-col flex-1">
              <p className="text-sm font-medium leading-normal text-[#F0F0F0] pb-2">Password</p>
              <div className="relative flex w-full flex-1 items-stretch">
                <Input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#F0F0F0] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3a3a5c] bg-[#1A1A2E]/70 focus:border-primary h-12 placeholder:text-[#F0F0F0]/50 px-4 pr-12 text-base font-normal leading-normal"
                  placeholder="Enter your password"
                  type={isSignup ? (showSignupPassword ? "text" : "password") : (showPassword ? "text" : "password")}
                  value={isSignup ? signupData.password : loginData.password}
                  onChange={(e) => {
                    if (isSignup) {
                      setSignupData({ ...signupData, password: e.target.value });
                    } else {
                      setLoginData({ ...loginData, password: e.target.value });
                    }
                    setError("");
                  }}
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#F0F0F0]/50 cursor-pointer hover:text-[#F0F0F0] transition-colors"
                  onClick={() => isSignup ? setShowSignupPassword(!showSignupPassword) : setShowPassword(!showPassword)}
                >
                  {(isSignup ? showSignupPassword : showPassword) ? (
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

          {!isSignup && (
            <div className="flex items-center justify-end">
              <Link
                to="#"
                className="text-sm font-normal leading-normal text-[#F0F0F0]/70 underline hover:text-primary transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          <Button
            className="flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-bold text-background-dark transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? (isSignup ? 'Creating account...' : 'Logging in...') : (isSignup ? 'Sign Up' : 'Login')}
          </Button>

          <p className="text-center text-sm font-normal leading-normal text-[#F0F0F0]/70">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{' '}
            <Link
              to={isSignup ? "/auth" : "/auth?tab=signup"}
              className="font-bold text-primary underline hover:text-primary/80 transition-colors"
            >
              {isSignup ? "Login" : "Sign Up"}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
