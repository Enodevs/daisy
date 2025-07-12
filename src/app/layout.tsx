import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "~/components/theme-provider";
import Head from "next/head";
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

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
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        {/* <link rel="manifest" href="/site.webmanifest"> */}
      </Head>
      <body className={`antialiased ${inter.className}`}>
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