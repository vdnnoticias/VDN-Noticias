import { NextRequest, NextResponse } from "next/server";
import { NewsService } from "@/services/news.service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query.trim()) {
    return NextResponse.json([]);
  }

  const results = await NewsService.searchArticles(query);

  // Devolver solo los campos necesarios para la UI (sin contentHtml pesado)
  const lightweight = results.map((a) => ({
    id: a.id,
    title: a.title,
    excerpt: a.excerpt,
    author: a.author,
    date: a.date,
    category: a.category,
    imageUrl: a.imageUrl,
    readTime: a.readTime,
    slug: a.slug,
    section: a.section,
    sectionSlug: a.sectionSlug,
    isBreaking: a.isBreaking,
  }));

  return NextResponse.json(lightweight);
}
