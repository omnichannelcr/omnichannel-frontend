import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OmniChannel CRM",
  description: "Unify your customer communications across all channels with AI-powered insights",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({children}: Props) {
  return children;
}
