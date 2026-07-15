import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Famosos Dluz | Cultura pop e celebridades",
  description: "Notícias de famosos, cultura pop e entretenimento.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
