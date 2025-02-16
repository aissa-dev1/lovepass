"use client";

import { LovePassCard, LovePassCardType } from "@/components/love-pass-card";
import NavBar from "@/components/nav-bar";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import "./page.scss";
import Button from "@/components/button";
import PopUp from "@/components/popup";
import LovePassThemePickerPopUp from "./components/love-pass-theme-picker-popup";
import { services } from "@/services";
import { useRouter } from "next/navigation";

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
      <div className="create_love_pass_container">
        <h2>Create Your LovePass</h2>
        <form onSubmit={handleFormSubmit}>
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
        <div className="card_container">
          <LovePassCard {...card} />
        </div>
      </div>
    </>
  );
}
