'use client'

import  {useState, useEffect} from 'react'
import PropertyCard from '@/components/PropertyCard'
import Spinner from '@/components/Spinner'
import Pagination from '@/components/Pagination'


const Properties = () => {

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [totalItems, setTotalItems] = useState(0)


useEffect(() => {
     
    const getProperties = async () => {
        try {
            const res = await fetch(`/api/properties?page=${page}&pageSize=${pageSize}`)

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const {total, properties} = await res.json();
            setProperties(properties)
            setTotalItems(total)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    getProperties();
    
}, [page, pageSize]);

const handlePageChange = (newPage1) =>{
    setPage(newPage1)
    console.log('page-Properties-L42', page)
    console.log('newPage1-Properties-L42', newPage1)
}

  return loading ? (<Spinner  loading={loading}/>) : (
    <section className="px-4 py-6 bg-green-200">
      <div className="container-xl lg:container m-auto px-4 py-6 bg-red-300">
        {properties.length === 0 ? (<p>No Properties found </p>):(

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-yellow-200">
            {properties.map((property) =>( //we send this item to the card
              <PropertyCard key={property._id} property={property} /> 
            ))}
          </div>
        )}
        <Pagination page={page} pageSize={pageSize} totalItems={totalItems} onPageChange1={handlePageChange} />
        </div>
    </section>   
  )
}

export default Properties