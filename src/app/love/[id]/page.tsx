"use client";

import Button from "@/components/button";
import Loader from "@/components/loader";
import { LovePassCard, LovePassCardType } from "@/components/love-pass-card";
import NavBar from "@/components/nav-bar";
import { services } from "@/services";
import { getAuthToken } from "@/utils/auth-token";
import { copyText } from "@/utils/copy-text";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewLovePass() {
  const [lovePass, setLovePass] = useState<LovePassCardType>({
    to: "",
    from: "",
    message: "",
    emoji: "",
    backgroundColor: "#333333",
  });
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  async function fetchLovePass() {
    try {
      setLoading(true);
      const card = await services.cards.findOneById(
        (params.id as string) || ""
      );
      setLovePass(card);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteLovePass() {
    const confirmDelete = confirm("Are you sure you want to delete this card?");

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);
      await services.cards.deleteOneById((params.id as string) || "");
      router.push("/love");
    } catch (error: any) {
      console.error(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLovePass();
  }, []);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="py-20 bg-neutral">
          <div className="flex flex-col items-center container mx-auto">
            <h3 className="text-center text-3xl font-bold text-foreground mb-10">
              LovePass Card
            </h3>
            <Loader />
          </div>
        </div>
      </>
    );
  }

  if (!lovePass) {
    return (
      <>
        <NavBar />
        <div className="py-20 bg-neutral">
          <div className="flex flex-col items-center container mx-auto">
            <h3 className="text-center text-3xl font-bold text-foreground mb-10">
              LovePass Card
            </h3>
            <p className="text-center text-xl font-bold text-foreground">
              Card not found.{" "}
              <Link href="/" className="underline hover:no-underline">
                Back
              </Link>
            </p>
          </div>
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
            LovePass Card
          </h3>
          <div key={lovePass._id} className="flex flex-col gap-2">
            <LovePassCard {...lovePass} />
            <div className="grid grid-cols-3 gap-2">
              {lovePass.userAuthToken === getAuthToken() && (
                <Button variant="accent" disabled>
                  Edit
                </Button>
              )}
              <Button
                variant="accent"
                onClick={() => {
                  copyText(window.location.href);
                  alert("Link copied to clipboard!");
                }}
              >
                Share link
              </Button>
              {lovePass.userAuthToken === getAuthToken() && (
                <Button variant="accent" onClick={deleteLovePass}>
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
