"use client";

import { useState, type ReactNode } from "react";

type AccordionProps = {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export default function Accordion({
  title,
  defaultOpen = true,
  children,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl mb-3 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-left"
      >
        <span>{title}</span>
        <span className="text-xl leading-none">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-3 py-3 text-sm">
          {children}
        </div>
      )}
    </div>
  );
}
