"use client";

import { LovePassCard, LovePassCardType } from "@/components/love-pass-card";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import PopUp from "@/components/popup";
import { services } from "@/services";
import { useRouter, useSearchParams } from "next/navigation";
import NavBar from "@/components/nav-bar";
import LovePassThemePickerPopUp from "@/components/love-pass-theme-picker-popup";
import Link from "next/link";

export default function UpdateLovePass() {
  const [card, setCard] = useState<LovePassCardType>({
    to: "",
    from: "",
    message: "",
    emoji: "",
    backgroundColor: "#333333",
  });
  const [emojiPickerActive, setEmojiPickerActive] = useState(false);
  const [themePickerActive, setThemePickerActive] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleFormSubmit(e: any) {
    e.preventDefault();

    try {
      setIsFormSubmitting(true);
      await services.cards.updateOneByLovePassId(
        searchParams.get("lovePassId") || "",
        card
      );
      sessionStorage.removeItem("love_passes");
      router.push(`/love/${searchParams.get("lovePassId") || ""}`);
    } catch (error: any) {
      alert(error.response.data);
    } finally {
      setIsFormSubmitting(false);
    }
  }

  function updateCardUsingSearchParams() {
    if (!searchParams.get("lovePassId")) {
      router.push("/");
      return;
    }

    setCard({
      to: searchParams.get("to") || "",
      from: searchParams.get("from") || "",
      message: searchParams.get("message") || "",
      backgroundColor: `#${searchParams.get("backgroundColor")}` || "",
      emoji: searchParams.get("emoji") || "",
      lovePassId: searchParams.get("lovePassId") || "",
    });
  }

  useEffect(() => {
    updateCardUsingSearchParams();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container py-20">
        <h2 className="text-3xl font-bold text-center">Update Your LovePass</h2>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-4 border border-gray-300 p-6 rounded-lg mt-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="label__input__container">
              <label htmlFor="to" className="label">
                To
              </label>
              <input
                id="to"
                type="text"
                value={card.to}
                onChange={(e) => setCard({ ...card, to: e.target.value })}
                className="input"
                placeholder="Enter the name of your loved one"
                required
              />
            </div>
            <div className="label__input__container">
              <label htmlFor="from" className="label">
                From
              </label>
              <input
                id="from"
                type="text"
                value={card.from}
                onChange={(e) => setCard({ ...card, from: e.target.value })}
                className="input"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="accent"
              onClick={() => {
                setThemePickerActive(true);
              }}
            >
              Pick a theme
            </Button>
            {themePickerActive && (
              <LovePassThemePickerPopUp
                card={card}
                setCard={setCard}
                themePickerActive={themePickerActive}
                setThemePickerActive={setThemePickerActive}
              />
            )}
            <div>
              <Button
                type="button"
                variant="accent"
                onClick={() => {
                  setEmojiPickerActive(true);
                }}
              >
                Pick an emoji
              </Button>
              {emojiPickerActive && (
                <PopUp
                  active={emojiPickerActive}
                  setActive={setEmojiPickerActive}
                >
                  <EmojiPicker
                    onEmojiClick={(emojiData) => {
                      setCard({ ...card, emoji: emojiData.emoji });
                      setEmojiPickerActive(false);
                    }}
                  />
                </PopUp>
              )}
            </div>
          </div>
          <div className="label__input__container">
            <label htmlFor="message" className="label">
              Message
            </label>
            <textarea
              id="message"
              value={card.message}
              onChange={(e) => setCard({ ...card, message: e.target.value })}
              className="input"
              placeholder="Enter a special message for your loved one"
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Link href={`/love/${searchParams.get("lovePassId") || ""}`}>
              <Button type="button" variant="accent">
                Back
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isFormSubmitting}
              className="col-span-2"
            >
              {isFormSubmitting ? "Updating..." : "Update LovePass"}
            </Button>
          </div>
        </form>
        <div className="flex__center mt-6">
          <LovePassCard {...card} />
        </div>
      </div>
    </>
  );
}
