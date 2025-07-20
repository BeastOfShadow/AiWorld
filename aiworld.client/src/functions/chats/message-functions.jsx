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