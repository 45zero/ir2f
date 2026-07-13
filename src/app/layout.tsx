import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IR2F — Institut Régional de Formation Football",
  description:
    "Les formations IR2F pour éducateurs, arbitres, clubs et dirigeants de la Ligue Grand Est.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Barlow+Semi+Condensed:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif", color: "#14213d" }}>
        {children}
      </body>
    </html>
  );
}
