import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { PatientProvider } from "../context/patientContext";
import { AuthProvider } from "../context/authContext";


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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <AuthProvider>
          <PatientProvider>
            {children}
          </PatientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
