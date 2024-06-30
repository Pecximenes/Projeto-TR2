import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "UnB - Monitoramento de Tanques",
  description:
    "Plataforma web para visualização do monitoramento de tanques de combustível, pela Universidade de Brasília (UnB)",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable}`}>
      <body className="min-h-screen w-screen overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
