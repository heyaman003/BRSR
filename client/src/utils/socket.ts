import io from 'socket.io-client'

export const conflictResolutionSocket = io(`http://localhost:8001/conflict-resolution`, {
    withCredentials: true,
    extraHeaders: {
        'X-Csrf-Token': sessionStorage.getItem('X-Csrf-Token') || ''
    }
});
