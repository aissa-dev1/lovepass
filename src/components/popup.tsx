"use client";

import React, { PropsWithChildren } from "react";
import { X } from "lucide-react";

interface PopUpProps extends PropsWithChildren {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PopUp({ active, setActive, children }: PopUpProps) {
  return (
    <div className="popup__overlay" onClick={() => setActive(false)}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <X className="popup__close" onClick={() => setActive(false)} />
        {children}
      </div>
    </div>
  );
}
