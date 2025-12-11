import { Link } from "react-router-dom";
import { Dumbbell, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
    return (
        <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <Dumbbell className="w-6 h-6 text-primary" />
                            <span className="text-xl font-bold">FitCoach Pro</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Transform your body and mind with personalized coaching and expert guidance.
                        </p>
                        <div className="flex gap-3">
                            <Button variant="ghost" size="icon" className="hover:text-primary">
                                <Facebook className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary">
                                <Twitter className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary">
                                <Instagram className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} FitCoach Pro. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
