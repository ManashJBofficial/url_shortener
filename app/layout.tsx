/**
 * RootLayout component defines the base layout for the application.
 *
 * It includes:
 * - Importing global styles
 * - Setting up font
 * - Providing Redux store
 * - Wrapping app in context providers
 * - Setting HTML metadata
 *
 * The component renders the `children` within the layout.
 */
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./components/Provider";
import { NextProvider } from "./components/NextUIProvider";
import StoreProvider from "../redux/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Url Shortener",
  description: "Using Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <Provider>
            <NextProvider>{children}</NextProvider>
          </Provider>
        </body>
      </html>
    </StoreProvider>
  );
}
