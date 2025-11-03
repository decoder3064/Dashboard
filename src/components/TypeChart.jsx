import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

function TypeChart({ breweries }){
  const counts = breweries.reduce((acc, b) => {
    const t = b.brewery_type || 'unknown'
    acc[t] = (acc[t] || 0) + 1
    return acc
  }, {})

  const labels = Object.keys(counts)
  const data = {
    labels,
    datasets: [{
      data: Object.values(counts),
      backgroundColor: labels.map((_, i) => `hsl(${(i*60)%360} 70% 60%)`),
    }]
  }

  return (
    <div className="chart">
      <h3>Breweries by Type</h3>
      <Pie data={data} />
    </div>
  )
}

export default TypeChart
