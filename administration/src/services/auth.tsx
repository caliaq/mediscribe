"use client";

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface Doctor {
    id: string;
    name: string;
    // Add other doctor properties as needed
}

export interface AuthResponse {
    success: boolean;
    data?: {
        token: string;
        doctor: Doctor;
    };
    error?: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            throw new Error('API_URL is not defined');
        }
        const response = await fetch(`${apiUrl}auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data: AuthResponse = await response.json();
        
        // Store the JWT token if login was successful
        if (data.success && data.data?.token) {
            localStorage.setItem('jwt_token', data.data.token);
        }
        
        return data;
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            error: 'Authentication failed'
        };
    }
};

export const checkAuthStatus = async (): Promise<Doctor | null> => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            throw new Error('API_URL is not defined');
        }

        const token = localStorage.getItem('jwt_token');
        if (!token) {
            return null;
        }

        const response = await fetch(`${apiUrl}auth`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        return data.success ? data.data.doctor : null;
    } catch (error) {
        console.error('Auth status check error:', error);
        return null;
    }
};

export const logout = (): void => {
    localStorage.removeItem('jwt_token');
};