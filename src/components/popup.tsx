"use client";

import React, { PropsWithChildren } from "react";
import XmarkIcon from "./icons/outline/xmark";

interface PopUpProps extends PropsWithChildren {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PopUp({ active, setActive, children }: PopUpProps) {
  return (
    <div className="popup__overlay" onClick={() => setActive(false)}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <XmarkIcon className="popup__xmark" onClick={() => setActive(false)} />
        {children}
      </div>
    </div>
  );
}
