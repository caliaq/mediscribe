'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import { redirect } from 'next/navigation';

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
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'auth/session', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const res = await response.json();
                    const sessionId = res.data.sessionId;
    
                    // Generate QR code from sessionId
                    const qrCode = await QRCode.toDataURL(sessionId);
    
                    setSession({
                        sessionId: sessionId,
                        qrCode: qrCode
                    });
                }

            } catch (err) {
                setError(err instanceof Error ? err.message : 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        initializeSession();
    }, []);

    const checkStatus = async () => {
        if (!session) return;
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'auth/status?sessionId=' + session.sessionId, {
            });
            const res = await response.json();

            if (!res.success) {
                return
            }
            const token = res.data.token;
            localStorage.setItem('token', token);
            document.cookie = `token=${token}; path=/`;

            setStatus(res.status);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        }
        if (localStorage.getItem('token')) {
            redirect('/');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Přihlaštese pomocí qr kódu</h1>

                {session?.qrCode && (
                    <div className="flex flex-col items-center">
                        <div className="border-2 border-gray-200 rounded-lg p-4 mb-4">
                            <Image
                                src={session.qrCode}
                                alt="Login QR Code"
                                width={256}
                                height={256}
                                className="w-64 h-64"
                            />
                        </div>
                        <p className="text-sm text-gray-600 text-center">
                            Naskenujkte qr kod pomocí vašeho mobilního zařízení a přihlašte se.
                        </p>
                    </div>
                )}

                <button
                    onClick={checkStatus}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Check Status
                </button>

                {status && (
                    <p className="mt-4 text-center text-green-500">
                        Status: {status}
                    </p>
                )}
            </div>
        </div>
    );
}