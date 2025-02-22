"use client";

import Button from "@/components/button";
import { LovePassCard, LovePassCardType } from "@/components/love-pass-card";
import PopUp from "@/components/popup";
import { useEffect, useState } from "react";
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
      <div>
        <h2 className="text-3xl font-bold text-center">
          Pick a Theme or Solid Color
        </h2>

        <div className="flex__center gap-4 flex-wrap mt-6">
          <div className="w-full grid grid-cols-2 gap-4">
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

        <h3 className="text-2xl font-bold mt-6 text-center">Live Preview</h3>
        <div className="flex__center mt-6">
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
        <Button type="button" className="mt-3" onClick={saveChanges}>
          Save changes
        </Button>
      </div>
    </PopUp>
  );
}
