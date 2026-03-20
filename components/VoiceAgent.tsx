import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from '@google/genai';
import { Mic, MicOff, ShoppingCart, Activity } from 'lucide-react';
import { AddToCartFunction } from '../types';

// Tool Definition
const addToCartTool: FunctionDeclaration = {
  name: 'addToCart',
  parameters: {
    type: Type.OBJECT,
    description: 'Adds a specific pack of CAFEPROTEICO to the shopping cart.',
    properties: {
      packSize: {
        type: Type.NUMBER,
        description: 'The number of cans in the pack. Valid values are 1, 3, 4, or 6.',
      },
      quantity: {
        type: Type.NUMBER,
        description: 'The number of packs to add.',
      },
    },
    required: ['packSize', 'quantity'],
  },
};

interface VoiceAgentProps {
  onAddToCart: AddToCartFunction;
}

const VoiceAgent: React.FC<VoiceAgentProps> = ({ onAddToCart }) => {
  const [isActive, setIsActive] = useState(false);
  const [isMicLocked, setIsMicLocked] = useState(false);
  const [transcription, setTranscription] = useState<{ user: string; model: string }>({ user: '', model: '' });
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);

  // Auto-show tooltip
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isActive) setShowTooltip(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isActive]);

  const connectToGemini = async () => {
    if (!process.env.API_KEY) {
      console.error("API Key not found");
      return;
    }

    // 1. Request Microphone Permission IMMEDIATELY on user click
    // This fixes "Permission denied" errors because browsers require getUserMedia to be triggered by user gesture
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1
        }
      });
      streamRef.current = stream;
    } catch (err) {
      console.error("Mic Error: Permission denied", err);
      alert("Por favor permite el acceso al micrófono para hablar con Sakura.");
      return;
    }

    setIsActive(true);
    setShowTooltip(false);
    setIsMicLocked(true); // Lock mic for greeting

    // Initialize Audio Output
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    nextStartTimeRef.current = audioContextRef.current.currentTime;
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // System Instruction with Greeting logic
    const systemInstruction = `
      Eres Sakura, la asistente de ventas amigable y eficiente de POWER DRINK.
      Tu objetivo es ayudar a los clientes a comprar "CAFEPROTEICO".
      
      Productos disponibles:
      - 1 Pack ($6)
      - 3 Pack ($8)
      - 4 Pack ($9)
      - 6 Pack ($10)
      
      Reglas:
      1. AL INICIAR LA CONEXIÓN, DEBES SALUDAR INMEDIATAMENTE: "¡Hola Campeón! Bienvenido a POWER DRINK. ¿Te apetece una bebida proteica después de tu entreno?"
      2. Sé breve y entusiasta.
      3. Si el cliente quiere comprar, pregunta la cantidad y usa la herramienta 'addToCart'.
      4. Confirma cuando agregues algo al carrito.
    `;

    try {
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: systemInstruction,
          tools: [{ functionDeclarations: [addToCartTool] }],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
          }
        },
        callbacks: {
          onopen: async () => {
            console.log('Gemini Live Connected');
            // Allow greeting to play, then unlock mic after a short delay
            setTimeout(() => {
              setIsMicLocked(false);
              startAudioInput();
            }, 800); 
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Transcription
            if (message.serverContent?.inputTranscription) {
              setTranscription(prev => ({ ...prev, user: message.serverContent?.inputTranscription?.text || '' }));
            }
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => ({ ...prev, model: prev.model + message.serverContent?.outputTranscription?.text }));
            }
            
            // Clear buffer on turn complete
            if (message.serverContent?.turnComplete) {
               // Optional: clear text after some time or keep it
            }

            // Handle Audio Output
            const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData && audioContextRef.current) {
              playAudioChunk(audioData);
            }

            // Handle Tool Calls
            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                if (fc.name === 'addToCart') {
                  const resultMsg = onAddToCart(`${fc.args.packSize}-pack`, Number(fc.args.quantity));
                  
                  // Send response back
                  sessionPromise.then(session => {
                    session.sendToolResponse({
                      functionResponses: {
                        id: fc.id,
                        name: fc.name,
                        response: { result: resultMsg }
                      }
                    });
                  });
                }
              }
            }
          },
          onclose: () => {
            console.log('Gemini Live Closed');
            disconnect();
          },
          onerror: (err) => {
            console.error('Gemini Live Error', err);
            disconnect();
          }
        }
      });
      sessionPromiseRef.current = sessionPromise;
    } catch (e) {
      console.error(e);
      disconnect();
    }
  };

  const startAudioInput = async () => {
    // Only start if we have a session promise pending and a stream
    if (!sessionPromiseRef.current || !streamRef.current) return;

    try {
      const stream = streamRef.current;
      
      // Separate context for input to avoid sample rate issues
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const source = inputAudioContextRef.current.createMediaStreamSource(stream);
      const processor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
      
      processor.onaudioprocess = (e) => {
        if (isMicLocked) return; 
        
        const inputData = e.inputBuffer.getChannelData(0);
        const pcm16 = float32ToInt16(inputData);
        const base64 = arrayBufferToBase64(pcm16.buffer);
        
        if (sessionPromiseRef.current) {
          sessionPromiseRef.current.then(session => {
            session.sendRealtimeInput({
              media: {
                mimeType: 'audio/pcm;rate=16000',
                data: base64
              }
            });
          });
        }
      };

      source.connect(processor);
      processor.connect(inputAudioContextRef.current.destination);
      
      sourceRef.current = source;
      processorRef.current = processor;
    } catch (err) {
      console.error("Mic Input Error", err);
    }
  };

  const playAudioChunk = async (base64String: string) => {
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
    
    try {
      const audioData = base64ToArrayBuffer(base64String);
      const float32Data = new Float32Array(audioData.byteLength / 2);
      const dataView = new DataView(audioData);
      
      for (let i = 0; i < float32Data.length; i++) {
        float32Data[i] = dataView.getInt16(i * 2, true) / 32768;
      }

      const buffer = audioContextRef.current.createBuffer(1, float32Data.length, 24000);
      buffer.getChannelData(0).set(float32Data);

      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      
      const startTime = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
      source.start(startTime);
      nextStartTimeRef.current = startTime + buffer.duration;
    } catch (e) {
      console.error("Audio Decode Error", e);
    }
  };

  const disconnect = () => {
    setIsActive(false);
    setIsMicLocked(false);
    setTranscription({ user: '', model: '' });
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    
    sessionPromiseRef.current = null;
  };

  // Helpers
  const float32ToInt16 = (float32: Float32Array) => {
    const int16 = new Int16Array(float32.length);
    for (let i = 0; i < float32.length; i++) {
      let s = Math.max(-1, Math.min(1, float32[i]));
      int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return int16;
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const base64ToArrayBuffer = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        {/* Tooltip */}
        {showTooltip && (
          <div className="bg-white text-black p-4 rounded-xl shadow-2xl max-w-xs animate-fade-in relative mb-2">
             <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-4 h-4 bg-white"></div>
            <p className="font-semibold text-sm">¡Campeón! ¡AUMENTA TU FUERZA!</p>
            <p className="text-xs mt-1">Haz clic para pedir hablando conmigo.</p>
          </div>
        )}

        {/* Live Interface (Glassmorphism) */}
        {isActive && (
          <div className="mb-4 w-80 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden">
             <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                   <span className="text-xs font-bold uppercase tracking-wider text-white/80">Sakura AI (Live)</span>
                </div>
                <button onClick={disconnect} className="text-white/50 hover:text-white text-xs">Cerrar</button>
             </div>
             
             <div className="space-y-3 max-h-48 overflow-y-auto">
               {transcription.user && (
                 <div className="flex justify-end">
                   <div className="bg-white/10 p-2 rounded-lg rounded-tr-none text-xs text-white max-w-[85%]">
                     {transcription.user}
                   </div>
                 </div>
               )}
                {transcription.model && (
                 <div className="flex justify-start">
                   <div className="bg-purple-600/20 p-2 rounded-lg rounded-tl-none text-xs text-purple-200 max-w-[85%] border border-purple-500/20">
                     {transcription.model}
                   </div>
                 </div>
               )}
               {isMicLocked && (
                 <p className="text-center text-xs text-white/40 italic">Sakura está hablando...</p>
               )}
             </div>
          </div>
        )}

        {/* Mic Trigger */}
        <button
          onClick={isActive ? disconnect : connectToGemini}
          className={`p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
            isActive ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-black'
          }`}
        >
          {isActive ? <Activity size={24} /> : <Mic size={24} />}
        </button>
      </div>
    </>
  );
};

export default VoiceAgent;