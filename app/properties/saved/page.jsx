'use client'

import  {useState, useEffect} from 'react'
import PropertyCard from '@/components/PropertyCard'
import Spinner from '@/components/Spinner'
import {toast} from 'react-toastify'


const SavedPropertiesPage = () => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSavedProperties = async () =>{
            try {
                const res = await fetch('/api/bookmarks')
                //    method: "GET", // its a GET request as its by default GET 
            
                if (res.status === 200) {
                    const data = await res.json();
                    setProperties(data)
                //   toast.success('Succefully fetched Bookmarked Properties')
                } else {
                    console.log(res.statusText)
                    toast.error('Failed to fetch Bookmarked Properties')
                }
            } catch (error) {
                console.log(error)
                    toast.error('Failed to fetch Bookmarked Properties')

            } finally {
                setLoading(false)
            }
        }
        fetchSavedProperties();
    },[])

//console.log('properties', properties)

  return loading ? (<Spinner loading={loading} />) 
                :(

    <section className="px-4 py-6">
    <h1 className="text-2xl mb-4">Bookmarked Properties</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (<p>No Bookmarked Properties found </p>):(

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) =>( //we send this item to the card
              <PropertyCard key={property._id} property={property} /> 
            ))}
          </div>
        )}
        </div>
    </section>   
  )
}

export default SavedPropertiesPage