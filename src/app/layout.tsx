import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import ReduxProvider from "./ReduxProvider";

export const metadata: Metadata = {
  title: "TasksPhile",
  description: "Official website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/quill@2/dist/quill.bubble.css"
          rel="stylesheet"
        />
      </head>
      <body className="scrollable">
        <ReduxProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
