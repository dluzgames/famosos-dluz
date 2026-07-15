import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";
const cookieName = "famosos_dluz_admin";
const digest = (value: string) => createHash("sha256").update(value).digest("hex");
export async function isAdmin() { const password = process.env.ADMIN_PASSWORD; if (!password) return false; return (await cookies()).get(cookieName)?.value === digest(password); }
export async function signIn(password: string) { const expected = process.env.ADMIN_PASSWORD; if (!expected || password.length !== expected.length || !timingSafeEqual(Buffer.from(password), Buffer.from(expected))) return false; (await cookies()).set(cookieName, digest(expected), { httpOnly:true, secure:process.env.NODE_ENV === "production", sameSite:"lax", maxAge:60*60*24*14, path:"/" }); return true; }
