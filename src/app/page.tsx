import Link from "next/link";
import { listArticles } from "@/lib/content";

const demoStories = [
  { title: "Bem-vindo ao Famosos Dluz", slug: "bem-vindo-ao-famosos-dluz", excerpt: "Seu novo portal de cultura pop, entretenimento e celebridades já está pronto para receber notícias.", category: "Destaque", created_at: new Date() },
  { title: "As histórias que movimentam a cultura pop", slug: "historias-da-cultura-pop", excerpt: "Publique novidades, entrevistas, tendências e tudo o que está em alta, com seu próprio painel.", category: "Entretenimento", created_at: new Date() },
];

export const dynamic = "force-dynamic";

export default async function Home() {
  const articles = (await listArticles().catch(() => [])) || demoStories;
  const [hero, ...feed] = articles;

  return (
    <main>
      <header className="topbar"><Link href="/" className="brand">FAMOSOS<span>DLUZ</span></Link><nav><a href="#ultimas">Últimas</a><a href="#sobre">Sobre</a><Link href="/admin">Publicar</Link></nav></header>
      <section className="hero">
        <p className="eyebrow">Cultura pop • Celebridades • Entretenimento</p>
        <h1>As histórias que todo mundo está comentando.</h1>
        <p className="hero-copy">Notícias rápidas, bem apresentadas e feitas para aparecer no Google.</p>
        {hero && <Link className="hero-card" href={`/noticia/${hero.slug}`}><span>{hero.category || "Destaque"}</span><h2>{hero.title}</h2><p>{hero.excerpt}</p><b>Ler notícia →</b></Link>}
      </section>
      <section id="ultimas" className="section"><div className="section-head"><p className="eyebrow">Agora</p><h2>Últimas notícias</h2></div><div className="grid">{feed.map((article) => <Link className="story" href={`/noticia/${article.slug}`} key={article.slug}><span>{article.category || "Famosos"}</span><h3>{article.title}</h3><p>{article.excerpt}</p><small>{new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(article.created_at))}</small></Link>)}</div></section>
      <section id="sobre" className="about"><p className="eyebrow">Feito para crescer</p><h2>Portal leve, sem WordPress.</h2><p>Publicação própria, SEO por notícia, URLs limpas, imagens otimizadas e estrutura pronta para Cloudflare e Coolify.</p></section>
      <footer>© {new Date().getFullYear()} Famosos Dluz</footer>
    </main>
  );
}
