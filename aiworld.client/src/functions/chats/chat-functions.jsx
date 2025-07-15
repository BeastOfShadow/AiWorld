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

export async function createChat(chatData) {
    const response = await fetch('/api/Chat/CreateChat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(chatData)
    });

    if (!response.ok) {
        throw new Error(`Errore ${response.status}: ${response.statusText}`);
    }

    return await response.json();
}