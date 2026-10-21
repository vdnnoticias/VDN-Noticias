/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Trash2, MessageSquare } from "lucide-react";

interface CommentItem {
  id: string;
  author_name: string;
  author_email: string;
  comment_text: string;
  is_approved: boolean;
  created_at: string;
  article?: {
    title: string;
    slug: string;
    section: string;
  } | null;
}

export default function CommentsModeratorClient({
  initialComments,
}: {
  initialComments: any[];
}) {
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("pending");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filtered = comments.filter((c) => {
    if (filter === "pending") return !c.is_approved;
    if (filter === "approved") return c.is_approved;
    return true;
  });

  const handleApprove = async (id: string, isApproved: boolean) => {
    setLoadingId(id);
    try {
      const res = await fetch("/api/admin/comments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isApproved }),
      });
      if (res.ok) {
        setComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, is_approved: isApproved } : c))
        );
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Deseas eliminar este comentario de forma permanente?")) return;
    setLoadingId(id);
    try {
      const res = await fetch("/api/admin/comments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== id));
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Pestañas de filtrado */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setFilter("pending")}
          className={`text-xs font-bold px-3 py-1.5 rounded-sm transition-colors ${
            filter === "pending"
              ? "bg-amber-500 text-slate-950 shadow-xs"
              : "bg-white text-gray-600 hover:bg-slate-100"
          }`}
        >
          Pendientes ({comments.filter((c) => !c.is_approved).length})
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`text-xs font-bold px-3 py-1.5 rounded-sm transition-colors ${
            filter === "approved"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-white text-gray-600 hover:bg-slate-100"
          }`}
        >
          Aprobados ({comments.filter((c) => c.is_approved).length})
        </button>
        <button
          onClick={() => setFilter("all")}
          className={`text-xs font-bold px-3 py-1.5 rounded-sm transition-colors ${
            filter === "all"
              ? "bg-[#0A192F] text-white shadow-xs"
              : "bg-white text-gray-600 hover:bg-slate-100"
          }`}
        >
          Todos ({comments.length})
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-lg border border-gray-200 shadow-xs">
          <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <h3 className="font-serif text-base font-bold text-gray-900 mb-1">
            No hay comentarios en esta bandeja
          </h3>
          <p className="text-xs text-gray-500">
            Los comentarios emitidos por lectores en los artículos aparecerán aquí para tu aprobación.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((comment) => (
            <div
              key={comment.id}
              className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-[#0A192F]">{comment.author_name}</span>
                  <span className="text-gray-400">&bull;</span>
                  <span className="text-gray-500 text-[11px] font-mono">{comment.author_email}</span>
                  <span className="text-gray-400">&bull;</span>
                  <span className="text-gray-400 text-[11px]">
                    {new Date(comment.created_at).toLocaleString("es-PE")}
                  </span>

                  {comment.is_approved ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Aprobado
                    </span>
                  ) : (
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Pendiente
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-700 bg-slate-50 p-3 rounded border border-gray-100 leading-relaxed font-sans">
                  &ldquo;{comment.comment_text}&rdquo;
                </p>

                {comment.article && (
                  <div className="text-[11px] text-gray-500">
                    Comentado en:{" "}
                    <Link
                      href={`/${comment.article.section}/${comment.article.slug}`}
                      target="_blank"
                      className="text-blue-700 font-semibold hover:underline"
                    >
                      {comment.article.title}
                    </Link>
                  </div>
                )}
              </div>

              {/* Acciones */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {!comment.is_approved ? (
                  <button
                    disabled={loadingId === comment.id}
                    onClick={() => handleApprove(comment.id, true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 transition-colors disabled:opacity-50"
                  >
                    <Check size={14} />
                    <span>Aprobar</span>
                  </button>
                ) : (
                  <button
                    disabled={loadingId === comment.id}
                    onClick={() => handleApprove(comment.id, false)}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 transition-colors disabled:opacity-50"
                  >
                    <span>Ocultar</span>
                  </button>
                )}

                <button
                  disabled={loadingId === comment.id}
                  onClick={() => handleDelete(comment.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-700 p-2 rounded transition-colors disabled:opacity-50"
                  title="Eliminar comentario"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
