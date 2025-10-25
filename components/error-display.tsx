"use client"

interface ErrorDisplayProps {
  error: string
}

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  return <div className="bg-red-800 text-red-100 p-4 rounded-md mb-4">{error}</div>
}
