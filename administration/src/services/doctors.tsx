// filepath: c:\aimtechackaton\system\administration\src\services\doctors.tsx
const API_URL = process.env.API_URL;

/**
 * Define the Doctor interface.
 */
export interface Doctor {
    id: string;
    name: string;
    // Define additional properties as needed
}

const checkResponse = async (response: Response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Request failed');
    }
    return response;
};

/**
 * GET /api/v2/doctors
 */
export const getDoctors = async (): Promise<Doctor[]> => {
    const response = await fetch(`${API_URL}/api/v2/doctors`);
    await checkResponse(response);
    return response.json();
};

/**
 * GET /api/v2/doctors/:doctorId
 */
export const getDoctor = async (doctorId: string): Promise<Doctor> => {
    const response = await fetch(`${API_URL}/api/v2/doctors/${doctorId}`);
    await checkResponse(response);
    return response.json();
};

/**
 * POST /api/v2/doctors/:doctorId
 * Create a new doctor.
 */
export const createDoctor = async (doctorId: string, data: Partial<Doctor>): Promise<Doctor> => {
    const response = await fetch(`${API_URL}/api/v2/doctors/${doctorId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    await checkResponse(response);
    return response.json();
};

/**
 * PATCH /api/v2/doctors/:doctorId
 * Update an existing doctor.
 */
export const updateDoctor = async (doctorId: string, data: Partial<Doctor>): Promise<Doctor> => {
    const response = await fetch(`${API_URL}/api/v2/doctors/${doctorId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    await checkResponse(response);
    return response.json();
};

/**
 * DELETE /api/v2/doctors/:doctorId
 */
export const deleteDoctor = async (doctorId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/v2/doctors/${doctorId}`, {
        method: 'DELETE'
    });
    await checkResponse(response);
};