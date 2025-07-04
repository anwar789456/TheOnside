import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import Navbar from "@/components/navbar/Navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AutoFollowUp",
  description: "AutoFollowUp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Analytics/>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
