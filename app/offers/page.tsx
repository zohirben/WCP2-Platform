"use client";

import { 
  PLACEHOLDER_SITES, 
  PLACEHOLDER_RESTAURANTS, 
  PLACEHOLDER_HOTELS, 
  PLACEHOLDER_TRANSPORT 
} from "@/lib/constants";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OfferCard } from "@/components/offer-card";
import { ZellijPattern, MoroccanArchPattern } from "@/components/ui/pattern";
import { CalendarCheck, Utensils, Building, Bus, Star } from "lucide-react";
import Image from "next/image";

export default function OffersPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-[#C53030] text-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 z-0 pointer-events-none animate-pattern-float"
          style={{
            backgroundImage: "url('/assets/patterns/Tarceeh 1-7-11imageOne.jpg')",
            backgroundRepeat: "repeat",
            backgroundSize: "400px",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-amiri text-4xl md:text-5xl font-bold mb-6">Our Offers</h1>
            <p className="text-lg opacity-90">
              Discover our comprehensive travel services to make your Moroccan experience unforgettable.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-background" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }} />
      </section>

      {/* Main Tabs */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Tabs defaultValue="matches" className="w-full">
            <TabsList className="w-full flex flex-wrap h-auto mb-8 border-b dark:border-gray-800 pb-0 bg-transparent">
              <TabsTrigger value="matches" className="data-[state=active]:border-b-2 data-[state=active]:border-[#C53030] rounded-none py-3 px-6 data-[state=active]:shadow-none data-[state=active]:bg-transparent">
                <CalendarCheck className="mr-2 h-4 w-4" />
                Match Schedule
              </TabsTrigger>
              <TabsTrigger value="food" className="data-[state=active]:border-b-2 data-[state=active]:border-[#C53030] rounded-none py-3 px-6 data-[state=active]:shadow-none data-[state=active]:bg-transparent">
                <Utensils className="mr-2 h-4 w-4" />
                Local Food
              </TabsTrigger>
              <TabsTrigger value="hotels" className="data-[state=active]:border-b-2 data-[state=active]:border-[#C53030] rounded-none py-3 px-6 data-[state=active]:shadow-none data-[state=active]:bg-transparent">
                <Building className="mr-2 h-4 w-4" />
                Hotels
              </TabsTrigger>
              <TabsTrigger value="transport" className="data-[state=active]:border-b-2 data-[state=active]:border-[#C53030] rounded-none py-3 px-6 data-[state=active]:shadow-none data-[state=active]:bg-transparent">
                <Bus className="mr-2 h-4 w-4" />
                Transportation
              </TabsTrigger>
            </TabsList>
            
            {/* Match Schedule Tab */}
            <TabsContent value="matches" className="mt-6">
              <h2 className="section-title">Match Schedule</h2>
              <p className="text-muted-foreground mb-8 max-w-3xl">
                Find the complete match schedule with all the matches happening across Moroccan stadiums. Plan your visit to catch your favorite teams in action.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PLACEHOLDER_SITES.map((match) => (
                  <Card key={match.id} className="overflow-hidden border-border/50 transition-all hover:shadow-md">
                    <CardHeader className="bg-[#2B6CB0] text-white pb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm opacity-90">{match.date}</span>
                          <h3 className="font-amiri text-xl font-bold">{match.stadium}</h3>
                          <CardDescription className="text-white/80">{match.city}</CardDescription>
                        </div>
                        <div className="text-xl font-bold">{match.time}</div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-center gap-4 py-3">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-[#C53030] rounded-full flex items-center justify-center text-white text-lg font-bold mb-2">
                            {match.team1.substring(0, 3).toUpperCase()}
                          </div>
                          <span className="font-bold">{match.team1}</span>
                        </div>
                        <div className="text-2xl font-bold">VS</div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-[#2B6CB0] rounded-full flex items-center justify-center text-white text-lg font-bold mb-2">
                            {match.team2.substring(0, 3).toUpperCase()}
                          </div>
                          <span className="font-bold">{match.team2}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 dark:bg-gray-900 p-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Tickets will be available through the official FIFA ticketing platform.
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Food Tab */}
            <TabsContent value="food" className="mt-6">
              <h2 className="section-title">Local Food Recommendations</h2>
              <p className="text-muted-foreground mb-8 max-w-3xl">
                Discover the rich flavors of Moroccan cuisine at these highly recommended restaurants near match venues. From tagines to couscous, experience authentic local dining.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PLACEHOLDER_RESTAURANTS.map((restaurant) => (
                  <Card key={restaurant.id} className="overflow-hidden border-border/50 transition-all hover:shadow-md">
                    <div className="aspect-video relative">
                      <Image
                        src={restaurant.image}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white dark:bg-gray-900 rounded-full py-1 px-3 flex items-center">
                        <Star className="w-4 h-4 text-[#D69E2E] mr-1" fill="#D69E2E" />
                        <span className="text-sm font-medium">{restaurant.rating}</span>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="font-amiri text-xl">{restaurant.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <span className="mr-2">{restaurant.cuisine}</span>
                        <span className="px-1">•</span>
                        <span>{restaurant.location}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{restaurant.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Hotels Tab */}
            <TabsContent value="hotels" className="mt-6">
              <h2 className="section-title">Hotel Listings</h2>
              <p className="text-muted-foreground mb-8 max-w-3xl">
                Find comfortable and convenient accommodation options near World Cup venues. From luxury hotels to authentic riads, we have options for every budget.
              </p>
              
              <div className="space-y-8">
                {PLACEHOLDER_HOTELS.map((hotel) => (
                  <OfferCard
                    key={hotel.id}
                    title={hotel.name}
                    description={hotel.description}
                    imageSrc={hotel.image}
                    ctaText="View Details"
                    ctaHref="#"
                    imagePosition="left"
                  />
                ))}
              </div>
            </TabsContent>
            
            {/* Transportation Tab */}
            <TabsContent value="transport" className="mt-6">
              <h2 className="section-title">Transportation Info</h2>
              <p className="text-muted-foreground mb-8 max-w-3xl">
                Navigate Morocco with ease using these transportation options. Get practical tips on getting around and between host cities for the World Cup.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PLACEHOLDER_TRANSPORT.map((transport) => (
                  <Card key={transport.id} className="overflow-hidden border-border/50 transition-all hover:shadow-md">
                    <div className="h-48 relative">
                      <Image
                        src={transport.image}
                        alt={transport.type}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-amiri text-xl">{transport.type}</CardTitle>
                      <CardDescription>{transport.routes.join(", ")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{transport.description}</p>
                      <div className="bg-[#F7FAFC] dark:bg-gray-800 p-3 rounded-md">
                        <p className="text-sm font-medium mb-1">Traveler Tip:</p>
                        <p className="text-sm text-muted-foreground">{transport.tips}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2B6CB0] text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 z-0 pointer-events-none animate-pattern-float"
          style={{
            backgroundImage: "url('/assets/patterns/Tarceeh 1-7-11imageOne.jpg')",
            backgroundRepeat: "repeat",
            backgroundSize: "400px",
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-amiri text-3xl md:text-4xl font-bold mb-6">
              Need Personalized Recommendations?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Our local experts can help you plan the perfect World Cup itinerary based on your interests and match schedule.
            </p>
            <div className="inline-block">
              <a 
                href="/contact" 
                className="bg-white text-[#2B6CB0] py-3 px-6 rounded-md font-medium hover:bg-white/90 transition-colors flex items-center gap-2"
              >
                Contact Our Team
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path 
                    d="M4.16666 10H15.8333" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M10.8333 5L15.8333 10L10.8333 15" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}