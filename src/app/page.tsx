import { Card } from "@/components/ui/card"
import { AnimatedBackground } from "@/components/animated-background"
import { AutoConfetti } from "@/components/confetti-animation"
import { BirthdayCarousel } from "@/components/birthday-carousel"
import { BirthdayMessage } from "@/components/birthday-message"
import { WishesWall } from "@/components/wishes-wall"

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* <AnimatedBackground /> */}
      <AutoConfetti />

      <div className="relative z-10 container mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold text-primary animate-float">Happy Birthday! 🎉</h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Welcome to your special celebration! Get ready for confetti, memories, and birthday wishes from everyone who
            loves you.
          </p>
        </div>

        {/* Birthday Message Section */}
        <BirthdayMessage name="Ndunewe David Onyekachi" age={57} />

        {/* Carousel Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Birthday Memories</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Relive the magical moments and create new memories on this special day
            </p>
          </div>
          <BirthdayCarousel />
        </section>

        {/* Wishes Wall Section */}
        <WishesWall />

        {/* Footer */}
        <footer className="text-center py-8">
          <Card className="inline-block p-6 bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30">
            <p className="text-lg font-medium text-foreground">🎂 Make this birthday unforgettable! 🎂</p>
            <p className="text-sm text-muted-foreground mt-2">
              Celebrating another year of amazing memories and endless possibilities
            </p>
          </Card>
        </footer>
      </div>
    </main>
  )
}
