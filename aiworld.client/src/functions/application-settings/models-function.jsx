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