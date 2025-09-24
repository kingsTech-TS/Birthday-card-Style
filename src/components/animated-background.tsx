"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  delay: number
  type: "star" | "heart" | "sparkle"
}

export function AnimatedBackground() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = []
      const types: ("star" | "heart" | "sparkle")[] = ["star", "heart", "sparkle"]

      for (let i = 0; i < 20; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10,
          delay: Math.random() * 3,
          type: types[Math.floor(Math.random() * types.length)],
        })
      }

      setElements(newElements)
    }

    generateElements()
  }, [])

  const getElementIcon = (type: string) => {
    switch (type) {
      case "star":
        return "✨"
      case "heart":
        return "💖"
      case "sparkle":
        return "⭐"
      default:
        return "✨"
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-pink-100 to-orange-100 animate-gradient" />

      {/* Floating elements */}
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute animate-float"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          {getElementIcon(element.type)}
        </div>
      ))}

      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-background/20" />
    </div>
  )
}
