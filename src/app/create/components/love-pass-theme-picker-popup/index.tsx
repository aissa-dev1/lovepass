"use client";

import Button from "@/components/button";
import LovePassCard from "@/components/love-card";
import PopUp from "@/components/popup";
import { exampleLovePassCardsThemes } from "@/data/example-love-cards-themes";
import { useEffect, useState } from "react";
import "./index.scss";

interface LovePassThemePickerProps {
  to: string;
  from: string;
  message: string;
  emoji: string;
  backgroundColor: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  setEmoji: React.Dispatch<React.SetStateAction<string>>;
  themePickerActive: boolean;
  setThemePickerActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LovePassThemePickerPopUp(
  props: LovePassThemePickerProps
) {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(
    exampleLovePassCardsThemes[0].color
  );
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [mode, setMode] = useState<"theme" | "solid">("theme");

  function saveChanges() {
    if (mode === "theme") {
      for (const theme of exampleLovePassCardsThemes) {
        if (theme.color === selectedTheme) {
          props.setBackgroundColor(theme.color);
          props.setEmoji(theme.emoji);
          break;
        }
      }
    } else {
      props.setBackgroundColor(selectedColor);
    }

    props.setThemePickerActive(false);
  }

  useEffect(() => {
    setSelectedColor(props.backgroundColor);
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
                {exampleLovePassCardsThemes.map((theme) => (
                  <option key={theme.name} value={theme.color}>
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
            backgroundColor={mode === "theme" ? selectedTheme : selectedColor}
            cardTitle="LovePass"
            cardSubtitle={props.to}
            mainText={props.message}
            fromText={props.from}
            emoji={
              mode === "theme"
                ? exampleLovePassCardsThemes.find(
                    (theme) => theme.color === selectedTheme
                  )?.emoji || "❤️"
                : props.emoji
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
