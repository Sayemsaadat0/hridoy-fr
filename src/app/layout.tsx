import type { Metadata } from "next";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-bangla",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ridoysirbiology.com"),
  title: {
    default: "Ridoy Sir Biology - Expert Biology Tutoring Since 2018",
    template: "%s | Ridoy Sir Biology",
  },
  description:
    "Expert biology tutor in Bogura offering personalized classes for Inter 1st Year, Inter 2nd Year, Class 9-10 Biology, and Admission preparation. Teaching since 2018 with proven results. Contact: 01518390674",
  keywords: [
    "ridoy sir biology",
    "biology tutor bogura",
    "biologyaddabogura",
    "biologyaddabogra",
    "biology classes bogura",
    "inter 1st year biology",
    "inter 2nd year biology",
    "class 9-10 biology",
    "admission biology coaching",
    "biology tutor near bogura city college",
    "best biology teacher bogura",
    "biology coaching center bogura",
    "biology tuition bogura",
    "biology classes near me",
    "experienced biology tutor",
    "biology education bogura",
  ],
  authors: [{ name: "Ridoy Sir Biology" }],
  creator: "Ridoy Sir Biology",
  publisher: "Ridoy Sir Biology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ridoysirbiology.com",
    siteName: "Ridoy Sir Biology",
    title: "Ridoy Sir Biology - Expert Biology Tutoring Since 2018",
    description:
      "Expert biology tutor in Bogura offering personalized classes for Inter 1st Year, Inter 2nd Year, Class 9-10 Biology, and Admission preparation. Teaching since 2018 with proven results.",
    images: [
      {
        url: "/logo2.png",
        width: 1200,
        height: 630,
        alt: "Ridoy Sir Biology - Expert Biology Tutoring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ridoy Sir Biology - Expert Biology Tutoring Since 2018",
    description:
      "Expert biology tutor in Bogura offering personalized classes for Inter 1st Year, Inter 2nd Year, Class 9-10 Biology, and Admission preparation.",
    images: ["/logo2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ridoysirbiology.com",
  },
  category: "Education",
  classification: "Biology Tutoring and Education",
  verification: {
    google: "xOUkx8a5GNfG-IxHtFvRyaE0jikpOdb2U3DiL9TDCoA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
