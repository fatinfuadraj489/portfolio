import "./globals.css";

export const metadata = {
  title: "Color Creatives — Video Editor & Storyteller",
  description: "Portfolio of Color Creatives, a freelance video editor specializing in short-form content, documentaries, and brand films. Editing, color grading, motion graphics, and sound design.",
  openGraph: {
    type: "website",
    title: "Color Creatives — Video Editor & Storyteller",
    description: "Short-form for the scroll, long-form for the story. Editing, color grading, motion graphics, and sound design.",
    images: [{ url: "https://example.com/og-cover.jpg" }], // EDIT: absolute URL
    url: "https://example.com", // EDIT: your live URL
  },
  twitter: {
    card: "summary_large_image",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230b0618'/%3E%3Cpath d='M12 9.5v13l11-6.5z' fill='%23a78bfa'/%3E%3C/svg%3E" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
