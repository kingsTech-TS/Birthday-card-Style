"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Pause, Play, Plus } from "lucide-react"

interface CarouselSlide {
  _id?: string
  id?: number
  image: string
  title: string
  description: string
}

interface BirthdayCarouselProps {
  autoSlideInterval?: number
}

export function BirthdayCarousel({ autoSlideInterval = 4000 }: BirthdayCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [userSlides, setUserSlides] = useState<CarouselSlide[]>([])

  // Modal state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tempFile, setTempFile] = useState<File | null>(null)
  const [tempPreview, setTempPreview] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")

  // ✅ Fetch slides from MongoDB
  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch("/api/slides")
        const data = await res.json()
        if (Array.isArray(data)) setUserSlides(data)
      } catch (err) {
        console.error("Failed to fetch slides:", err)
      }
    }
    fetchSlides()
  }, [])

  // ✅ Auto-slide
  useEffect(() => {
    if (!isPlaying || isDragging || userSlides.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % userSlides.length)
    }, autoSlideInterval)
    return () => clearInterval(interval)
  }, [isPlaying, isDragging, userSlides.length, autoSlideInterval])

  const goToSlide = (index: number) => setCurrentSlide(index)
  const goToPrevious = () =>
    setCurrentSlide((prev) => (prev - 1 + userSlides.length) % userSlides.length)
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % userSlides.length)
  const togglePlayPause = () => setIsPlaying(!isPlaying)

  // ✅ Dragging
  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setDragStart(clientX)
  }
  const handleDragEnd = (clientX: number) => {
    if (!isDragging) return
    const dragDistance = clientX - dragStart
    const threshold = 50
    if (dragDistance > threshold) goToPrevious()
    else if (dragDistance < -threshold) goToNext()
    setIsDragging(false)
    setDragStart(0)
  }

  // ✅ File upload → preview
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setTempFile(file)
      setTempPreview(URL.createObjectURL(file))
      setIsDialogOpen(true)
    }
  }

  // ✅ Confirm + Upload to Cloudinary + Save in MongoDB
  const handleConfirmAdd = async () => {
    if (!tempFile) return

    try {
      // Upload to Cloudinary
      const formData = new FormData()
      formData.append("file", tempFile)
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
      )

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      )
      const cloudData = await cloudRes.json()

      // Save in MongoDB
      const saveRes = await fetch("/api/slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: cloudData.secure_url,
          title: newTitle || "Custom Image",
          description: newDescription || "Your uploaded photo 🎉",
        }),
      })

      const savedSlide = await saveRes.json()
      setUserSlides((prev) => [...prev, savedSlide])
      setCurrentSlide(userSlides.length) // jump to new slide
    } catch (err) {
      console.error("❌ Failed to upload slide:", err)
    } finally {
      setTempFile(null)
      setTempPreview(null)
      setNewTitle("")
      setNewDescription("")
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-2 border-primary/20">
        {/* Carousel */}
        <div
          className="relative h-96 md:h-[500px] overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseUp={(e) => handleDragEnd(e.clientX)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {userSlides.map((slide, idx) => (
              <div key={slide._id || idx} className="w-full flex-shrink-0 relative">
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{slide.title}</h3>
                  <p className="text-lg md:text-xl opacity-90">{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Nav */}
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
            {/* Indicators */}
            <div className="flex space-x-2">
              {userSlides.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-primary scale-125"
                      : "bg-muted hover:bg-primary/50"
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            <div className="flex items-center space-x-2">
              {/* Upload Button */}
              <label className="cursor-pointer flex items-center px-3 py-1 rounded-md bg-background/50 border hover:bg-background/70">
                <Plus className="h-4 w-4 mr-1" />
                Add Image
                <input type="file" accept="image/*" className="hidden" onChange={handleAddImage} />
              </label>

              {/* Play/Pause */}
              <Button
                variant="outline"
                size="sm"
                onClick={togglePlayPause}
                className="bg-background/50 backdrop-blur-sm"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span className="ml-2">{isPlaying ? "Pause" : "Play"}</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Add Slide Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Slide</DialogTitle>
          </DialogHeader>
          {tempPreview && (
            <div className="mb-4">
              <img src={tempPreview} alt="Preview" className="w-full h-40 object-cover rounded-md" />
            </div>
          )}
          <Input
            placeholder="Enter a title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="mb-2"
          />
          <Textarea
            placeholder="Enter a description..."
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="mb-2"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmAdd}>Add Slide</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
