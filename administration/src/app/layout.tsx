import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { PatientProvider } from "../context/patientContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Administrace mediscribe",
  description: "Webová administrace pro mediscribe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${outfit.variable} antialiased`}>
        <PatientProvider>
          {children}
        </PatientProvider>
      </body>
    </html>
  );
}
