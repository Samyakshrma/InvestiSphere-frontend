"use client"

interface LoadingSpinnerProps {
  isGeneratingReport: boolean
}

export default function LoadingSpinner({ isGeneratingReport }: LoadingSpinnerProps) {
  return (
    <div className="bg-slate-800 p-12 rounded-lg shadow-lg flex flex-col items-center justify-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-slate-400 text-center">
        {isGeneratingReport ? "Generating PDF report..." : "Fetching data and generating forecast..."}
      </p>
    </div>
  )
}
