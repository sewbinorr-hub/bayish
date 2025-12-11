import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Users, Calendar, TrendingUp, Utensils, Heart, Brain, Moon, Zap, Target, Award } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-fitness.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background snap-container">
      <Navbar />

      {/* Hero Section with Enhanced Design */}
      <section
        className="snap-section pt-32 pb-40 px-4 relative bg-cover bg-center bg-fixed overflow-hidden flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${heroImage})`
        }}
      >
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl animate-slide-up">
            <div className="space-y-6 text-white">
              <div className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 mb-4">
                <span className="text-sm font-semibold text-primary-foreground">🔥 #1 Fitness Coaching Platform</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Transform Your Body with
                <span className="block mt-2 text-gradient bg-gradient-primary">Personal Coaching</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl">
                Get personalized training plans, nutrition guidance, track your progress, and achieve your fitness goals with expert guidance.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/auth?tab=signup">
                  <Button size="lg" className="bg-gradient-primary hover-scale shadow-glow text-lg px-8 py-6">
                    Start Your Journey
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="text-white border-2 border-white hover:bg-white hover:text-black transition-smooth text-lg px-8 py-6">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="snap-section py-16 px-4 flex items-center bg-cover bg-center relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070")'
        }}
      >
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "10K+", label: "Active Members" },
              { number: "500+", label: "Expert Coaches" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-6 text-center hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="snap-section py-20 px-4 flex items-center">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-gradient">FitCoach Pro?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to achieve your fitness goals in one powerful platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Expert Coaches", description: "Work with certified trainers who understand your goals", gradient: "from-blue-500 to-cyan-500" },
              { icon: Calendar, title: "Custom Schedules", description: "Get personalized training schedules tailored to you", gradient: "from-purple-500 to-pink-500" },
              { icon: Activity, title: "Track Progress", description: "Monitor your BMI, BMR, and fitness metrics", gradient: "from-green-500 to-emerald-500" },
              { icon: TrendingUp, title: "See Results", description: "Achieve your fitness goals with proven methods", gradient: "from-orange-500 to-red-500" },
            ].map((feature, index) => (
              <Card key={index} className="glass-card hover-lift group transition-smooth animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6 text-center space-y-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-smooth shadow-glow`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition & Health Information Section */}
      <section
        className="snap-section py-20 px-4 flex items-center bg-cover bg-center relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070")'
        }}
      >
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Comprehensive <span className="text-gradient">Health & Nutrition</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your journey to better health goes beyond exercise. We provide complete wellness solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6 animate-slide-up">
              <h3 className="text-3xl md:text-4xl font-bold">Personalized Nutrition Plans</h3>
              <p className="text-lg text-muted-foreground">
                Get customized meal plans designed by certified nutritionists that fit your dietary preferences,
                fitness goals, and lifestyle.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Utensils, text: "Custom meal plans based on your goals" },
                  { icon: Heart, text: "Heart-healthy recipes and guidelines" },
                  { icon: Brain, text: "Nutrition education and workshops" },
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-smooth">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-8 space-y-6 animate-scale-in">
              <h4 className="text-2xl font-semibold mb-6">Key Nutritional Focus Areas</h4>
              <div className="space-y-4">
                {["Macro Tracking", "Hydration Monitoring", "Supplement Guidance", "Meal Timing"].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl hover-lift">
                    <span className="font-medium">{item}</span>
                    <span className="text-primary font-bold text-xl">✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Health Metrics Section */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Activity, title: "BMI & Body Analysis", description: "Track your Body Mass Index and body composition with detailed analytics", gradient: "from-blue-500 to-indigo-500" },
              { icon: Heart, title: "Heart Health", description: "Monitor cardiovascular health with resting heart rate and recovery metrics", gradient: "from-green-500 to-emerald-500" },
              { icon: Moon, title: "Sleep & Recovery", description: "Optimize your sleep patterns and recovery for better performance", gradient: "from-purple-500 to-pink-500" },
            ].map((metric, index) => (
              <Card key={index} className="glass-card hover-lift group overflow-hidden">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className={`w-20 h-20 bg-gradient-to-br ${metric.gradient} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-smooth shadow-glow`}>
                    <metric.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{metric.title}</h3>
                  <p className="text-muted-foreground">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Tips Section */}
      <section className="snap-section py-20 px-4 flex items-center">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Daily <span className="text-gradient">Wellness Tips</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Hydration First", description: "Start your day with 2 glasses of water to kickstart metabolism and improve cognitive function.", icon: Zap, color: "text-blue-500" },
              { title: "Protein Power", description: "Include protein in every meal to maintain muscle mass and keep you feeling full longer.", icon: Target, color: "text-green-500" },
              { title: "Active Recovery", description: "Light walks and stretching on rest days improve circulation and reduce muscle soreness.", icon: Award, color: "text-purple-500" },
            ].map((tip, index) => (
              <Card key={index} className="glass-card hover-lift group">
                <CardContent className="pt-6 space-y-4">
                  <tip.icon className={`w-12 h-12 ${tip.color} group-hover:scale-110 transition-smooth`} />
                  <h3 className="text-xl font-semibold">{tip.title}</h3>
                  <p className="text-muted-foreground">
                    {tip.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="snap-section py-20 px-4 text-white relative overflow-hidden flex items-center bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
        <div className="container mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold animate-slide-up">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Join thousands of people achieving their fitness and nutrition goals with our comprehensive coaching program
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link to="/auth?tab=signup">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-xl hover-scale text-lg px-8 py-6">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-white border-2 border-white hover:bg-white hover:text-primary transition-smooth text-lg px-8 py-6">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;