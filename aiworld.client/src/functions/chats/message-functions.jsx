export async function saveMessage(messageData) {
    const response = await fetch('/api/Message/SaveMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
    });

    if (!response.ok) {
        throw new Error(`Errore ${response.status}: ${response.statusText}`);
    }

    return await response.json();
}

export async function getMessagesByChatId(id) {
    try {
        const response = await fetch(`/api/Message/GetMessages/${id}`);
        
        if (!response.ok) {
            throw new Error(`Errore ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Response:", data);
        return data;

    } catch (error) {
        console.error("Errore nel caricamento dei messaggi:", error);
        return [];
    }
}
