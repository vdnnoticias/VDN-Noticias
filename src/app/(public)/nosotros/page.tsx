import Link from "next/link";
import { ShieldCheck, Target, HeartHandshake, MapPin, Mail, Phone, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Quiénes Somos & Línea Editorial | VDN Noticias Jauja",
  description: "Conoce al equipo periodístico, principios éticos e historia de Voces de la Noticia (VDN), el medio digital y radial líder de Jauja y la región Junín.",
};

export default function NosotrosPage() {
  const values = [
    {
      icon: ShieldCheck,
      title: "Veracidad e Independencia",
      desc: "Informamos con apego estricto a los hechos corroborados, sin presiones políticas, económicas ni compromisos subalternos."
    },
    {
      icon: Target,
      title: "Oportunidad y Rigor",
      desc: "Llevamos la noticia en tiempo real a nuestros lectores y oyentes, con contrastación rigurosa de fuentes oficiales y ciudadanas."
    },
    {
      icon: HeartHandshake,
      title: "Identidad Regional Jaujina",
      desc: "Promovemos con orgullo el patrimonio inmaterial, la Tunantada, la historia de la Primera Capital y el desarrollo del Valle del Mantaro."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-8 font-medium">
          <Link href="/" className="hover:text-red-700 transition-colors">
            Inicio
          </Link>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="text-gray-900 font-semibold">Quiénes Somos &middot; Línea Editorial</span>
        </nav>

        {/* HERO INSTITUCIONAL */}
        <div className="bg-white p-8 sm:p-12 rounded-sm border border-gray-200 shadow-xs mb-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-red-700 block mb-2">
              Medio de Comunicación Independiente
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#0A192F] mb-6 leading-tight">
              Información veraz, oportuna y sin censura desde Jauja
            </h1>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-sans mb-4">
              <strong>VDN (Voces de la Noticia)</strong> nació con el firme compromiso de dotar a la provincia de Jauja, al Valle del Mantaro y a la región Junín de una plataforma periodística moderna, rigurosa y valiente que dé voz a las comunidades y fiscalice el ejercicio del poder público.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Combinamos la inmediatez del periodismo digital con la cercanía y calidez de la radiodifusión en los <strong>98.5 FM</strong>, llegando diariamente a miles de hogares, mercados y campos agrícolas del centro del Perú.
            </p>
          </div>
        </div>

        {/* PILARES ÉTICOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-sm border border-gray-200 shadow-xs border-t-4 border-t-amber-500"
            >
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <val.icon size={24} />
              </div>
              <h3 className="font-serif text-lg font-bold text-navy-950 mb-2">
                {val.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CONTACTO & REDACCIÓN CENTRAL */}
        <div className="bg-[#0A192F] text-white p-8 sm:p-12 rounded-sm shadow-xl border-l-4 border-amber-500 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
                Redacción y Estudios
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black mb-4">
                Contáctate con Nuestra Mesa Editorial
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                ¿Tienes una denuncia ciudadana, primicia informativa o deseas anunciar tu empresa en nuestra multiplataforma (Web + Radio 98.5 FM)?
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Jr. Junín 123, Centro Histórico de Jauja, Junín, Perú</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>prensa@vdnnoticias.pe &middot; publicidad@vdnnoticias.pe</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Central Telefónica: (064) 362-100 &middot; WhatsApp Prensa: +51 964 123 456</span>
                </div>
              </div>
            </div>

            <div className="bg-[#071324] p-6 sm:p-8 rounded-lg border border-slate-700">
              <h3 className="font-serif text-lg font-bold text-white mb-2">
                Envía una Nota de Prensa o Consulta
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Nuestro equipo de redacción evaluará tu comunicación a la brevedad.
              </p>

              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Tu Nombre o Institución"
                  className="w-full bg-slate-900 text-xs px-3 py-2.5 rounded border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
                <input
                  type="email"
                  placeholder="Correo electrónico de contacto"
                  className="w-full bg-slate-900 text-xs px-3 py-2.5 rounded border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
                <textarea
                  rows={3}
                  placeholder="Describe la noticia, denuncia o propuesta comercial..."
                  className="w-full bg-slate-900 text-xs p-3 rounded border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-2.5 rounded transition-colors"
                >
                  Enviar Mensaje a Redacción
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
