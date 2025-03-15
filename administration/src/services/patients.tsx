

const API_URL = process.env.API_URL


export interface Patient {
    // Define properties according to your patient model
    id: string;
    name: string;
    // add more properties as needed
}

const checkResponse = async (response: Response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Request failed');
    }
    return response;
};

/**
 * GET /api/v2/patients
 */
export const getPatients = async (): Promise<Patient[]> => {
    const response = await fetch(`${API_URL}`);
    await checkResponse(response);
    return response.json();
};

/**
 * GET /api/v2/patients/:patientId
 */
export const getPatient = async (patientId: string): Promise<Patient> => {
    const response = await fetch(`${API_URL}/${patientId}`);
    await checkResponse(response);
    return response.json();
};

/**
 * POST /api/v2/patients/:patientId
 * Adjust the data parameter type as per your requirements.
 */
export const createPatient = async (patientId: string, data: Partial<Patient>): Promise<Patient> => {
    const response = await fetch(`${API_URL}/${patientId}`, {
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
 * PATCH /api/v2/patients/:patientId
 */
export const updatePatient = async (patientId: string, data: Partial<Patient>): Promise<Patient> => {
    const response = await fetch(`${API_URL}/${patientId}`, {
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
 * DELETE /api/v2/patients/:patientId
 */
export const deletePatient = async (patientId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${patientId}`, {
        method: 'DELETE'
    });
    await checkResponse(response);
};