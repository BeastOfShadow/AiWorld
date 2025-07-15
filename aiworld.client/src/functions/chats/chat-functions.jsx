export async function getChats() {
    try {
        const response = await fetch('/api/Chat/GetChats');
        
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