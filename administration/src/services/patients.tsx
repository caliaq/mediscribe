"use client";
export interface Address {
    street: string;
    city: string;
    zip: string;
}

export interface Name {
    first: string;
    last: string;
}

export interface Patient {
    _id: string;
    name: Name;
    address: Address;
    birthDate: string;
    sex: 'M' | 'F';
    insurance: string;
    allergies: string[];
}

export const fetchPatients = async (): Promise<Patient[]> => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            throw new Error('API_URL is not defined');
        }

        console.log(`Fetching patients from: ${apiUrl}patients`);

        const response = await fetch(`${apiUrl}patients`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.data) {
            throw new Error('Data field is missing in the response');
        }

        return data.data || [];
    } catch (error) {
        console.error('Error fetching patients:', error);
        return [];
    }
};


export interface Record {
    data: string;
    summary: string;
    date: string;
}


export const fetchRecords = async (patientId: string): Promise<Record[]> => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            throw new Error('API_URL is not defined');
        }

        console.log(`Fetching records from: ${apiUrl}patients/${patientId}/records`);

        const response = await fetch(`${apiUrl}patients/${patientId}/records`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.data) {
            throw new Error('Data field is missing in the response');
        }

        return data.data || [];
    } catch (error) {
        console.error('Error fetching records:', error);
        return [];
    }
};