import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

   const geistSans = Geist({
     variable: "--font-geist-sans",
     subsets: ["latin"],
   });

   const geistMono = Geist_Mono({
     variable: "--font-geist-mono",
     subsets: ["latin"],
   });

   export const metadata: Metadata = {
     title: "Ngrok Tunnel",
     description: "Generated ngrok tcp url",
   };

   export default function RootLayout({
     children,
   }: Readonly<{
     children: React.ReactNode;
   }>) {
     return (
       <html lang="en">
         <body
           className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
           {children}
         </body>
       </html>
     );
   }