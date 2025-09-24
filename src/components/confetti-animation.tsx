"use client"

import { useEffect, useState } from "react"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  color: string
  size: number
  velocityX: number
  velocityY: number
  rotationSpeed: number
}

interface ConfettiAnimationProps {
  trigger?: boolean
  duration?: number
  intensity?: number
}

export function ConfettiAnimation({ trigger = false, duration = 3000, intensity = 50 }: ConfettiAnimationProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [isActive, setIsActive] = useState(false)

  const colors = ["#ffb3b3", "#ff6f61", "#ffd700", "#ffcccc", "#ffe6e6"]

  useEffect(() => {
    if (trigger) {
      startConfetti()
    }
  }, [trigger])

  const startConfetti = () => {
    setIsActive(true)
    const pieces: ConfettiPiece[] = []

    for (let i = 0; i < intensity; i++) {
      pieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        velocityX: (Math.random() - 0.5) * 4,
        velocityY: Math.random() * 3 + 2,
        rotationSpeed: (Math.random() - 0.5) * 10,
      })
    }

    setConfetti(pieces)

    // Clear confetti after duration
    setTimeout(() => {
      setIsActive(false)
      setConfetti([])
    }, duration)
  }

  useEffect(() => {
    if (!isActive || confetti.length === 0) return

    const animationFrame = requestAnimationFrame(function animate() {
      setConfetti(
        (prevConfetti) =>
          prevConfetti
            .map((piece) => ({
              ...piece,
              x: piece.x + piece.velocityX,
              y: piece.y + piece.velocityY,
              rotation: piece.rotation + piece.rotationSpeed,
              velocityY: piece.velocityY + 0.1, // gravity
            }))
            .filter((piece) => piece.y < window.innerHeight + 50), // Remove pieces that fall off screen
      )

      if (isActive) {
        requestAnimationFrame(animate)
      }
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [isActive, confetti.length])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
          }}
        />
      ))}
    </div>
  )
}

// Auto-trigger confetti component for page load
export function AutoConfetti() {
  const [shouldTrigger, setShouldTrigger] = useState(false)

  useEffect(() => {
    // Trigger confetti after a short delay when component mounts
    const timer = setTimeout(() => {
      setShouldTrigger(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return <ConfettiAnimation trigger={shouldTrigger} duration={4000} intensity={60} />
}
