import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", reason: "General Inquiry", message: "" });
  };

  const faqs = [
    {
      question: "How do I update my membership plan?",
      answer: "You can update your membership plan directly from your account settings. Navigate to the 'Subscription' tab and choose the plan that best fits your needs. Changes will take effect in the next billing cycle."
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time through your account dashboard. Your access will continue until the end of your current billing period, and you will not be charged again."
    },
    {
      question: "How do I track my workout progress?",
      answer: "Our app includes a comprehensive progress tracker. After each workout, you can log your sets, reps, and weights. You can view your progress over time in the 'Dashboard' section with detailed charts and stats."
    },
    {
      question: "Is nutritional guidance included in all plans?",
      answer: "Nutritional guidance, including personalized meal plans and macro tracking, is available in our Premium and Elite coaching plans. The Basic plan includes access to our library of healthy recipes."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section
        className="pt-32 pb-40 px-4 relative bg-cover bg-center bg-fixed overflow-hidden flex items-center min-h-[60vh]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070")'
        }}
      >
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 animate-slide-up">
            We're Here to <span className="text-gradient-light">Help</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
            Connect with our team for any questions or support you need on your fitness journey.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column: Contact Info & Map */}
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold">Contact Us Directly</h2>
                <div className="flex flex-col gap-4">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-muted-foreground">Email Us</p>
                      <a href="mailto:support@fitcoach.com" className="text-base font-medium hover:text-primary transition-colors">
                        support@fitcoach.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-muted-foreground">Call Us</p>
                      <a href="tel:+11234567890" className="text-base font-medium hover:text-primary transition-colors">
                        (123) 456-7890
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-muted-foreground">Our Location</p>
                      <p className="text-base font-medium">123 Fitness Ave, Wellness City, 45678</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="w-full h-80 rounded-xl overflow-hidden glass-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841741087894!2d-73.98823492346618!3d40.75889097138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="glass-card p-8 sm:p-10 rounded-xl">
              <div className="flex flex-col gap-2 mb-8">
                <h2 className="text-2xl font-bold">Send Us a Message</h2>
                <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="reason">Reason for Contact</Label>
                  <select
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="mt-2 block w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Membership Question</option>
                    <option>Billing</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-primary hover-scale shadow-smooth">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Can't find the answer you're looking for? Reach out to our team directly.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group glass-card p-6 rounded-lg [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                  <h3 className="font-medium">{faq.question}</h3>
                  <span className="relative w-5 h-5 shrink-0">
                    <ChevronDown className="absolute transition-transform duration-300 group-open:rotate-180" />
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
