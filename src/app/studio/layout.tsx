import type { Metadata } from "next"
import "../globals.css"

export const metadata: Metadata = {
  title: "Sanity Studio - Portfolio",
  description: "Content management studio for the portfolio website.",
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
} 