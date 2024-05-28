 //this is a server component,, server side file
 //import Link from 'next/link'
 //import properties from '@/properties.json'  // commented after getting the data from db
import Properties from '@/components/Properties'
//import PropertyCard from '@/components/PropertyCard'
import PropertySearchForm from '@/components/PropertySearchForm'
//import { fetchProperties } from '@/utils/requests'

 

const PropertiesPage = async () => {

// const properties = await fetchProperties()
// //console.log('properties', properties)

// //sort by craetedAt date
// properties.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div> 
        <section className="bg-blue-700 py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                  <PropertySearchForm />
          </div>
        </section>

        <Properties />
  
  </div>
  )
}

export default PropertiesPage

  