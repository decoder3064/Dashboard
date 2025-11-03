import axios from 'axios';
import { useEffect, useState } from 'react';
import List from './List';
import Navbar from './Navbar';
import TypeChart from './TypeChart'
import StateChart from './StateChart'

function DashBoard() {
    const [breweries, setBreweries] = useState([])
    const [filteredBreweries, setFilteredBreweries] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterType, setFilterType] = useState('all')

    useEffect(() => {
        const fetchBreweries = async () => {
            try {
                const response = await axios.get('https://api.openbrewerydb.org/v1/breweries?per_page=50')
                setBreweries(response.data)
                setFilteredBreweries(response.data)
                setLoading(false)
            } catch (err) {
                console.error(err)
                setLoading(false)
            }
        }
        fetchBreweries()
    }, [])


    useEffect(() => {
        let results = breweries


        if (filterType !== 'all') {
            results = results.filter(brewery => brewery.brewery_type === filterType)
        }

        if (searchQuery) {
            results = results.filter(brewery => 
                brewery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                brewery.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                brewery.state.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        setFilteredBreweries(results)
    }, [searchQuery, filterType, breweries])

 
    const totalBreweries = breweries.length
    const totalStates = new Set(breweries.map(b => b.state)).size
    const withWebsites = breweries.filter(b => b.website_url).length
    const breweryTypes = [...new Set(breweries.map(b => b.brewery_type))]

    return (
        <>
            <Navbar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterType={filterType}
                setFilterType={setFilterType}
                breweryTypes={breweryTypes}
            />
            
            <div className="dashboard">
                <div className="stats">
                    <div className="stat-card">
                        <h3>{totalBreweries}</h3>
                        <p>Total Breweries</p>
                    </div>
                    <div className="stat-card">
                        <h3>{totalStates}</h3>
                        <p>Different States</p>
                    </div>
                    <div className="stat-card">
                        <h3>{withWebsites}</h3>
                        <p>Have Websites</p>
                    </div>
                </div>

                <div className="charts">
                    <TypeChart breweries={breweries} />
                    <StateChart breweries={breweries} />
                </div>

                <List breweries={filteredBreweries} />
            </div>
        </>
    )
}

export default DashBoard
