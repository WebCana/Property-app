'use client' // see note below

import  {useState, useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import PropertyCard from '@/components/PropertyCard'
import Spinner from '@/components/Spinner'
import PropertySearchForm from '@/components/PropertySearchForm'


const SearchResultsPage = () => {
    const searchParams = useSearchParams();

    //console.log('searchParams.get(location)', searchParams.get('location'))
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)

    const location = searchParams.get('location')
    const propertyType = searchParams.get('propertyType')

    useEffect(() => {
        const fetchSearchResults = async () =>{
         try {
            const res = await fetch(`/api/properties/search?location=${location}&propertyType=${propertyType}`)

                if (res.status === 200) {
                    const data = await res.json();
                    setProperties(data)
                } else {
                    setProperties([]) // empty array
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchSearchResults();
    },[location,propertyType])

   // console.log('properties', properties)
 

  return  (<> 
  <section className="bg-blue-700 py-4">
    <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
            <PropertySearchForm />
    </div>
  </section>

  {loading ? (<Spinner loading={loading}/>) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <Link href={'/properties'} className='flex items-center text-blue-500 hover:underline mb-3'>
            <FaArrowAltCircleLeft className='mr-2 mb-1'/> Back To Properties
        </Link>
        <h1 className="text-2xl text-center mb-4">Search Results</h1>
            {properties.length === 0 ? (<p>No Search Results Found </p>):(

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property) =>( //we send this item to the card
                <PropertyCard key={property._id} property={property} /> 
                ))}
            </div>
            )}
        </div>
    </section>   
  )}
  </>)
}

export default SearchResultsPage


//  Hello can we still use SSR here like use the fetchProperties from utils request concept
//  Like what we have with /properties

// Only then convert into components, the parts that needs to be in client side?

// Thought would be nice if use SSR coz it will be more faster?

// What will be the big advantage if we user CSR (currently) vs with SSR? 
// And this with big records (100K+ properties)
// --------
// Hi Czarnie.
// You may be interested in taking a look at the refactor branch of Brads repository for the project, 
// which has been refactored to take a more typical NextJS approach with querying the db directly in server components 
// and using server actions for updates and mutations. I would say it in general 
// it favours more use of SSR using server components than what you currently see in the project.
// Link to refactor here - 
// https://github.com/bradtraversy/property-pulse/tree/refactor?tab=readme-ov-file#refactor-to-use-server-components
// Hope that is of interest.
 