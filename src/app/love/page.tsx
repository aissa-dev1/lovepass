"use client";

import LovePassCard from "@/components/love-card";
import NavBar from "@/components/nav-bar";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LovePassCards() {
  const [lovePasses, setLovePasses] = useState([]);

  useEffect(() => {
    const storedLovePasses = JSON.parse(
      localStorage.getItem("lovePasses") || "[]"
    );
    setLovePasses(storedLovePasses);
  }, []);

  if (lovePasses.length === 0) {
    return (
      <>
        <NavBar />
        <div className="container mx-auto text-center py-20">
          <h2 className="text-3xl font-bold mb-6">No LovePasses Found</h2>
          <Link href="/create">
            <p className="bg-primary text-white py-2 px-4 rounded-lg">
              Create a LovePass
            </p>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="py-20 bg-neutral">
        <div className="flex flex-col items-center container mx-auto">
          <h3 className="text-center text-3xl font-bold text-foreground mb-10">
            Your LovePasses
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lovePasses.map((lovePass, index) => (
              <LovePassCard
                key={index}
                backgroundColor="#1E3A8A"
                cardTitle="LovePass"
                cardSubtitle={`To: ${lovePass.to}`}
                mainText={lovePass.message}
                fromText={`From: ${lovePass.from}`}
                emoji="❤️"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
