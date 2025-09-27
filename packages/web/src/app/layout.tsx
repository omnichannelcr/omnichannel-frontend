import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/loggedNavigation/Layout";
import { UserProfile } from "@/types/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omnichannel Dashboard",
  description: "Omnichannel customer management platform",
};

// Sample user data - in a real app, this would come from authentication
const sampleUser: UserProfile = {
  name: "John Smith",
  email: "jnsmith99@gmail.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout user={sampleUser}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
