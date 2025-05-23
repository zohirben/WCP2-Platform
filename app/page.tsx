"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  PLACEHOLDER_SITES, 
  PLACEHOLDER_RESTAURANTS, 
  PLACEHOLDER_HOTELS, 
  PLACEHOLDER_TRANSPORT 
} from "@/lib/constants";
import { OfferCard } from "@/components/offer-card";
import { ButtonCTA } from "@/components/ui/button-cta";
import { ZellijPattern, MoroccanArchPattern } from "@/components/ui/pattern";
import CustomZellijPattern from "@/components/ui/custom-zellij-pattern";
import { CalendarCheck, Utensils, Building, Bus, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-moroccan-red text-white">
        <div 
          className="absolute inset-0 opacity-10 z-0 pointer-events-none animate-pattern-float"
          style={{
            backgroundImage: "url('/zellij-2.jpg')",
            backgroundRepeat: "repeat",
            backgroundSize: "350px",
          }}
        />
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-10 relative z-10">
          <div className="lg:w-1/2 space-y-6 animate-fadeInUp">
            <h1 className="font-amiri text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Welcome to Your Moroccan Experience
            </h1>
            <p className="text-lg opacity-90 max-w-xl">
              Discover the magic of Morocco with our comprehensive guide to the authentic Moroccan experience, food, accommodation, and transportation.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <ButtonCTA
                href="/offers"
                variant="outline"
                className="bg-white text-moroccan-red border-white hover:bg-transparent hover:text-white"
                showArrow
              >
                Explore Our Offers
              </ButtonCTA>
              <ButtonCTA
                href="/about"
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white hover:text-moroccan-red"
              >
                Learn More
              </ButtonCTA>
            </div>
          </div>
          <div className="lg:w-1/2 relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden animate-fadeInUp animate-delay-200">
            <Image
              src="https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg"
              alt="Moroccan Experience"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B6CB0]/70 to-transparent pointer-events-none" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-background" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-moroccan-red via-moroccan-sand to-moroccan-green opacity-70" />
      </section>

      {/* Quick Links */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mx-auto">
            Essential Information
          </h2>            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Everything you need to make the most of your Moroccan experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="moroccan-card animate-fadeInUp">
              <div className="h-12 w-12 rounded-full bg-[#C53030]/10 flex items-center justify-center mb-4">
                <CalendarCheck className="h-6 w-6 text-[#C53030]" />
              </div>
              <h3 className="font-amiri text-xl font-bold mb-2">Match Schedule</h3>
              <p className="text-muted-foreground mb-4">
                Find all World Cup matches happening in Morocco with dates, venues, and team information.
              </p>
              <ButtonCTA href="/offers" variant="moroccan" className="w-full">
                View Matches
              </ButtonCTA>
            </div>
            
            <div className="moroccan-card animate-fadeInUp animate-delay-100">
              <div className="h-12 w-12 rounded-full bg-[#2B6CB0]/10 flex items-center justify-center mb-4">
                <Utensils className="h-6 w-6 text-[#2B6CB0]" />
              </div>
              <h3 className="font-amiri text-xl font-bold mb-2">Local Food</h3>
              <p className="text-muted-foreground mb-4">
                Discover authentic Moroccan cuisine and the best restaurants near match venues.
              </p>
              <ButtonCTA href="/offers" variant="moroccan" className="w-full">
                Find Restaurants
              </ButtonCTA>
            </div>
            
            <div className="moroccan-card animate-fadeInUp animate-delay-200">
              <div className="h-12 w-12 rounded-full bg-[#D69E2E]/10 flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-[#D69E2E]" />
              </div>
              <h3 className="font-amiri text-xl font-bold mb-2">Accommodation</h3>
              <p className="text-muted-foreground mb-4">
                Browse hotels, riads, and lodging options that fit your budget and preferences.
              </p>
              <ButtonCTA href="/offers" variant="moroccan" className="w-full">
                Book Stays
              </ButtonCTA>
            </div>
            
            <div className="moroccan-card animate-fadeInUp animate-delay-300">
              <div className="h-12 w-12 rounded-full bg-[#4C6B1F]/10 flex items-center justify-center mb-4">
                <Bus className="h-6 w-6 text-[#4C6B1F]" />
              </div>
              <h3 className="font-amiri text-xl font-bold mb-2">Transportation</h3>
              <p className="text-muted-foreground mb-4">
                Learn how to navigate Morocco with ease using trains, buses, and taxis.
              </p>
              <ButtonCTA href="/offers" variant="moroccan" className="w-full">
                Get Around
              </ButtonCTA>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Match */}
      <section className="py-16 bg-[#F7FAFC] dark:bg-gray-900 relative overflow-hidden">
        <CustomZellijPattern 
          imageUrl="/zellij-2.jpg" 
          opacity={0.1} 
          size="350px" 
        />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="section-title">
            Featured Destination
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-fadeInUp">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <div className="aspect-video relative">
                  <Image
                    src="/featured match.webp"
                    alt="Featured Moroccan Destination"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="p-6 md:p-8 md:w-1/2">
                <div className="font-amiri text-xl mb-2 flex justify-between">
                  <span>{PLACEHOLDER_SITES[0].date}</span>
                  <span>{PLACEHOLDER_SITES[0].time}</span>
                </div>
                <div className="flex items-center justify-center gap-4 my-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#C53030] rounded-full flex items-center justify-center text-white text-lg font-bold mb-2">
                      MAR
                    </div>
                    <span className="font-bold">{PLACEHOLDER_SITES[0].team1}</span>
                  </div>
                  <div className="text-2xl font-bold">VS</div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#2B6CB0] rounded-full flex items-center justify-center text-white text-lg font-bold mb-2">
                      BRA
                    </div>
                    <span className="font-bold">{PLACEHOLDER_SITES[0].team2}</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-muted-foreground mb-2">
                    <strong>Stadium:</strong> {PLACEHOLDER_SITES[0].stadium}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <strong>City:</strong> {PLACEHOLDER_SITES[0].city}
                  </p>
                  <ButtonCTA href="/offers" variant="moroccan" showArrow>
                    View All Matches
                  </ButtonCTA>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Places */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="section-title">
            Discover Morocco
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            Experience the best of Morocco's rich culture, exquisite cuisine, and stunning landscapes on your Moroccan adventure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <OfferCard
              title="Traditional Cuisine"
              description="Taste authentic Moroccan flavors and dishes at recommended restaurants near match venues."
              imageSrc={PLACEHOLDER_RESTAURANTS[0].image}
              ctaText="Explore Restaurants"
              ctaHref="/offers"
              className="animate-fadeInUp"
            />
            <OfferCard
              title="Luxury & Budget Stays"
              description="Find the perfect accommodation from luxury riads to budget-friendly hotels."
              imageSrc={PLACEHOLDER_HOTELS[0].image}
              ctaText="Browse Hotels"
              ctaHref="/offers"
              className="animate-fadeInUp animate-delay-100"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#C53030] text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 z-0 pointer-events-none animate-pattern-float"
          style={{
            backgroundImage: "url('/downloaded designs/Tarceeh 1-7-11imageOne.jpg')",
            backgroundRepeat: "repeat",
            backgroundSize: "400px",
            imageRendering: "auto",
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto animate-fadeInUp">
            <h2 className="font-amiri text-3xl md:text-4xl font-bold mb-6">
              Ready for an Unforgettable Moroccan Experience?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Create your personalized guide by signing up. Get exclusive updates, customized itineraries, and local insights.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <ButtonCTA
                href="/auth/register"
                className="bg-white text-[#C53030] hover:bg-white/90"
                showArrow
              >
                Sign Up Now
              </ButtonCTA>
              <ButtonCTA
                href="/contact"
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white hover:text-[#C53030]"
              >
                Contact Us
              </ButtonCTA>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}