import type { Metadata } from "next";
import "./globals.css";
import "./satoshi.css";
import { AuthProvider } from "@/app/context/authContext";

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
    <AuthProvider>
      <html lang="pt-br">
        <body className="m-0 p-0 box-border">
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}