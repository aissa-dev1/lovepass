import type { Metadata } from "next";
import "./globals.scss";
import BootStrap from "@/components/bootstrap";

export const metadata: Metadata = {
  title: "Love Pass",
  description: "Create and share love pass cards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <BootStrap>{children}</BootStrap>
      </body>
    </html>
  );
}
