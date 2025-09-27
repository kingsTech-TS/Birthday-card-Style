"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Send, Sparkles } from "lucide-react";
import { ConfettiAnimation } from "@/components/confetti-animation";

interface Wish {
  _id: string;
  name: string;
  message: string;
  color: string;
  createdAt: string;
  likes: number;
}

export function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newWish, setNewWish] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const fetchWishes = async () => {
      const res = await fetch("/api/wishes");
      const data = await res.json();
      setWishes(data);
    };
    fetchWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.name.trim() || !newWish.message.trim()) return;

    setIsSubmitting(true);

    const res = await fetch("/api/wishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWish),
    });

    if (res.ok) {
      const savedWish = await res.json();
      setWishes((prev) => [savedWish, ...prev]);
      setNewWish({ name: "", message: "" });

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }

    setIsSubmitting(false);
  };

  // const handleLike = async (id: string) => {
  //   const res = await fetch(`/api/wishes/${id}`, { method: "PATCH" });
  //   if (res.ok) {
  //     const updated = await res.json();
  //     setWishes((prev) =>
  //       prev.map((wish) => (wish._id === id ? { ...wish, likes: updated.likes } : wish))
  //     );
  //   }
  // };

  const formatTimeAgo = (dateString: string) => {
    const timestamp = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <section className="w-full max-w-6xl mx-auto space-y-8">
      <ConfettiAnimation trigger={showConfetti} duration={2000} intensity={30} />

      {/* Form */}
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={newWish.name}
                onChange={(e) => setNewWish((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Birthday Wish
              </label>
              <Textarea
                id="message"
                placeholder="Write your birthday message..."
                value={newWish.message}
                onChange={(e) => setNewWish((prev) => ({ ...prev, message: e.target.value }))}
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-[#f79a9a]" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Wish"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Wishes Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishes.map((wish, index) => (
          <Card
            key={wish._id}
            className={`p-6 ${wish.color} border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-105`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg">{wish.name}</h4>
                <span className="text-xs text-muted-foreground">
                  {formatTimeAgo(wish.createdAt)}
                </span>
              </div>
              <p className="leading-relaxed">{wish.message}</p>
              {/* <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => handleLike(wish._id)}
                  className="flex items-center gap-1 text-accent hover:scale-110 transition-transform"
                  aria-label="Like this wish"
                >
                  <Heart
                    className={`h-5 w-5 ${wish.likes > 0 ? "fill-accent" : ""}`}
                  />
                  <span className="text-sm">{wish.likes}</span>
                </button>
              </div> */}
            </div>
          </Card>
        ))}
      </div>

      {/* Wishes Counter */}
      <div className="text-center">
        <Card className="inline-block p-4 bg-secondary/20 border-secondary/30">
          <p className="text-lg font-medium">
            <span className="text-2xl font-bold text-secondary">{wishes.length}</span> birthday wishes and counting! 🎉
          </p>
        </Card>
      </div>
    </section>
  );
}
