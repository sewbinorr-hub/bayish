// import { Navbar } from "@/components/Navbar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Activity, Users, Calendar, TrendingUp, Apple, Dumbbell, MessageSquare } from "lucide-react";
// import { Link } from "react-router-dom";
// import heroImage from "@/assets/hero-fitness.jpg";
// import running from "@/assets/running.mp4";
// import dave from "@/assets/dave.jpg";

// const Index = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
      
//       {/* Hero Section with Background Image */}
//       <section 
//         className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center px-4"
//         style={{
//           backgroundImage: `url(${heroImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundAttachment: 'scroll'
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
//         <div className="container mx-auto relative z-10 text-center space-y-6 md:space-y-8 pt-20 md:pt-16 px-2">
//           <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
//             Transform Your Health with
//             <span className="text-primary block mt-2">Expert Wellness Coaching</span>
//           </h1>
//           <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 max-w-3xl mx-auto px-2">
//             Get personalized wellness plans, track your progress, and achieve your health goals with expert guidance.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
//             <Link to="/auth?tab=signup" className="w-full sm:w-auto">
//               <Button size="lg" className="w-full sm:w-auto bg-gradient-primary shadow-smooth text-base md:text-lg px-6 md:px-8 py-5 md:py-6">
//                 Start Free Trial
//               </Button>
//             </Link>
//             <Link to="/about" className="w-full sm:w-auto">
//               <Button size="lg" variant="outline" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-background/50 backdrop-blur-sm">
//                 Learn More
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-10 md:py-16 px-4 bg-secondary/30">
//         <div className="container mx-auto">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
//             Why Choose VitalityHub?
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//             <Card className="shadow-card hover:shadow-smooth transition-shadow">
//               <CardContent className="pt-6 text-center space-y-4">
//                 <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
//                   <Users className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold">Expert Coaches</h3>
//                 <p className="text-muted-foreground">
//                   Work with certified trainers who understand your goals
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="shadow-card hover:shadow-smooth transition-shadow">
//               <CardContent className="pt-6 text-center space-y-4">
//                 <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
//                   <Calendar className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold">Custom Schedules</h3>
//                 <p className="text-muted-foreground">
//                   Get personalized training schedules tailored to you
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="shadow-card hover:shadow-smooth transition-shadow">
//               <CardContent className="pt-6 text-center space-y-4">
//                 <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
//                   <Activity className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold">Track Progress</h3>
//                 <p className="text-muted-foreground">
//                   Monitor your BMI, BMR, and fitness metrics
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="shadow-card hover:shadow-smooth transition-shadow">
//               <CardContent className="pt-6 text-center space-y-4">
//                 <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
//                   <TrendingUp className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold">See Results</h3>
//                 <p className="text-muted-foreground">
//                   Achieve your fitness goals with proven methods
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-10 md:py-16 px-4">
//         <div className="container mx-auto">
//           <div className="text-center mb-8 md:mb-12">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
//               Our Wellness Services
//             </h2>
//             <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
//               Comprehensive health and fitness solutions tailored to your needs
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//             <Card className="shadow-card hover:shadow-smooth transition-all duration-300">
//               <CardContent className="pt-6 space-y-4">
//                 <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
//                   <Dumbbell className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-semibold text-center">Personal Training</h3>
//                 <p className="text-muted-foreground text-center">
//                   One-on-one coaching sessions with certified trainers. Get customized workout plans designed for your fitness level and goals.
//                 </p>
//                 <ul className="space-y-2 text-sm text-muted-foreground">
//                   <li>✓ Personalized exercise routines</li>
//                   <li>✓ Form correction and technique guidance</li>
//                   <li>✓ Progress tracking and adjustments</li>
//                   <li>✓ Flexible scheduling options</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card className="shadow-card hover:shadow-smooth transition-all duration-300">
//               <CardContent className="pt-6 space-y-4">
//                 <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
//                   <Apple className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-semibold text-center">Nutrition Planning</h3>
//                 <p className="text-muted-foreground text-center">
//                   Custom meal plans based on your BMI, BMR, and fitness goals. Learn to fuel your body properly for optimal results.
//                 </p>
//                 <ul className="space-y-2 text-sm text-muted-foreground">
//                   <li>✓ Personalized macronutrient targets</li>
//                   <li>✓ Meal suggestions and recipes</li>
//                   <li>✓ Supplement recommendations</li>
//                   <li>✓ Regular nutritional adjustments</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card className="shadow-card hover:shadow-smooth transition-all duration-300">
//               <CardContent className="pt-6 space-y-4">
//                 <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
//                   <MessageSquare className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-semibold text-center">24/7 Support</h3>
//                 <p className="text-muted-foreground text-center">
//                   Direct messaging with your coach anytime. Get answers to questions, motivation, and guidance whenever you need it.
//                 </p>
//                 <ul className="space-y-2 text-sm text-muted-foreground">
//                   <li>✓ Real-time chat with trainers</li>
//                   <li>✓ Health tips and wellness advice</li>
//                   <li>✓ Schedule management tools</li>
//                   <li>✓ Event and workshop notifications</li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-10 md:py-16 px-4 bg-gradient-hero">
//         <div className="container mx-auto text-center space-y-4 md:space-y-6">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white px-2">
//             Ready to Start Your Journey?
//           </h2>
//           <p className="text-base md:text-xl text-white/90 max-w-2xl mx-auto px-2">
//             Join thousands of people transforming their lives with personalized coaching
//           </p>
//           <Link to="/auth?tab=signup">
//             <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-smooth">
//               Get Started Now
//             </Button>
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-6 md:py-8 px-4 border-t border-border">
//         <div className="container mx-auto text-center text-muted-foreground text-sm md:text-base">
//           <p>© 2024 VitalityHub. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Index;
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  Users,
  Calendar,
  TrendingUp,
  Apple,
  Dumbbell,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

import heroImage from "@/assets/hero-fitness.jpg";
import running from "@/assets/running.mp4" ;
import dave from "@/assets/dave.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center px-4"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
        <div className="container mx-auto relative z-10 text-center space-y-6 pt-20">
          <h1 className="text-4xl md:text-6xl font-bold">
            Transform Your Health
            <span className="text-primary block mt-2">
              With Expert Wellness Coaching
            </span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            Personalized wellness plans, progress tracking, and expert guidance
            to help you achieve your goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth?tab=signup">
              <Button size="lg" className="bg-gradient-primary px-8 py-6">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="px-8 py-6">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose VitalityHub?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Expert Coaches", desc: "Certified trainers for your goals" },
              { icon: Calendar, title: "Custom Schedules", desc: "Plans tailored to your lifestyle" },
              { icon: Activity, title: "Track Progress", desc: "Monitor BMI, BMR & metrics" },
              { icon: TrendingUp, title: "See Results", desc: "Proven transformation methods" },
            ].map((item, i) => (
              <Card key={i} className="shadow-card hover:shadow-smooth">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Our Wellness Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Complete health & fitness solutions designed for you
          </p>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Dumbbell,
              title: "Personal Training",
              desc: "Customized workout plans with expert coaching",
            },
            {
              icon: Apple,
              title: "Nutrition Planning",
              desc: "Personalized meal & nutrition guidance",
            },
            {
              icon: MessageSquare,
              title: "24/7 Support",
              desc: "Direct chat and ongoing motivation",
            },
          ].map((item, i) => (
            <Card key={i} className="shadow-card hover:shadow-smooth">
              <CardContent className="pt-6 space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= TRAINER SECTION (IMAGE + VIDEO) ================= */}
      <section
        className="relative py-20 px-4"
        style={{
          backgroundImage: `url(${dave})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-white space-y-4">
            <h2 className="text-4xl font-bold">Meet Your Trainer</h2>
            <p className="text-lg text-white/90">
              Dave is a certified fitness & wellness coach with over 8 years of
              experience helping people transform their bodies and lifestyles.
            </p>
            <ul className="space-y-2 text-white/90">
              <li>✓ Certified Personal Trainer</li>
              <li>✓ Nutrition & Lifestyle Coach</li>
              <li>✓ 1000+ Clients Trained</li>
              <li>✓ Online & In-Person Coaching</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 bg-gradient-hero text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Ready to Start Your Journey?
        </h2>
        <p className="text-white/90 mt-4 max-w-2xl mx-auto">
          Join thousands transforming their lives with Raei online training center
        </p>
        <Link to="/auth?tab=signup">
          <Button size="lg" className="mt-6 bg-white text-primary">
            Get Started Now
          </Button>
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-8 border-t text-center text-muted-foreground">
       &copy; 2024 Raei Trainning Center. All rights reserved.  <br/>
       Created by Kiki webdin 0901302252
      </footer>
    </div>
  );
};

export default Index;
