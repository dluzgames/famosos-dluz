import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticle } from "@/lib/content";
export const dynamic = "force-dynamic";
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) { const article = await getArticle((await params).slug).catch(() => null); if (!article) notFound(); return <main className="article"><Link className="brand" href="/">FAMOSOS<span>DLUZ</span></Link><p className="eyebrow" style={{marginTop:50}}>{article.category}</p><h1>{article.title}</h1><p className="lead">{article.excerpt}</p><p className="muted">{new Intl.DateTimeFormat("pt-BR", {dateStyle:"long"}).format(new Date(article.created_at))}</p><article className="body">{article.content}</article></main>; }
