/**
 * Provider component that wraps children in SessionProvider from next-auth.
 * Allows access to session data in child components.
 *
 * @param children - React components to wrap in session context
 */
"use client";

import { SessionProvider } from "next-auth/react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
