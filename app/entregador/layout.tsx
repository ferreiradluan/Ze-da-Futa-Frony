import type React from "react"

export default function EntregadorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">{children}</div>
}
