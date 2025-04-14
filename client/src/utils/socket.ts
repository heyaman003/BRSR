import io from 'socket.io-client'

export const conflictResolutionSocket = io(`${import.meta.env.VITE_WS_ENDPOINT}/conflict-resolution`, {
    withCredentials: true,
    extraHeaders: {
        'X-Csrf-Token': sessionStorage.getItem('X-Csrf-Token') || '',
        
    },
    path: import.meta.env.VITE_WS_PATH
});
