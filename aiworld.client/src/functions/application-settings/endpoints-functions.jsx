export async function getEndpoints() {
    try {
        const response = await fetch('/api/Endpoint/GetEndpoints');
        
        if (!response.ok) {
            throw new Error(`Errore ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Response:", data);
        return data;

    } catch (error) {
        console.error("Errore nel caricamento degli endpoints:", error);
        return [];
    }
}

export async function createEndpoint(modelData) {
    const response = await fetch('/api/Endpoint/CreateEndpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(modelData)
    });

    if (!response.ok) {
        throw new Error(`Errore ${response.status}: ${response.statusText}`);
    }

    return await response.json();
}

export async function deleteEndpoint(id) {
    console.log(id);
    const response = await fetch(`/api/Endpoint/DeleteEndpoint/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Errore ${response.status}: ${response.statusText}`);
    }
}