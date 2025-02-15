"use client";

import LovePassCard from "@/components/love-card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewLovePass() {
  const router = useRouter();
  const id = null;
  const [lovePass, setLovePass] = useState(null);

  useEffect(() => {
    if (id) {
      const storedLovePass = localStorage.getItem(id as string);
      if (storedLovePass) {
        setLovePass(JSON.parse(storedLovePass));
      }
    }
  }, [id]);

  if (!lovePass) {
    return (
      <div className="container mx-auto text-center py-20">
        <h2 className="text-3xl font-bold mb-6">
          Oops! This LovePass doesn’t exist.
        </h2>
        <Link href="/create">
          <p className="bg-primary text-white py-2 px-4 rounded-lg">
            Create a LovePass
          </p>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20">
      <h2 className="text-3xl font-bold text-center mb-6">Your LovePass</h2>
      <LovePassCard
        backgroundColor="#1E3A8A"
        cardTitle="LovePass"
        cardSubtitle={`To: ${lovePass.to}`}
        mainText={lovePass.message}
        fromText={`From: ${lovePass.from}`}
        emoji="❤️"
      />
    </div>
  );
}
