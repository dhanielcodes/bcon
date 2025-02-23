import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { MainProvider } from "../context/global.context";
import { AuthProvider } from "@/context/auth.context";
import { Toaster } from "react-hot-toast";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], // Choose required weights
  display: "swap",
});
export const metadata: Metadata = {
  title: "BCON",
  description: "Welcome to BCON Money Transfer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" type="image/x-icon" />
      </head>
      <body className={`${plusJakartaSans.className} antialiased`}>
        <QueryProvider>
          <MainProvider>
            <AuthProvider>
              <Toaster position="top-right" />
              {children}
            </AuthProvider>
          </MainProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
