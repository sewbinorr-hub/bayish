import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Target, Heart, User, Utensils, Users } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const coaches = [
    {
      name: "Jane Doe",
      role: "Head Coach & Founder",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop",
      bio: "With over a decade of experience in strength training and athletic conditioning, Jane is passionate about helping clients break through plateaus and achieve new personal bests."
    },
    {
      name: "John Smith",
      role: "Nutrition Specialist",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop",
      bio: "John combines his expertise in sports nutrition with a practical approach, creating sustainable eating plans that fuel performance and transform body composition."
    },
    {
      name: "Emily White",
      role: "Functional Fitness Coach",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop",
      bio: "Emily specializes in mobility and functional movement, helping clients build a strong, resilient body that can handle the demands of everyday life with ease and confidence."
    }
  ];

  const testimonials = [
    {
      name: "Sarah K.",
      achievement: "Lost 25 lbs in 3 months",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      quote: "The personalized plan was a game-changer. For the first time, I felt like my program was designed for me, not for a generic goal. The support from the community and coaches was incredible!"
    },
    {
      name: "Mike R.",
      achievement: "Increased bench press by 50 lbs",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      quote: "I had hit a plateau and couldn't break past it. The expert coaching on form and nutrition helped me smash my goals faster than I ever thought possible. This is more than a gym."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section
        className="pt-32 pb-40 px-4 relative bg-cover bg-center bg-fixed overflow-hidden flex items-center min-h-[60vh]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070")'
        }}
      >
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 animate-slide-up">
            More Than a Gym. It's Your <span className="text-gradient-light">Transformation</span>.
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
            Discover the strength within you with expert guidance and a community that cares.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Our Philosophy Section */}
        <section className="py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-gradient">Philosophy</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our coaching program is built on a foundation of personalization, expert guidance, and a community that will push you to succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
            <Card className="glass-card border-0 rounded-none">
              <CardContent className="p-6">
                <h3 className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Our Mission</h3>
                <p className="text-foreground leading-relaxed">
                  To provide the most effective and personalized fitness and nutritional coaching available, empowering you to achieve peak physical and mental wellness.
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card border-0 rounded-none">
              <CardContent className="p-6">
                <h3 className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Our Vision</h3>
                <p className="text-foreground leading-relaxed">
                  To create a world where everyone has the knowledge, support, and motivation to unlock their full potential and live their strongest, healthiest life.
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card border-0 rounded-none">
              <CardContent className="p-6">
                <h3 className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Our Values</h3>
                <p className="text-foreground leading-relaxed">
                  We believe in a supportive, results-driven, and science-backed approach that is tailored to every unique individual we have the privilege to coach.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Why <span className="text-gradient">Choose Us?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We ditch the one-size-fits-all approach. Our program is built on a foundation of personalization, expert guidance, and a community that will push you to succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: User,
                title: "Personalized Plans",
                description: "Custom-tailored workouts and nutrition that evolve with you, not generic prescriptions."
              },
              {
                icon: Utensils,
                title: "Expert Nutritional Guidance",
                description: "Unlock your body's full potential with science-backed nutritional coaching and meal plans."
              },
              {
                icon: Users,
                title: "A Supportive Community",
                description: "Join a group of like-minded individuals who will celebrate every win and motivate you."
              }
            ].map((feature, index) => (
              <Card key={index} className="glass-card hover-lift text-center">
                <CardContent className="pt-6 pb-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Meet the Coaches Section */}
        <section className="py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Meet the <span className="text-gradient">Coaches</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our certified professionals are not just trainers; they're dedicated partners in your fitness journey, bringing years of experience and passion to every session.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {coaches.map((coach, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{coach.name}</h3>
                <p className="text-primary text-sm font-medium mb-2">{coach.role}</p>
                <p className="text-sm text-muted-foreground">{coach.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Real Results, <span className="text-gradient">Real People</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Hear from members of our community who have transformed their lives with our guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.achievement}</p>
                    </div>
                  </div>
                  <blockquote className="text-foreground/90 italic">
                    "{testimonial.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-12 text-center">
            <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Start Your Transformation?
              </h2>
              <p className="text-white/90 text-lg max-w-xl mx-auto mb-6">
                Join our community and get the expert guidance you need to unlock your full potential. Your journey to a stronger, healthier you starts now.
              </p>
              <Link to="/auth?tab=signup">
                <Button className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto font-bold">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
