"use client";

import Link from "next/link";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { ZellijPattern } from "@/components/ui/pattern";
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 p-6 md:p-10 lg:p-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#C53030] text-white">
              <Trophy size={20} />
            </div>
            <span className="font-amiri text-xl md:text-2xl font-bold">
              World Cup Morocco
            </span>
          </Link>
          
          <div className="mb-6">
            <h1 className="font-amiri text-3xl font-bold mb-2">Create an account</h1>
            <p className="text-muted-foreground">
              Sign up to get personalized World Cup recommendations and save your favorite places.
            </p>
          </div>
          
          <RegisterForm />
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden lg:block w-1/2 bg-[#C53030] relative overflow-hidden">
        <ZellijPattern className="opacity-5" />
        <div className="absolute inset-0 z-10">
          <Image
            src="https://images.pexels.com/photos/3952050/pexels-photo-3952050.jpeg"
            alt="Morocco"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#C53030]/60 pointer-events-none" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white p-8 max-w-lg">
            <h2 className="font-amiri text-4xl font-bold mb-4">
              Join the World Cup Experience
            </h2>
            <p className="text-white/90 text-lg">
              Create an account to unlock exclusive features and personalized recommendations for your Moroccan adventure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}