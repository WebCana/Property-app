//  Client Side
'use client'   
 import {useEffect, useState} from 'react'
 import{ useParams, } from 'next/navigation'
import { fetchProperty } from '@/utils/requests'
import PropertyHeaderImage from '@/components/PropertyHeaderImage'
import Link from 'next/link'
import PropertyDetails from '@/components/PropertyDetails'
import {FaArrowLeft, } from 'react-icons/fa'
import Spinner from '@/components/Spinner'
import PropertyImages from '@/components/PropertyImages'
import BookmarkButton from '@/components/BookmarkButton'
import ShareButtons from '@/components/ShareButtons'
import PropertyContactForm from '@/components/PropertyContactForm'




const PropertyPage = async () => {
  const {id} = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
//console.log('id-PropertyPage-L19', id)

useEffect(() => {
  const fetchPropertyData = async () =>{ //As we can't use sync above, in useEffect
    if(!id) return;
 
try {
        const proprtty = await fetchProperty(id)
      //  console.log('proprtty', proprtty)
        setProperty(proprtty) // our target
}catch (error) {
        console.error('Error fetching propert:', error)
} finally{setLoading(false)}
 }
    if (property === null) { // to avoid endless loop, due to the below dependency
      fetchPropertyData()
    }

}, [id,property]);

if(!property && !loading) {return(<h1 className='text-center text-2xl font-bold mt-10 '>Property Not Found-PropertyPage-L39</h1>)}


  
  return (
    <>
    {loading && <Spinner loading={loading}/>}  

    {(!loading && property) && (
      <>
      <PropertyHeaderImage imagge={property.images[0]} />
      {/**  Go Back arrow  */}
       <section>
          <div className="container m-auto py-6 px-6">
            <Link
              href="/properties"
              className="flex items-center text-blue-500 hover:text-blue-600 "
            >
              <FaArrowLeft className='mr-2'/> Back to Properties
            </Link>
          </div>
      </section>

{/* <!-- Property Info -->*/}

    <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">

        {/**<PropertyDetails property={property} /> in place the main tag */}
         <PropertyDetails property={property} />

    {/* <!-- Sidebar -->*/}
          <aside className="space-y-4">       
            <BookmarkButton property={property} />
            <ShareButtons property={property} />
        {/* <!-- Contact Form -->*/}
            <PropertyContactForm property={property} />
          </aside>
        </div>
      </div>
    </section>

    <PropertyImages images={property.images}/>

      </>)}
    </>
  )
}

export default PropertyPage


// <button onClick={()=> router.push('/')} className='bg-blue-500 p-2'>
//     Go Home {id}
//     <br />
//     {namee}
//     <br />
//     {pathname}
// </button>


// const router = useRouter()
  // const {id} = useParams()
  // const serchParams =  useSearchParams()
  // const namee = serchParams.get('name')
  // const pathname = usePathname()