"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { redirect } from "next/navigation";

interface SessionResponse {
  sessionId: string;
  qrCode: string;
}

export default function LoginPage() {
  const [session, setSession] = useState<SessionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "auth/session",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const res = await response.json();
          const sessionId = res.data.sessionId;

          // Generate QR code from sessionId
          const qrCode = await QRCode.toDataURL(sessionId);

          setSession({
            sessionId: sessionId,
            qrCode: qrCode,
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    initializeSession();
  }, []);

  const checkStatus = async () => {
    if (!session) return;
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "auth/status?sessionId=" +
          session.sessionId,
        {}
      );
      const res = await response.json();

      if (!res.success) {
        return;
      }
      const token = res.data.token;
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/`;

      setStatus(res.status);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
    if (localStorage.getItem("token")) {
      redirect("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="bg-white border-l-4 border-red-500 shadow-lg rounded-lg px-6 py-5 max-w-md">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-red-500">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md hover:shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-8 text-gray-800 tracking-tight">
            Přihlašte se pomocí QR kódu
          </h1>

          {session?.qrCode && (
            <div className="flex flex-col items-center w-full">
              <div className="border-2 border-gray-100 rounded-xl p-5 mb-6 bg-white shadow-sm hover:shadow-md">
                <Image
                  src={session.qrCode}
                  alt="Login QR Code"
                  width={256}
                  height={256}
                  className="w-64 h-64"
                  priority
                />
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 font-medium">
                    1
                  </span>
                  <p className="text-gray-700">
                    Naskenujte tento kód pomocí aplikace MediScribe
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 font-medium">
                    2
                  </span>
                  <p className="text-gray-700">
                    Klikněte na tlačítko „Ověřit" níže
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 font-medium">
                    3
                  </span>
                  <p className="text-gray-700">
                    Po ověření budete přesměrováni na hlavní stránku
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={checkStatus}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Ověřit přihlášení
          </button>

          {status && (
            <div className="mt-5 text-center px-4 py-2 bg-green-50 rounded-lg">
              <p className="text-green-600 font-medium">{status}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
