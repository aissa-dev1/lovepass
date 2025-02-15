"use client";

import LovePassCard from "@/components/love-card";
import NavBar from "@/components/nav-bar";
import EmojiPicker from "emoji-picker-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./page.scss";
import Button from "@/components/button";
import PopUp from "@/components/popup";
import LovePassThemePickerPopUp from "./components/love-pass-theme-picker-popup";

export default function CreateLovePass() {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#333333");
  const [emojiPickerActive, setEmojiPickerActive] = useState(false);
  const [themePickerActive, setThemePickerActive] = useState(false);
  const router = useRouter();

  function handleSubmit(e: any) {
    e.preventDefault();
    const lovePassId = Math.random().toString(36).substr(2, 9);
    const lovePassData = { to, from, message, lovePassId };
    localStorage.setItem(lovePassId, JSON.stringify(lovePassData));
    router.push(`/love/${lovePassId}`);
  }

  return (
    <>
      <NavBar />
      <div className="create_love_pass_container">
        <h2>Create Your LovePass</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="label__input__container">
              <label htmlFor="to" className="label">
                To
              </label>
              <input
                id="to"
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
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
                value={from}
                onChange={(e) => setFrom(e.target.value)}
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
                to={to}
                from={from}
                message={message}
                emoji={emoji}
                backgroundColor={backgroundColor}
                setBackgroundColor={setBackgroundColor}
                setEmoji={setEmoji}
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
                      setEmoji(emojiData.emoji);
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input"
              placeholder="Enter a special message for your loved one"
              required
            ></textarea>
          </div>
          <Button type="submit">Generate LovePass</Button>
        </form>
        <div className="card_container">
          <LovePassCard
            backgroundColor={backgroundColor}
            cardTitle="LovePass"
            cardSubtitle={to}
            mainText={message}
            fromText={from}
            emoji={emoji}
          />
        </div>
      </div>
    </>
  );
}
