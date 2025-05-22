"use client";

import { useState } from "react";
import { ZellijPattern } from "@/components/ui/pattern";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-[#D69E2E] text-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/downloaded designs/Tarceeh 1-7-11imageOne.jpg')",
            backgroundRepeat: "repeat",
            backgroundSize: "400px",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-amiri text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg opacity-90">
              Get in touch with our team for personalized assistance with your World Cup travel plans.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-background" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }} />
      </section>

      {/* Contact Form Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
            <div className="md:col-span-3">
              <h2 className="section-title">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below, and our team will get back to you as soon as possible.
              </p>
              
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please provide details about your inquiry..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-[#C53030] hover:bg-[#9B2C2C] w-full md:w-auto"
                      disabled={formStatus === "submitting"}
                    >
                      {formStatus === "submitting" 
                        ? "Sending..." 
                        : formStatus === "success" 
                          ? "Message Sent!" 
                          : "Send Message"
                      }
                    </Button>
                    
                    {formStatus === "success" && (
                      <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-3 rounded-md text-sm">
                        Thank you for your message! We'll get back to you shortly.
                      </div>
                    )}
                    
                    {formStatus === "error" && (
                      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-md text-sm">
                        There was an error sending your message. Please try again.
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <h2 className="section-title">Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                Our team is available to answer your questions about the World Cup in Morocco.
              </p>
              
              <div className="space-y-6">
                <Card className="p-4 flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#C53030]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-[#C53030]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email Us</h3>
                    <p className="text-muted-foreground text-sm mb-1">For general inquiries:</p>
                    <a href="mailto:info@worldcup-morocco.com" className="text-[#2B6CB0] hover:underline">
                      info@worldcup-morocco.com
                    </a>
                  </div>
                </Card>
                
                <Card className="p-4 flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#2B6CB0]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-[#2B6CB0]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Call Us</h3>
                    <p className="text-muted-foreground text-sm mb-1">Customer support:</p>
                    <a href="tel:+212522000000" className="text-[#2B6CB0] hover:underline">
                      +212 522 000 000
                    </a>
                  </div>
                </Card>
                
                <Card className="p-4 flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#D69E2E]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[#D69E2E]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Visit Us</h3>
                    <p className="text-muted-foreground text-sm mb-1">Main office:</p>
                    <address className="not-italic text-foreground">
                      123 Boulevard Mohammed V<br />
                      Casablanca, Morocco
                    </address>
                  </div>
                </Card>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-3">Follow Us</h3>
                  <div className="flex gap-3">
                    <a 
                      href="#" 
                      className="h-10 w-10 rounded-full bg-[#C53030] text-white flex items-center justify-center hover:bg-[#9B2C2C] transition-colors"
                    >
                      <Facebook size={20} />
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a 
                      href="#" 
                      className="h-10 w-10 rounded-full bg-[#2B6CB0] text-white flex items-center justify-center hover:bg-[#2563EB] transition-colors"
                    >
                      <Twitter size={20} />
                      <span className="sr-only">Twitter</span>
                    </a>
                    <a 
                      href="#" 
                      className="h-10 w-10 rounded-full bg-[#D69E2E] text-white flex items-center justify-center hover:bg-[#B7791F] transition-colors"
                    >
                      <Instagram size={20} />
                      <span className="sr-only">Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}