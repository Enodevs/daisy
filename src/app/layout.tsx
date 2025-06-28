import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "~/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          defaultTheme="system"
          storageKey="daisy-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}