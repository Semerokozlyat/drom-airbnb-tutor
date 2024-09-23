import type { Metadata } from "next";
import localFont from "next/font/local";
import { Nunito } from 'next/font/google';
import "./globals.css";
import Navbar from '@/app/components/navbar/Navbar';
import RegisterModal from "@/app/components/modals/RegisterModal";
import LoginModal from "@/app/components/modals/LoginModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import getCurrentUser from "@/app/actions/getCurrentUser";
import RentModal from "@/app/components/modals/RentModal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drom AirBnB App",
  description: "The Drom AirBnB App project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <ToasterProvider />
        <LoginModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
