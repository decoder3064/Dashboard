import Card from './Card'

function List({ breweries }) {
  return (
    <div className="list">
      <h2>All Breweries</h2>
      <div className="list-container">
        {breweries.map((brewery) => (
          <Card key={brewery.id} brewery={brewery} />
        ))}
      </div>
    </div>
  )
}

export default List
