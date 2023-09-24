import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./components/Provider";
import { NextProvider } from "./components/NextUIProvider";
// import StoreProvider from "../redux/provider";
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
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <NextProvider>{children}</NextProvider>
        </Provider>
      </body>
    </html>
  );
}
