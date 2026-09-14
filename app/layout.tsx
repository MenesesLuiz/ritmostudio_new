import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ritmo Studio",
  description: "Ritmo Studio — filmmaker, videomaker e editor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://www.instagram.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
