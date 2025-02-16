"use client";

import Button from "@/components/button";
import { LovePassCard, LovePassCardType } from "@/components/love-pass-card";
import PopUp from "@/components/popup";
import { useEffect, useState } from "react";
import "./index.scss";
import { lovePassCardsThemesData } from "@/data/love-pass-cards-themes";

interface LovePassThemePickerProps {
  card: LovePassCardType;
  setCard: React.Dispatch<React.SetStateAction<LovePassCardType>>;
  themePickerActive: boolean;
  setThemePickerActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LovePassThemePickerPopUp(
  props: LovePassThemePickerProps
) {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(
    lovePassCardsThemesData[0].backgroundColor
  );
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [mode, setMode] = useState<"theme" | "solid">("theme");

  function saveChanges() {
    if (mode === "theme") {
      for (const theme of lovePassCardsThemesData) {
        if (theme.backgroundColor === selectedTheme) {
          props.setCard({
            ...props.card,
            emoji: theme.emoji,
            backgroundColor: theme.backgroundColor,
          });
          break;
        }
      }
    } else {
      props.setCard({ ...props.card, backgroundColor: selectedColor });
    }

    props.setThemePickerActive(false);
  }

  function getCurrentCardTheme() {
    const theme = lovePassCardsThemesData.find(
      (theme) => theme.backgroundColor === props.card.backgroundColor
    );

    if (theme) {
      setSelectedTheme(theme.backgroundColor);
    }
  }

  useEffect(() => {
    getCurrentCardTheme();
    setSelectedColor(props.card.backgroundColor);
  }, []);

  return (
    <PopUp
      active={props.themePickerActive}
      setActive={props.setThemePickerActive}
    >
      <div className="love_pass_theme_picker_popup_content">
        <h2>Pick a Theme or Solid Color</h2>

        <div className="mode_container">
          <div className="mode_switches">
            <Button
              type="button"
              variant={mode === "theme" ? "primary" : "accent"}
              onClick={() => setMode("theme")}
            >
              Theme
            </Button>
            <Button
              type="button"
              variant={mode === "solid" ? "primary" : "accent"}
              onClick={() => setMode("solid")}
            >
              Solid
            </Button>
          </div>

          {mode === "theme" && (
            <div className="label__input__container w-full max-w-xs">
              <label className="label">Theme</label>
              <select
                className="input"
                value={selectedTheme || ""}
                onChange={(e) => {
                  setSelectedTheme(e.target.value);
                }}
              >
                {lovePassCardsThemesData.map((theme) => (
                  <option key={theme.name} value={theme.backgroundColor}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {mode === "solid" && (
            <div className="label__input__container w-full max-w-xs">
              <label htmlFor="solid_color" className="label">
                Solid color
              </label>
              <input
                id="solid_color"
                type="color"
                className="input"
                value={selectedColor}
                onChange={(e) => {
                  setSelectedColor(e.target.value);
                }}
              />
            </div>
          )}
        </div>

        <h3>Live Preview</h3>
        <div className="love_pass_card_container">
          <LovePassCard
            to={props.card.to}
            from={props.card.from}
            message={props.card.message}
            emoji={
              mode === "theme"
                ? lovePassCardsThemesData.find(
                    (theme) => theme.backgroundColor === selectedTheme
                  )?.emoji || "❤️"
                : props.card.emoji
            }
            backgroundColor={
              mode === "theme" ? selectedTheme || "" : selectedColor
            }
          />
        </div>
        <Button
          type="button"
          className="save_changes_btn"
          onClick={saveChanges}
        >
          Save changes
        </Button>
      </div>
    </PopUp>
  );
}
