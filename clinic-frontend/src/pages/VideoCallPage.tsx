// File: clinic-frontend/src/pages/VideoCallPage.tsx

import { useEffect, useRef, useState } from 'react';
import type { NavigateFunction } from '../App';

type VideoCallPageProps = {
  onNavigate: NavigateFunction;
};

const VideoCallPage = ({ onNavigate }: VideoCallPageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const localVideoRef = useRef<HTMLVideoElement>(null);
  // Use a ref to hold the stream object. This provides a stable reference
  // that doesn't change on re-renders, fixing the button logic.
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const [messages, setMessages] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    // --- 1. Set up WebSocket connection dynamically ---
    const getWebSocketURL = () => {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      // Replace http with ws, or https with wss
      const wsProtocol = apiBaseUrl.startsWith('https') ? 'wss' : 'ws';
      const wsUrl = `${wsProtocol}://${apiBaseUrl.split('//')[1]}/ws/video-call/test-room`;
      return wsUrl;
    };

    const ws = new WebSocket(getWebSocketURL());
    ws.onopen = () => setMessages(prev => [...prev, "Status: Connected to call."]);
    ws.onmessage = (event) => setMessages(prev => [...prev, `Server: ${event.data}`]);
    ws.onclose = () => setMessages(prev => [...prev, "Status: Disconnected."]);
    ws.onerror = () => setMessages(prev => [...prev, "Error: WebSocket connection failed."]);

    // --- 2. Access Camera and Microphone ---
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        // Store the stream in our ref
        mediaStreamRef.current = stream;
      })
      .catch(err => {
        console.error("Error accessing media devices.", err);
        setMessages(prev => [...prev, "Error: Could not access camera."]);
      });

    // --- 3. Cleanup Function ---
    return () => {
      ws.close();
      // When the component is unmounted, stop all media tracks.
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // This effect runs only once.

  // --- FIXED: Control Button Handlers ---
  const toggleMute = () => {
    if (!mediaStreamRef.current) return;
    mediaStreamRef.current.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled; // Toggle the audio track
    });
    setIsMuted(prev => !prev);
  };

  const toggleVideo = () => {
    if (!mediaStreamRef.current) return;
    mediaStreamRef.current.getVideoTracks().forEach(track => {
      track.enabled = !track.enabled; // Toggle the video track
    });
    setIsVideoOff(prev => !prev);
  };
  
  const handleEndCall = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    alert("Call has been ended.");
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-dark-text mb-8">Video Consultation</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-black rounded-lg aspect-video relative flex items-center justify-center">
          <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover rounded-lg"></video>
          <div className="absolute bottom-4 left-4 bg-black/50 p-2 rounded-lg">
             <p className="text-white font-semibold">Your Local Video</p>
          </div>
        </div>
        <div className="bg-dark-card p-4 rounded-lg">
          <h2 className="font-semibold text-lg mb-2">Connection Log</h2>
          <div className="h-64 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, index) => <p key={index} className="text-dark-subtle">{msg}</p>)}
          </div>
        </div>
      </div>
       <div className="mt-8 flex justify-center items-center gap-4">
            <button 
              onClick={toggleMute}
              className={`p-4 rounded-full text-white transition-colors ${isMuted ? 'bg-red-500' : 'bg-slate-600 hover:bg-slate-500'}`}
            >
              <p>{isMuted ? 'Unmute' : 'Mute'}</p>
            </button>
            <button 
              onClick={handleEndCall}
              className="bg-red-600 p-4 rounded-full text-white hover:bg-red-500"
            >
              <p>End Call</p>
            </button>
            <button 
              onClick={toggleVideo}
              className={`p-4 rounded-full text-white transition-colors ${isVideoOff ? 'bg-brand-blue' : 'bg-slate-600 hover:bg-slate-500'}`}
            >
              <p>{isVideoOff ? 'Video On' : 'Video Off'}</p>
            </button>
       </div>
    </div>
  );
};

export default VideoCallPage;