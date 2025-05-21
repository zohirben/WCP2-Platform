import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ButtonCTA } from "@/components/ui/button-cta";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface OfferCardProps {
  title: string;
  description: string;
  imageSrc: string;
  ctaText: string;
  ctaHref: string;
  className?: string;
  imagePosition?: "top" | "left";
}

export function OfferCard({
  title,
  description,
  imageSrc,
  ctaText,
  ctaHref,
  className,
  imagePosition = "top",
}: OfferCardProps) {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50",
        imagePosition === "left" ? "sm:flex" : "",
        className
      )}
    >
      <div 
        className={cn(
          "relative overflow-hidden",
          imagePosition === "top" && "h-60",
          imagePosition === "left" && "h-full w-full sm:w-2/5"
        )}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className={cn(
        imagePosition === "left" && "sm:w-3/5"
      )}>
        <CardHeader>
          <CardTitle className="font-amiri text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground"></p>
        </CardContent>
        <CardFooter>
          <ButtonCTA href={ctaHref} variant="moroccan" showArrow>
            {ctaText}
          </ButtonCTA>
        </CardFooter>
      </div>
    </Card>
  );
}