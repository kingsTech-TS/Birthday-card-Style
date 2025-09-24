"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

interface CarouselSlide {
  id: number
  image: string
  title: string
  description: string
}

interface BirthdayCarouselProps {
  slides?: CarouselSlide[]
  autoSlideInterval?: number
}

const defaultSlides: CarouselSlide[] = [
  {
    id: 1,
    image: "/birthday-party-celebration-with-balloons-and-cake.jpg",
    title: "Birthday Celebration",
    description: "A magical day filled with joy, laughter, and unforgettable memories!",
  },
  {
    id: 2,
    image: "/birthday-cake-with-candles-and-sparklers.jpg",
    title: "Make a Wish",
    description: "Blow out the candles and make your biggest dreams come true!",
  },
  {
    id: 3,
    image: "/friends-celebrating-birthday-with-confetti.jpg",
    title: "Friends & Family",
    description: "Surrounded by the people who love you most on your special day.",
  },
  {
    id: 4,
    image: "/birthday-gifts-and-presents-wrapped-beautifully.jpg",
    title: "Special Surprises",
    description: "Every gift is wrapped with love and filled with birthday wishes!",
  },
]

export function BirthdayCarousel({ slides = defaultSlides, autoSlideInterval = 4000 }: BirthdayCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying || isDragging) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [isPlaying, isDragging, slides.length, autoSlideInterval])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Touch/mouse drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setDragStart(clientX)
  }

  const handleDragEnd = (clientX: number) => {
    if (!isDragging) return

    const dragDistance = clientX - dragStart
    const threshold = 50

    if (dragDistance > threshold) {
      goToPrevious()
    } else if (dragDistance < -threshold) {
      goToNext()
    }

    setIsDragging(false)
    setDragStart(0)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-2 border-primary/20">
        {/* Carousel Container */}
        <div
          className="relative h-96 md:h-[500px] overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseUp={(e) => handleDragEnd(e.clientX)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
        >
          {/* Slides */}
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="w-full flex-shrink-0 relative">
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 animate-float">{slide.title}</h3>
                  <p className="text-lg md:text-xl opacity-90">{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Controls */}
        <div className="p-4 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-primary scale-125" : "bg-muted hover:bg-primary/50"
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            {/* Play/Pause Button */}
            <Button variant="outline" size="sm" onClick={togglePlayPause} className="bg-background/50 backdrop-blur-sm">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span className="ml-2">{isPlaying ? "Pause" : "Play"}</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
