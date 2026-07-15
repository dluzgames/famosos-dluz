import { redirect } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth";
export default function Login() { async function login(form: FormData) { "use server"; if (await signIn(String(form.get("password") || ""))) redirect("/admin"); redirect("/admin/login?erro=1"); } return <main className="admin"><Link className="brand" href="/">FAMOSOS<span>DLUZ</span></Link><h1>Entrar no painel</h1><form action={login} className="form admin-card"><label>Senha do administrador<input type="password" name="password" required /></label><button className="button">Entrar</button><p className="muted">A senha é definida na variável ADMIN_PASSWORD do Coolify.</p></form></main>; }
