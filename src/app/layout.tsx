import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daisy - AI Meeting Assistant",
  description: "Clean and minimal AI meeting assistant. Upload audio, get transcriptions, summaries, and action items.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}