/**
 * Provides NextUI styling context to the application.
 *
 * Wraps the app in a NextUIProvider component to enable
 * using NextUI components.
 */
// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";

export function NextProvider({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
