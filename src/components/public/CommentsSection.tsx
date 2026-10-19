"use client";

import { useState } from "react";
import { MessageSquare, Send, CheckCircle2, User } from "lucide-react";
import type { ArticleComment } from "@/services/news.service";

interface CommentsSectionProps {
  articleSlug: string;
  initialComments?: ArticleComment[];
}

export default function CommentsSection({
  articleSlug,
  initialComments = [],
}: CommentsSectionProps) {
  const [comments, setComments] = useState<ArticleComment[]>(initialComments);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;

    const newComment: ArticleComment = {
      id: `local-${Date.now()}`,
      authorName: name.trim(),
      commentText: commentText.trim(),
      createdAt: "Hace un momento",
    };

    setComments([newComment, ...comments]);
    setSubmitted(true);
    setName("");
    setEmail("");
    setCommentText("");

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-red-700" />
        <h3 className="font-serif text-2xl font-bold text-[#0A192F]">
          Comentarios de los Lectores ({comments.length})
        </h3>
      </div>

      {/* Formulario para Dejar Comentario */}
      <div className="bg-slate-50 p-6 rounded-sm border border-gray-200 mb-8">
        <h4 className="font-serif text-base font-bold text-navy-950 mb-2">
          Comparte tu opinión sobre esta noticia
        </h4>
        <p className="text-xs text-gray-500 mb-4">
          Los comentarios son moderados para garantizar el respeto y la convivencia democrática.
        </p>

        {submitted && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-sm text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            <span>
              ¡Tu comentario ha sido recibido y publicado exitosamente en la plataforma!
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="articleSlug" value={articleSlug} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Nombre y Apellidos *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Carlos Huamán"
                className="w-full bg-white text-xs px-3 py-2 rounded-xs border border-gray-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Correo Electrónico (No será visible)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full bg-white text-xs px-3 py-2 rounded-xs border border-gray-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Tu Comentario *
            </label>
            <textarea
              required
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Escribe tu punto de vista de manera constructiva y respetuosa..."
              className="w-full bg-white text-xs p-3 rounded-xs border border-gray-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            className="bg-[#0A192F] hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xs transition-colors flex items-center gap-2 shadow-xs"
          >
            <Send size={13} />
            <span>Publicar Comentario</span>
          </button>
        </form>
      </div>

      {/* Lista de Comentarios Existentes */}
      {comments.length === 0 ? (
        <p className="text-xs text-gray-400 italic text-center py-6">
          Sé el primero en comentar esta noticia.
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comm) => (
            <div
              key={comm.id}
              className="bg-white p-4 rounded-sm border border-gray-200/80 shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
                    <User size={14} />
                  </div>
                  <span className="font-bold text-xs text-navy-950">
                    {comm.authorName}
                  </span>
                </div>
                <span className="text-[11px] text-gray-400">{comm.createdAt}</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed pl-9">
                {comm.commentText}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
