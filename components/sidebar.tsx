"use client"

interface SidebarProps {
  ticker: string
  setTicker: (ticker: string) => void
  onGenerateForecast: () => void
  onDownloadReport: () => void
  isLoading: boolean
  isGeneratingReport: boolean
  hasChartData: boolean
}

export default function Sidebar({
  ticker,
  setTicker,
  onGenerateForecast,
  onDownloadReport,
  isLoading,
  isGeneratingReport,
  hasChartData,
}: SidebarProps) {
  const isDisabled = isLoading || isGeneratingReport

  return (
    <div className="w-full md:w-96 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Fin-AI Analyst</h1>
        <p className="text-slate-400 text-sm">Enter a stock ticker to get an AI-powered forecast and analysis.</p>
      </div>

      {/* Input Card */}
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
        <label className="text-slate-300 font-medium mb-2 block">Stock Ticker</label>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="e.g., AAPL, MSFT, GOOG"
          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isDisabled}
        />

        {/* Generate Forecast Button */}
        <button
          onClick={onGenerateForecast}
          disabled={isDisabled}
          className="w-full p-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Forecast
        </button>

        {/* Download Report Button */}
        {hasChartData && (
          <button
            onClick={onDownloadReport}
            disabled={isDisabled}
            className="w-full p-3 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download Full Report (PDF)
          </button>
        )}
      </div>
    </div>
  )
}
