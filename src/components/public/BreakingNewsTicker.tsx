"use client";

import React from "react";

interface BreakingNewsTickerProps {
  message: string;
}

export default function BreakingNewsTicker({ message }: BreakingNewsTickerProps) {
  if (!message) return null;

  return (
    <div className="bg-[#dc2626] text-white py-1.5 flex items-center overflow-hidden relative w-full text-xs font-medium">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
      `}} />
      <div className="bg-[#dc2626] z-10 px-4 py-1.5 font-bold uppercase tracking-wider h-full flex items-center whitespace-nowrap border-r border-red-800 shadow-[2px_0_4px_rgba(0,0,0,0.1)] absolute left-0 top-0 bottom-0">
        ULTIMO MINUTO
      </div>
      <div className="flex-1 pl-44 overflow-hidden">
        <div className="animate-marquee">
          {message}
        </div>
      </div>
    </div>
  );
}
