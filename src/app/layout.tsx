import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Providers from "./components/Providers";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Example",
  description: "Learning NextAuth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen flex-col justify-between bg-neutral-100 dark:bg-neutral-900">
          <Providers>
            <Navbar />
            <section className="container mx-auto">{children}</section>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
