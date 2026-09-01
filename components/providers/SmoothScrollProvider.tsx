"use client";

import { ReactNode } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      {children as any}
    </ReactLenis>
  );
}
