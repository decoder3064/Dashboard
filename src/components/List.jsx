import { useNavigate } from 'react-router-dom'
import Card from './Card'

function List({ breweries }) {
  const navigate = useNavigate()

  return (
    <div className="list">
      <h2>All Breweries</h2>
      <div className="list-container">
        {breweries.map((brewery) => (
          <div
            key={brewery.id}
            className="list-item-link"
            onClick={() => navigate(`/breweries/${brewery.id}`, { state: { brewery } })}
            style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
          >
            <Card brewery={brewery} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
