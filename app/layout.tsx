import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Biblioteca Impacta",
  description: "Biblioteca Virtual da Faculdade Impacta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="m-0 p-0 box-border">
        {children}
      </body>
    </html>
  );
}
