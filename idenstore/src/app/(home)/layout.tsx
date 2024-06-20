import type { Metadata } from "next";
import 'rsuite/dist/rsuite.min.css';
import { Montserrat } from "next/font/google";
import Nav from "@/components/Nav/Nav.components";
import "../globals.css";
import { GlobalContextProvider } from "@/components/Helps/GlobalBasket";
import Footer from "@/components/Footer/Footer.components";
import { CustomProvider } from 'rsuite';

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Iden Store",
  description: "Iden Store | Интернет-магазин электроники",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <GlobalContextProvider>
          <CustomProvider>
            <Nav/>
            {children}
            <Footer/>
          </CustomProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
