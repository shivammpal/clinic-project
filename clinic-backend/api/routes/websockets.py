# File: clinic-backend/api/routes/websockets.py

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List

router = APIRouter(prefix="/ws", tags=["WebSockets"])

class ConnectionManager:
    """Manages active WebSocket connections."""
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@router.websocket("/video-call/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    """
    WebSocket endpoint for video call signaling.
    A real implementation would use the room_id to manage specific call rooms.
    """
    await manager.connect(websocket)
    await manager.broadcast(f"A new user joined the call in room {room_id}")
    try:
        while True:
            # Wait for messages from the client
            data = await websocket.receive_text()
            # For a real WebRTC app, this would handle signaling messages (offers, answers, candidates)
            await manager.broadcast(f"Message received in room {room_id}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"A user left the call in room {room_id}")