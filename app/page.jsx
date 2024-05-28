 //'use client' // to make the component a client-side component
// import {useRouter} from 'next/navigation'
import Hero from '@/components/Hero'
import InfoBoxes from '@/components/InfoBoxes'
import HomeProperties from '@/components/HomeProperties'
import FeaturedProperties from '@/components/FeaturedProperties'
//import connectDB from '@/config/database'

//  export const metadata = {
//     title: 'test' //you can have metadata in every page
//  }

const HomePage = () => {
 // console.log('Salam') // logged on server console NOT browser console except if we write 'use client' on top of the page
  //const router = useRouter() // used only at client side
 // await connectDB() // to test the connection to the database

 // console.log(process.env.MONGODB_URI)
  return (
    <>
    <Hero />
    <InfoBoxes />
    <FeaturedProperties />
    <HomeProperties />
   
   {/* <h1 className="text-5xl">Home Page</h1>
  <Link href='/properties'>Show Properties</Link>*/}
  { /*<a href="/properties">Show Properties</a>*/}
    </>
  )
}

export default HomePage