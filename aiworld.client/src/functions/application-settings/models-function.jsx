export async function getModels() {
    try {
        const response = await fetch('/api/Model/GetModels');
        
        if (!response.ok) {
            throw new Error(`Errore ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Response:", data);
        return data;

    } catch (error) {
        console.error("Errore nel caricamento dei modelli:", error);
        return [];
    }
}

export async function createModel(modelData) {
    const response = await fetch('/api/Model/CreateModel', {
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

export async function deleteModel(id) {
    console.log(id);
    const response = await fetch(`/api/Model/DeleteModel/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Errore ${response.status}: ${response.statusText}`);
    }

    return await response.json();
}