"use client";

import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function Loader() {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiked((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`p-3 rounded-full transition-all duration-300 ${
        liked ? "bg-primary scale-110" : "bg-accent"
      }`}
    >
      <Heart
        className={`w-8 h-8 transition-all duration-300 ${
          liked ? "text-white fill-current" : "text-neutral"
        }`}
      />
    </div>
  );
}
