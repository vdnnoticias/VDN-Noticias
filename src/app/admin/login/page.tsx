"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff, Shield } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Por favor ingresa tu correo y contraseña.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Error al iniciar sesión.");
        setIsLoading(false);
        return;
      }

      // Redirigir al panel admin
      router.push(nextUrl);
      router.refresh();
    } catch {
      setErrorMessage("No se pudo conectar con el servidor de autenticación.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071324] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Fondo decorativo con gradiente */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-900/60 via-[#071324] to-black pointer-events-none" />

      {/* Header institucional */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="w-10 h-10 bg-red-700 text-white font-black text-xl flex items-center justify-center rounded-sm shadow-md group-hover:bg-red-600 transition-colors">
            V
          </div>
          <div className="text-left">
            <span className="font-serif text-2xl font-black text-white tracking-tight block leading-none">
              VDN <span className="text-amber-400">NOTICIAS</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
              Jauja &middot; Valle del Mantaro
            </span>
          </div>
        </Link>

        <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
          Mesa de Redacción &amp; Administración
        </h1>
        <p className="mt-1 text-xs text-gray-400">
          Acceso exclusivo para el equipo periodístico, editores y dirección
        </p>
      </div>

      {/* Tarjeta del Formulario */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900/90 border border-slate-800 p-8 shadow-2xl rounded-lg backdrop-blur-md">
          {errorMessage && (
            <div className="mb-6 p-3.5 bg-red-950/80 border border-red-800 rounded-sm flex items-start gap-3 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5"
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@vdn.pe"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs pl-10 pr-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-gray-500"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-300"
                >
                  Contraseña
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs pl-10 pr-10 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-gray-500"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  aria-label="Ver contraseña"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider py-3.5 px-4 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Ingresar al Sistema Editorial</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Indicador de Roles Jerárquicos */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-[11px] text-gray-400 space-y-2">
            <div className="flex items-center gap-2 text-amber-400/90 font-medium">
              <Shield size={13} />
              <span>Sistema RBAC Jerárquico de 6 Roles</span>
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              La cuenta <strong>vdnnoticias@gmail.com</strong> cuenta con privilegios de <em>Super Administrador (Director General)</em> con control absoluto de usuarios, publicaciones y auditoría.
            </p>
          </div>
        </div>

        {/* Enlace para volver a la portada */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5"
          >
            <span>&larr; Volver al portal público de noticias</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
