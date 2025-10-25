export async function GET(request: Request, { params }: { params: { ticker: string } }) {
  // Mock API response - replace with actual API call
  const mockData = {
    chart_data: [
      { date: "Jan 1", price_actual: 150, price_forecast: null },
      { date: "Jan 8", price_actual: 152, price_forecast: null },
      { date: "Jan 15", price_actual: 148, price_forecast: null },
      { date: "Jan 22", price_actual: 155, price_forecast: null },
      { date: "Jan 29", price_actual: 158, price_forecast: 158 },
      { date: "Feb 5", price_actual: null, price_forecast: 162 },
      { date: "Feb 12", price_actual: null, price_forecast: 165 },
      { date: "Feb 19", price_actual: null, price_forecast: 168 },
    ],
  }

  return Response.json(mockData)
}
