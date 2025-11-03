function Navbar({ searchQuery = '', setSearchQuery = () => {}, filterType = 'all', setFilterType = () => {}, breweryTypes = [] }) {
  return (
    <nav className="navbar">
      <h1>Brewery Finder</h1>
      <div className="navbar-filters">
        <input 
          type="text" 
          className="search-bar"
          placeholder="Search breweries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select 
          className="type-filter"
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          {Array.isArray(breweryTypes) && breweryTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </nav>
  )
}

export default Navbar
