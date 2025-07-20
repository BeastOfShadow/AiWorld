export async function getSettings() {
    try {
        const response = await fetch('/api/Settings/GetSettings');
        
        if (!response.ok) {
            throw new Error(`Errore ${response.status}: ${response.statusText}`);
        }
        
        return await response.text();
    } catch (error) {
        console.error("Errore nel caricamento dei settings:", error);
        return [];
    }
}

export async function getModelName() {
    try {
        const response = await fetch('/api/Settings/GetModelName');
        
        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`Errore ${response.status}: ${response.statusText}`);
        }
        
        const modelName = await response.text();
        console.log("Model name:", modelName);
        return modelName;

    } catch (error) {
        console.error("Errore nel recupero del nome del modello:", error);
        return null;
    }
}

export async function updateSettings(settings) {
    try {
        const response = await fetch('/api/Settings/UpdateSettings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings)
        });
        
        if (!response.ok) {
            throw new Error(`Errore ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Errore nell'aggiornamento dei settings:", error);
        throw error; // Rilancia l'errore per gestirlo nel componente
    }
}