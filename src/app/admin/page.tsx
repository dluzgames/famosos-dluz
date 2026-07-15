import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { listArticles } from "@/lib/content";
export const dynamic = "force-dynamic";
export default async function Admin() { if (!await isAdmin()) redirect("/admin/login"); const articles = await listArticles().catch(() => []); return <main className="admin"><div className="admin-nav"><Link className="brand" href="/">FAMOSOS<span>DLUZ</span></Link><Link href="/admin/nova-noticia">+ Nova notícia</Link></div><h1>Painel editorial</h1><p className="muted">Publique e gerencie as notícias do portal.</p><div className="admin-list">{articles.length ? articles.map(a => <Link key={a.id} href={`/noticia/${a.slug}`}>{a.title}</Link>) : <div className="admin-card">Ainda não há notícias publicadas. Crie a primeira.</div>}</div></main>; }
