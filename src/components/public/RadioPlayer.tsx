"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Radio } from "lucide-react";

export default function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Error playing audio", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-[#0a192f] text-white z-50 flex items-center justify-between px-4 lg:px-8 border-t border-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes eq {
          0% { height: 4px; }
          50% { height: 20px; }
          100% { height: 4px; }
        }
        .bar-anim { animation: eq 0.8s ease-in-out infinite; }
        .bar-anim:nth-child(2) { animation-delay: 0.2s; }
        .bar-anim:nth-child(3) { animation-delay: 0.4s; }
      `}} />

      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src="https://stream.zeno.fm/f3wvbbqmdg8uv" 
        preload="none"
      />

      {/* Left: Indicator */}
      <div className="flex items-center space-x-3 w-1/3">
        <div className="relative flex items-center justify-center w-3 h-3">
          <div className="absolute w-full h-full bg-[#dc2626] rounded-full animate-ping opacity-75"></div>
          <div className="relative w-2 h-2 bg-[#dc2626] rounded-full"></div>
        </div>
        <div>
          <span className="text-xs font-bold text-[#dc2626] tracking-widest block leading-tight">EN VIVO</span>
          <span className="text-sm font-medium flex items-center"><Radio className="w-3 h-3 mr-1 text-[#d97706]" /> VDN Radio</span>
        </div>
      </div>

      {/* Center: Controls */}
      <div className="flex items-center justify-center w-1/3 space-x-4">
        <button 
          onClick={togglePlay}
          className="bg-[#d97706] hover:bg-amber-500 text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a192f] focus:ring-[#d97706]"
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>
        
        {/* Animated Bars */}
        <div className="flex items-end h-6 space-x-1 pb-1">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`w-1.5 bg-[#d97706] rounded-t-sm transition-all duration-150 ${isPlaying ? 'bar-anim' : 'h-1'}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Right: Volume */}
      <div className="flex items-center justify-end w-1/3 space-x-2 hidden sm:flex">
        <Volume2 className="w-4 h-4 text-gray-400" />
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
          aria-label="Volumen"
        />
      </div>
    </div>
  );
}
