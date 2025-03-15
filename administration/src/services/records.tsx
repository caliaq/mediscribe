const BASE_URL = '/api/v2/records';

export interface RecordData {
    // definujte strukturu záznamu podle potřeby
    [key: string]: any;
}

/**
 * GET /api/v2/records
 */
export const getRecords = async (): Promise<RecordData[]> => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

/**
 * GET /api/v2/records/:recordId
 */
export const getRecord = async (recordId: string): Promise<RecordData> => {
    const response = await fetch(`${BASE_URL}/${recordId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

/**
 * POST /api/v2/records/:recordId
 */
export const createRecord = async (recordId: string, data: RecordData): Promise<RecordData> => {
    const response = await fetch(`${BASE_URL}/${recordId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

/**
 * PATCH /api/v2/records/:recordId
 */
export const updateRecord = async (recordId: string, data: Partial<RecordData>): Promise<RecordData> => {
    const response = await fetch(`${BASE_URL}/${recordId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

/**
 * DELETE /api/v2/records/:recordId
 */
export const deleteRecord = async (recordId: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/${recordId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
};