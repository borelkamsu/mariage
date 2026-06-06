import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mariage de Q & C | Confirmation",
  description: "Confirmez votre presence au mariage de Q & C.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
