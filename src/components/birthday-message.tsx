"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface BirthdayMessageProps {
  name?: string
  age?: number
  customMessage?: string
}

export function BirthdayMessage({ name = "Birthday Star", age, customMessage }: BirthdayMessageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  const messages = [
    customMessage ||
      `Happy Birthday, ${name}! Today is all about celebrating the amazing person you are and all the joy you bring to everyone around you.`,
    `${age ? `${age} years of awesome!` : "Another year of incredible memories!"} Here's to making this birthday the most magical one yet.`,
    "May your special day be filled with laughter, love, and all your favorite things. You deserve nothing but the best!",
    "Wishing you a birthday that's as wonderful and unique as you are. Let's make some unforgettable memories today!",
  ]

  useEffect(() => {
    // Trigger fade-in animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Cycle through messages
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <section className="w-full max-w-4xl mx-auto">
      <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-card/80 to-secondary/10 backdrop-blur-sm border-2 border-primary/30">
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 text-4xl animate-sparkle">✨</div>
        <div className="absolute top-4 right-4 text-4xl animate-sparkle" style={{ animationDelay: "1s" }}>
          🎈
        </div>
        <div className="absolute bottom-4 left-4 text-4xl animate-sparkle" style={{ animationDelay: "2s" }}>
          🎂
        </div>
        <div className="absolute bottom-4 right-4 text-4xl animate-sparkle" style={{ animationDelay: "0.5s" }}>
          🎉
        </div>

        <div className="relative z-10 p-8 md:p-12 text-center space-y-8">
          {/* Main Birthday Message */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6 animate-float">
              {age ? `Happy ${age}th Birthday!` : "Happy Birthday!"}
            </h2>

            <div className="relative h-32 md:h-24 flex items-center justify-center">
              <p
                className={`text-lg md:text-xl text-foreground max-w-3xl leading-relaxed transition-all duration-500 absolute inset-0 flex items-center justify-center ${
                  currentMessageIndex === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                {messages[0]}
              </p>
              {messages.slice(1).map((message, index) => (
                <p
                  key={index + 1}
                  className={`text-lg md:text-xl text-foreground max-w-3xl leading-relaxed transition-all duration-500 absolute inset-0 flex items-center justify-center ${
                    currentMessageIndex === index + 1 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {message}
                </p>
              ))}
            </div>
          </div>

          {/* Special Birthday Quote */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <blockquote className="text-xl md:text-2xl font-medium text-accent italic border-l-4 border-secondary pl-6 max-w-2xl mx-auto">
              "Birthdays are nature's way of telling us to eat more cake and celebrate life!"
            </blockquote>
          </div>

          {/* Birthday Stats */}
          {age && (
            <div
              className={`transition-all duration-1000 delay-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-primary/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">{age}</div>
                  <div className="text-sm text-muted-foreground">Years Amazing</div>
                </div>
                <div className="bg-secondary/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-secondary-foreground">{age * 365}</div>
                  <div className="text-sm text-muted-foreground">Days of Joy</div>
                </div>
                <div className="bg-accent/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-accent-foreground">{age * 12}</div>
                  <div className="text-sm text-muted-foreground">Months of Fun</div>
                </div>
                <div className="bg-primary/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">∞</div>
                  <div className="text-sm text-muted-foreground">Memories Made</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </section>
  )
}
