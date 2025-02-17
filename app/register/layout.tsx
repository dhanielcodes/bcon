import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";
import AuthLayout from "@/layouts/AuthLayout";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], // Choose required weights
  display: "swap",
});
export const metadata: Metadata = {
  title: "Register | BCON",
  description: "Register yourself get a BCON account to start transacting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.className} antialiased `}>
        <AuthLayout>{children}</AuthLayout>
      </body>
    </html>
  );
}
