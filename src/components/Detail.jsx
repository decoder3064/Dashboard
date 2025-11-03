import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Navbar from './Navbar'

function Detail() {
  const { id } = useParams()
  const location = useLocation()
  const [brewery, setBrewery] = useState(location.state?.brewery || null)
  const [loading, setLoading] = useState(!brewery)

  useEffect(() => {
    if (brewery) return

    const fetchBrewery = async () => {
      setLoading(true)
      console.log('Detail: fetching brewery id=', id)
      console.log('Detail: location.state=', location.state)
      try {
        const res = await axios.get(`https://api.openbrewerydb.org/v1/breweries/${id}`)
        console.log('Detail: fetched', res.data)
        setBrewery(res.data)
      } catch (err) {
        console.error('Detail fetch error', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBrewery()
  }, [id, brewery])

  if (loading) return (
    <>
      <Navbar />
      <div className="dashboard"><p>Loading...</p></div>
    </>
  )

  if (!brewery) return (
    <>
      <Navbar />
      <div className="dashboard"><p>Item not found</p></div>
    </>
  )

  return (
    <>
      <Navbar />
      <div className="dashboard detail">
        <h2>{brewery.name}</h2>
        <p><strong>Type:</strong> {brewery.brewery_type}</p>
        <p><strong>Location:</strong> {brewery.city}, {brewery.state} {brewery.postal_code}</p>
        {brewery.street && <p><strong>Address:</strong> {brewery.street}</p>}
        {brewery.phone && <p><strong>Phone:</strong> {brewery.phone}</p>}
        {brewery.website_url && (
          <p><strong>Website:</strong> <a href={brewery.website_url} target="_blank" rel="noreferrer">Visit site</a></p>
        )}
        {brewery.county_province && <p><strong>County/Province:</strong> {brewery.county_province}</p>}
        <p><strong>Country:</strong> {brewery.country}</p>
      </div>
    </>
  )
}

export default Detail
