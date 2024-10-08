import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer"
import SessionWrapper from "@/components/sessionWrapper/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: {
        default: "ByteDigital HomePage",
        template: "%s | Next.js 14"
    },
    description: "Get the best ideas and solutions for your business",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">

            <body className={inter.className}>
                <SessionWrapper>
                    <div className="container">
                        <Navbar />
                        {children}
                        <Footer />
                    </div>
                </SessionWrapper>
            </body>
        </html>
    );
}
