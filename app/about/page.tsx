"use client";

import Image from "next/image";
import { ZellijPattern } from "@/components/ui/pattern";
import { ButtonCTA } from "@/components/ui/button-cta";

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-[#2B6CB0] text-white overflow-hidden">
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
            <h1 className="font-amiri text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-lg opacity-90">
              Help visitors enjoy the World Cup in Morocco while discovering local hospitality.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-background" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }} />
      </section>

      {/* Main Content */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <h2 className="font-amiri text-3xl">Our Mission</h2>
              <p>
                Welcome to the official World Cup Morocco Travel Companion website. Our mission is to help international visitors navigate and enjoy their time in Morocco during the World Cup. We believe that experiencing a country's culture is just as important as watching the matches.
              </p>

              <div className="my-8 relative rounded-xl overflow-hidden aspect-video">
                <Image
                  src="https://images.pexels.com/photos/12650113/pexels-photo-12650113.jpeg"
                  alt="Moroccan Architecture"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="font-amiri text-3xl">What We Offer</h2>
              <p>
                We provide comprehensive information on match schedules, recommended restaurants serving authentic Moroccan cuisine, a variety of accommodation options, and detailed transportation guides. Our goal is to make your World Cup experience in Morocco as smooth and enjoyable as possible.
              </p>

              <h2 className="font-amiri text-3xl">Cultural Immersion</h2>
              <p>
                Beyond the excitement of the matches, we encourage visitors to immerse themselves in Morocco's rich culture. From the bustling souks of Marrakech to the serene beaches of Essaouira, our guides help you discover the hidden gems of this beautiful country.
              </p>

              <div className="my-8 relative rounded-xl overflow-hidden aspect-video">
                <Image
                  src="https://images.pexels.com/photos/12074973/pexels-photo-12074973.jpeg"
                  alt="Moroccan Market"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="font-amiri text-3xl">Local Expertise</h2>
              <p>
                Our team consists of local experts who are passionate about sharing their knowledge and love for Morocco. We work closely with local businesses to ensure that our recommendations support the local economy and provide authentic experiences for visitors.
              </p>

              <p>
                Whether you're looking for the best tagine in Casablanca, a tranquil riad in Fez, or the most efficient way to travel between match venues, we've got you covered. Join us in celebrating the beautiful game in one of the world's most vibrant and welcoming countries.
              </p>
            </div>

            <div className="mt-12 text-center">
              <ButtonCTA href="/offers" variant="moroccan" showArrow>
                Explore Our Offers
              </ButtonCTA>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}