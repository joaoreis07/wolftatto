import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit, Pinyon_Script, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const title = "Junior Wolff Tattoo | Realismo, Arte e Identidade";
const description =
  "Conheça o trabalho de Junior Wolff Tattoo, explore o portfólio de tatuagens em realismo colorido e preto e cinza e entre em contato para conversar sobre seu próximo projeto.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Junior Wolff Tattoo",
  openGraph: {
    title,
    description,
    locale: "pt_BR",
    type: "website",
    siteName: "Wolff Tattoo Studio",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#090909",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${display.variable} ${serif.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink font-sans text-ivory antialiased">{children}</body>
    </html>
  );
}
