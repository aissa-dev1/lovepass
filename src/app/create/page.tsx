"use client";

import { LovePassCard, LovePassCardType } from "@/components/love-pass-card";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import Button from "@/components/button";
import PopUp from "@/components/popup";
import { services } from "@/services";
import { useRouter } from "next/navigation";
import NavBar from "@/components/nav-bar";
import LovePassThemePickerPopUp from "./components/love-pass-theme-picker-popup";

export default function CreateLovePass() {
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

  async function handleFormSubmit(e: any) {
    e.preventDefault();

    try {
      setIsFormSubmitting(true);
      const response = await services.cards.createOne(card);
      sessionStorage.removeItem("love_passes");
      router.push(`/love/${response}`);
    } catch (error: any) {
      alert(error.response.data);
    } finally {
      setIsFormSubmitting(false);
    }
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto py-20">
        <h2 className="text-3xl font-bold text-center">Create Your LovePass</h2>
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
          <Button type="submit" disabled={isFormSubmitting}>
            {isFormSubmitting ? "Creating..." : "Create LovePass"}
          </Button>
        </form>
        <div className="flex__center mt-6">
          <LovePassCard {...card} />
        </div>
      </div>
    </>
  );
}
