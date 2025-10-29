function Card({ brewery }) {
  return (
    <div className="card">
      <h3>{brewery.name}</h3>
      <span className="type-badge">{brewery.brewery_type}</span>
      
      <div className="card-info">
        <p><strong>Location:</strong> {brewery.city}, {brewery.state}</p>
        
        {brewery.street && (
          <p><strong>Address:</strong> {brewery.street}</p>
        )}
        
        {brewery.phone && (
          <p><strong>Phone:</strong> {brewery.phone}</p>
        )}
      </div>

      {brewery.website_url && (
        <a 
          href={brewery.website_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="website-link"
        >
          Visit Website
        </a>
      )}
    </div>
  )
}

export default Card
