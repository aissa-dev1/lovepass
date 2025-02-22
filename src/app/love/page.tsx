"use client";

import Button from "@/components/button";
import Loader from "@/components/loader";
import { LovePassCard, LovePassCardType } from "@/components/love-pass-card";
import NavBar from "@/components/nav-bar";
import { services } from "@/services";
import { copyText } from "@/utils/copy-text";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LovePassCards() {
  const [lovePasses, setLovePasses] = useState<LovePassCardType[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchLovePasses() {
    const cachedLovePasses = sessionStorage.getItem("love_passes");

    if (cachedLovePasses) {
      setLovePasses(JSON.parse(cachedLovePasses));
      return;
    }

    try {
      setLoading(true);
      const cards = await services.cards.findManyByAuthToken();
      setLovePasses(cards);
      sessionStorage.setItem("love_passes", JSON.stringify(cards));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLovePasses();
  }, []);

  return (
    <>
      <NavBar />
      <div className="py-20 bg-neutral">
        <div className="flex flex-col items-center container mx-auto">
          <h3 className="text-center text-3xl font-bold text-foreground mb-10">
            Your LovePasses
          </h3>
          {loading ? (
            <Loader />
          ) : lovePasses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lovePasses.map((lovePass) => (
                <div key={lovePass._id} className="flex flex-col gap-2">
                  <Link href={`/love/${lovePass.lovePassId}`}>
                    <LovePassCard {...lovePass} />
                  </Link>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href={`/love/${lovePass.lovePassId}`}>
                      <Button variant="accent">View</Button>
                    </Link>
                    <Button
                      variant="accent"
                      onClick={() => {
                        copyText(
                          window.location.origin +
                            `/love/${lovePass.lovePassId}`
                        );
                        alert("Link copied to clipboard!");
                      }}
                    >
                      Share link
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl font-bold text-foreground">
              You don&apos;t have any LovePasses yet.{" "}
              <Link href="/create" className="underline__link">
                Create one
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
