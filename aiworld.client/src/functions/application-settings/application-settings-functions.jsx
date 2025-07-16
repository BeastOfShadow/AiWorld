export async function getSettings() {
    try {
        const response = await fetch('/api/Settings/GetSettings');
        
        if (!response.ok) {
            throw new Error(`Errore ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Response:", data);
        return data;
    } catch (error) {
        console.error("Errore nel caricamento dei settings:", error);
        return [];
    }
}

export async function getModelName() {
    try {
        const response = await fetch('/api/Settings/GetModelName');
        
        if (!response.ok) {
            throw new Error(`Errore ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Response:", data);
        return data;

    } catch (error) {
        console.error("Errore nel caricamento delle chat:", error);
        return [];
    }
}