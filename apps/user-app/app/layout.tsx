


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import { AppbarClient } from "../AppbarClient";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple Wallet App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       
        
      <body>
        
      <Providers>
        <AppbarClient></AppbarClient>

        {children}
        
        
        
    
      </Providers>
      </body>

       
      
        
       
 
      
    </html>
  );
}
