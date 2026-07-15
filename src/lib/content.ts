import postgres from "postgres";

export type Article = { id: number; title: string; slug: string; excerpt: string; content: string; category: string; seo_title: string | null; seo_description: string | null; created_at: Date };
let ready = false;

function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL ausente");
  return postgres(process.env.DATABASE_URL, { max: 1 });
}
async function setup(sql: ReturnType<typeof postgres>) {
  if (ready) return;
  await sql`CREATE TABLE IF NOT EXISTS articles (id SERIAL PRIMARY KEY, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, excerpt TEXT NOT NULL, content TEXT NOT NULL, category TEXT NOT NULL DEFAULT 'Famosos', seo_title TEXT, seo_description TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  ready = true;
}
export async function listArticles() { const sql = db(); await setup(sql); return sql<Article[]>`SELECT * FROM articles ORDER BY created_at DESC`; }
export async function getArticle(slug: string) { const sql = db(); await setup(sql); const rows = await sql<Article[]>`SELECT * FROM articles WHERE slug=${slug} LIMIT 1`; return rows[0]; }
export async function createArticle(data: Omit<Article, "id" | "created_at">) { const sql = db(); await setup(sql); await sql`INSERT INTO articles (title, slug, excerpt, content, category, seo_title, seo_description) VALUES (${data.title}, ${data.slug}, ${data.excerpt}, ${data.content}, ${data.category}, ${data.seo_title}, ${data.seo_description})`; }
