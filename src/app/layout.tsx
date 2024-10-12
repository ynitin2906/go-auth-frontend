import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import ReduxProvider from "./ReduxProvider";

export const metadata: Metadata = {
  title: "TaskSphere",
  description: "Official website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="scrollable">
        <ReduxProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
