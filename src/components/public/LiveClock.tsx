"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function LiveClock() {
  const [timeString, setTimeString] = useState<string>("");
  const [dateString, setDateString] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Formato de hora exacta HH:mm:ss en zona horaria de Perú
      const formattedTime = now.toLocaleTimeString("es-PE", {
        timeZone: "America/Lima",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      // Formato de fecha larga en español
      const formattedDate = now.toLocaleDateString("es-PE", {
        timeZone: "America/Lima",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      // Capitalizar primera letra del día
      const capitalizedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

      setTimeString(formattedTime);
      setDateString(capitalizedDate);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2 text-xs font-mono text-gray-300">
      <span className="hidden sm:inline font-sans text-gray-400">
        {dateString || "Cargando fecha..."}
      </span>
      {dateString && <span className="hidden sm:inline text-gray-600">|</span>}
      <div className="flex items-center gap-1.5 bg-[#1E293B] px-2 py-0.5 rounded text-amber-400 border border-slate-700/60 font-semibold shadow-inner">
        <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>{timeString || "--:--:--"}</span>
        <span className="text-[10px] text-gray-400 font-sans font-normal uppercase">
          PET
        </span>
      </div>
    </div>
  );
}
