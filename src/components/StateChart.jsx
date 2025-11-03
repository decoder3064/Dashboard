import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

function StateChart({ breweries }){
  const counts = breweries.reduce((acc, b) => {
    const s = b.state || 'Unknown'
    acc[s] = (acc[s] || 0) + 1
    return acc
  }, {})

  const entries = Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,8)
  const labels = entries.map(e=>e[0])
  const data = {
    labels,
    datasets: [{
      label: 'Breweries',
      data: entries.map(e=>e[1]),
      backgroundColor: labels.map((_, i) => `hsl(${(i*40)%360} 60% 55%)`),
    }]
  }

  return (
    <div className="chart">
      <h3>Top States (by number of breweries)</h3>
      <Bar data={data} />
    </div>
  )
}

export default StateChart
