"use client"

import { Line } from "react-chartjs-2"

interface ChartDisplayProps {
  ticker: string
  chartData: any
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top", labels: { color: "#cbd5e1" } },
    title: {
      display: true,
      text: "Stock Price (Actual vs. Forecast)",
      color: "#f1f5f9",
    },
  },
  scales: {
    x: { ticks: { color: "#94a3b8" }, grid: { color: "#334155" } },
    y: { ticks: { color: "#94a3b8" }, grid: { color: "#334155" } },
  },
}

export default function ChartDisplay({ ticker, chartData }: ChartDisplayProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-100 mb-4">Forecast for {ticker}</h2>
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
        <Line options={chartOptions} data={chartData} />
      </div>
    </div>
  )
}
