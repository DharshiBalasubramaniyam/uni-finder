import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { DataStoreProvider } from "./contexts/DataStore";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: 'swap',
  weight: "400"
});


export const metadata: Metadata = {
  title: "Uni Finder",
  description: "Uni Finder - Sri Lanka",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body
        className={`${poppins.variable}`}
      >
        <DataStoreProvider>
          {children}
        </DataStoreProvider>
      </body>
    </html>
  );
}
