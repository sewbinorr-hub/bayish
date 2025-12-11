import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Heart, Dumbbell, Zap, Weight, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
    const services = [
        {
            icon: Utensils,
            title: "Body Nutrition",
            description: "Fuel your body the right way. Get personalized nutrition advice to support your fitness goals, with culturally mindful tips and realistic meal strategies.",
            color: "from-green-500 to-emerald-500",
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop"
        },
        {
            icon: Heart,
            title: "Cardio Training",
            description: "Boost your stamina and burn calories with structured cardio sessions, including treadmill work, bike intervals, dance-based cardio, and HIIT.",
            color: "from-red-500 to-pink-500",
            image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&h=400&fit=crop"
        },
        {
            icon: Dumbbell,
            title: "Lifting Sessions",
            description: "Build strength and sculpt your body with guided weightlifting programs from barbell basics to progressive overload training.",
            color: "from-blue-500 to-cyan-500",
            image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop"
        },
        {
            icon: Zap,
            title: "Functional Workout",
            description: "Challenge yourself with functional, high-intensity workouts inspired by CrossFit. Perfect for building power, endurance, and overall fitness.",
            color: "from-orange-500 to-yellow-500",
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop"
        },
        {
            icon: Weight,
            title: "Personal Weights",
            description: "Work on your own terms with custom weight training plans designed just for you. Great for self-paced training with expert support.",
            color: "from-purple-500 to-indigo-500",
            image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop"
        },
        {
            icon: Wrench,
            title: "Training Tools",
            description: "Train smarter with resistance bands, kettlebells, jump ropes, sliders, and more all available in our space to diversify and level up your sessions.",
            color: "from-teal-500 to-cyan-500",
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop"
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
                        What You <span className="text-gradient-light">Get</span>
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
                        Comprehensive fitness services designed to transform your body and elevate your performance
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <Card
                                key={index}
                                className="glass-card hover-lift overflow-hidden group animate-scale-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Service Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-glow`}>
                                        <service.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    <h3 className="text-2xl font-bold mb-3 text-gradient">{service.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {service.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="glass-card p-12 text-center">
                        <h2 className="text-4xl font-bold mb-4">
                            Ready to <span className="text-gradient">Get Started?</span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                            Choose from our comprehensive range of services and start your transformation journey today. Our expert coaches are ready to guide you every step of the way.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to="/coaches">
                                <Button className="bg-gradient-primary hover-scale shadow-smooth text-lg px-8 py-6 h-auto">
                                    Choose Your Coach
                                </Button>
                            </Link>
                            <Link to="/auth?tab=signup">
                                <Button variant="outline" className="text-lg px-8 py-6 h-auto hover-lift">
                                    Sign Up Now
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

export default Services;
