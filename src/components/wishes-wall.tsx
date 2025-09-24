"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Send, Sparkles } from "lucide-react"
import { ConfettiAnimation } from "@/components/confetti-animation"

interface Wish {
  id: number
  name: string
  message: string
  timestamp: Date
  color: string
}

const wishColors = ["bg-primary/20", "bg-secondary/20", "bg-accent/20", "bg-pink-200/50", "bg-purple-200/50"]

const defaultWishes: Wish[] = [
  {
    id: 1,
    name: "Sarah",
    message: "Wishing you the happiest of birthdays! May this year bring you endless joy and amazing adventures! 🎉",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    color: wishColors[0],
  },
  {
    id: 2,
    name: "Mike",
    message: "Happy Birthday! Hope your special day is filled with laughter, cake, and all your favorite people! 🎂",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    color: wishColors[1],
  },
  {
    id: 3,
    name: "Emma",
    message: "Another year older, another year more awesome! Have the most wonderful birthday celebration! ✨",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    color: wishColors[2],
  },
]

export function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>(defaultWishes)
  const [newWish, setNewWish] = useState({ name: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newWish.name.trim() || !newWish.message.trim()) return

    setIsSubmitting(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const wish: Wish = {
      id: Date.now(),
      name: newWish.name.trim(),
      message: newWish.message.trim(),
      timestamp: new Date(),
      color: wishColors[Math.floor(Math.random() * wishColors.length)],
    }

    setWishes((prev) => [wish, ...prev])
    setNewWish({ name: "", message: "" })
    setIsSubmitting(false)

    // Trigger confetti
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 100)
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <section className="w-full max-w-6xl mx-auto space-y-8">
      <ConfettiAnimation trigger={showConfetti} duration={2000} intensity={30} />

      {/* Section Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground flex items-center justify-center gap-3">
          <Heart className="text-accent animate-pulse" />
          Birthday Wishes Wall
          <Sparkles className="text-secondary animate-sparkle" />
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Leave your heartfelt birthday wishes and join the celebration! Every message makes this day more special.
        </p>
      </div>

      {/* Wish Form */}
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={newWish.name}
                onChange={(e) => setNewWish((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-background/50 border-border/50 focus:border-primary"
                required
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Birthday Wish
              </label>
              <Textarea
                id="message"
                placeholder="Write your birthday message..."
                value={newWish.message}
                onChange={(e) => setNewWish((prev) => ({ ...prev, message: e.target.value }))}
                className="bg-background/50 border-border/50 focus:border-primary min-h-[100px] resize-none"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !newWish.name.trim() || !newWish.message.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Wish
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>

      {/* Wishes Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishes.map((wish, index) => (
          <Card
            key={wish.id}
            className={`p-6 ${wish.color} border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-foreground text-lg">{wish.name}</h4>
                <span className="text-xs text-muted-foreground">{formatTimeAgo(wish.timestamp)}</span>
              </div>
              <p className="text-foreground leading-relaxed">{wish.message}</p>
              <div className="flex justify-end">
                <Heart className="h-5 w-5 text-accent hover:fill-accent transition-colors cursor-pointer" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Wishes Counter */}
      <div className="text-center">
        <Card className="inline-block p-4 bg-secondary/20 border-secondary/30">
          <p className="text-lg font-medium text-foreground">
            <span className="text-2xl font-bold text-secondary">{wishes.length}</span> birthday wishes and counting! 🎉
          </p>
        </Card>
      </div>
    </section>
  )
}
