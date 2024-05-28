 
//import properties from '@/properties.json'
import PropertyCard from '@/components/PropertyCard'
import { fetchProperties } from '@/utils/requests'
import Link from 'next/link'


 
  
 
 const HomeProperties = async () => {

  const data = await fetchProperties()
  //const properties = await fetchProperties()

    const recentProperties = data.properties.sort(()=>Math.random()- Math.random()).slice(0,3)

   return (
    <>
      <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Recent Properties
        </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {  recentProperties === 0 ? 
                    (<p>No Properties Found</p>) : 
                        (recentProperties.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))
                        )}
        
                </div>
        </div>
        </section>
    <section className="m-auto max-w-lg my-10 px-6">
      <Link
        href="/properties"
        className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Properties</Link>
    </section>
    </>
   )
 }
 
 export default HomeProperties

//  // fetchProperties() created in video-6 /section 2
// async function fetchProperties(){
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`, { cache: "no-store" })   
//     if (!res.ok) 
//     { throw new Error('failed to fetch data') 
//   }else return res.json();

//   } catch (error) {
//     console.log('error-fetchProperties-L14', error)
//   }

// }