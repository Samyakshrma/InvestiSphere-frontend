"use client"

import { useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import Sidebar from "@/components/sidebar"
import ChartDisplay from "@/components/chart-display"
import LoadingSpinner from "@/components/loading-spinner"
import ErrorDisplay from "@/components/error-display"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function Home() {
  const [ticker, setTicker] = useState("MSFT")
  const [chartData, setChartData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  const handleGenerateForecast = async () => {
    setIsLoading(true)
    setError(null)
    setChartData(null)

    try {
      const url = `/api/forecast/${ticker.toUpperCase()}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch forecast")
      }

      const data = await response.json()
      const formattedData = formatDataForChart(data.chart_data)
      setChartData(formattedData)
    } catch (err) {
      setError("Failed to fetch forecast. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadReport = async () => {
    setIsGeneratingReport(true)
    setError(null)

    try {
      const url = `/api/generate-and-analyze/${ticker.toUpperCase()}`
      const response = await fetch(url, {
        method: "POST", // keep POST since your backend expects it
      })

      if (!response.ok) {
        throw new Error("Failed to generate PDF report")
      }

      const blob = await response.blob()
      const href = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = href
      link.setAttribute("download", `Investment_Report_${ticker.toUpperCase()}.pdf`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(href)
    } catch (err) {
      setError("Failed to generate PDF report.")
      console.error(err)
    } finally {
      setIsGeneratingReport(false)
    }
  }


  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <Sidebar
          ticker={ticker}
          setTicker={setTicker}
          onGenerateForecast={handleGenerateForecast}
          onDownloadReport={handleDownloadReport}
          isLoading={isLoading}
          isGeneratingReport={isGeneratingReport}
          hasChartData={chartData !== null}
        />

        {/* Main Content Area */}
        <div className="flex-1">
          {error && <ErrorDisplay error={error} />}

          {isLoading || isGeneratingReport ? (
            <LoadingSpinner isGeneratingReport={isGeneratingReport} />
          ) : chartData ? (
            <ChartDisplay ticker={ticker} chartData={chartData} />
          ) : (
            <div className="bg-slate-800 p-12 rounded-lg shadow-lg flex flex-col items-center justify-center h-96">
              <svg className="w-16 h-16 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p className="text-slate-400 text-center">
                Please enter a ticker and click 'Generate Forecast' to see results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function formatDataForChart(apiData) {
  const labels = apiData.map((d) => d.date)
  const actualPrices = apiData.map((d) => d.price_actual)
  const forecastPrices = apiData.map((d) => d.price_forecast)

  // Connect forecast line to actual line
  const lastActualIndex = actualPrices.findLastIndex((p) => p !== null)
  if (lastActualIndex !== -1) {
    forecastPrices[lastActualIndex] = actualPrices[lastActualIndex]
  }

  return {
    labels,
    datasets: [
      {
        label: "Actual Price",
        data: actualPrices,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.1,
      },
      {
        label: "AI Forecast (30-Day)",
        data: forecastPrices,
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderDash: [5, 5],
        tension: 0.2,
      },
    ],
  }
}
