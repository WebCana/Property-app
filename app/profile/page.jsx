'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import profileDefault from '@/assets/images/profile.png'
import { useState, useEffect } from 'react'
import Spinner from '@/components/Spinner'
 import { toast } from 'react-toastify';

const ProfilePage = () => {

const {data: session} = useSession()
//console.log('session', session)

const profileImage = session?.user?.image
const profileName = session?.user?.name
const profileEmail = session?.user?.email

const [properties, setProperties] = useState([])
const [loading, setLoading] = useState(true)

/**
 Two ways to get a user listings:
 1- /api/properties/user,, then get user from session son only that user can get his listings
 2- use user_id in url, BUT this makes anyone can get this user's listings--
 we will take option 2,, but not editing/deleting , just browse the listings
 */

 useEffect(() => {
  const fetchUserProperties = async(usrId) => {
     if (!usrId) { return }
        try {
          const res = await fetch(`/api/properties/user/${usrId}`)

          if (res.status === 200) {
            const data = await res.json();
            setProperties(data)
           // console.log('properties[0]', properties[0])
          }
        } catch (error) {
          console.log(error);
        } finally { 
          setLoading(false) 
        }
  }
  // fetch user properties when session is available
  if (session?.user?.id) {
    fetchUserProperties(session.user.id)
             }
 }, [session]);

 const handleDeleteProperty = async (propId)=>{
//  console.log('propertyId', propId)
 const confirmed = window.confirm('Are you sure you want to delete this property')
      if(!confirmed) return;

    try {
      const res = await fetch(`/api/properties/${propId}`, {method:'DELETE'})
    //  console.log('res', res)

      if (res.status === 200) { // to make sure that the property is already deleted in db
        // Remove the property from state, otherwise we have to reload the page to see it gone
        const updatedProperties = properties.filter((property) =>{

            property._id !== propId }) // this will filter, from the state, the property that is deleted from db
        
        setProperties(updatedProperties) // then we update the state to the updated properties
      
        toast.success('Property Deleted')
        //alert('Property Deleted')

      }else{ toast.error('Failed to delete the property') }

    } catch (error) {

      toast.error('Failed to delete the property')
    //  alert('Failed to delete the property')
      console.log(error)
    }

 }
 

  return (
   
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src= {profileImage || profileDefault}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>
              <h2 className="text-2xl mb-4"><span className="font-bold block">Name: </span>{profileName}</h2>
              <h2 className="text-2xl"><span className="font-bold block">Email: </span>  {profileEmail}</h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!loading && properties.length === 0 && (
                <p>You Have No Property Listings</p>
              ) }
              {loading ? <Spinner loading={loading} /> : (

                properties.map((property) => (
                  <div key={property._id} className="mb-10">
                {/* <Link href="/property.html">*/}
                    <Link href= {`/properties/${property._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src= {property.images[0]}
                        alt=""
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold"> {property.name}</p>
                      <p className="text-gray-600">Address: {property.location.street} {property.location.city} {property.location.state}</p>
                    </div>
                    <div className="mt-2">
                      <Link href= {`/properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
              </div>
                ))
              )}
         
            { /* <div className="mb-10">
                <a href="/property.html">
                  <Image
                    className="h-32 w-full rounded-md object-cover"
                    src="/images/properties/b1.jpg"
                    width={400}
                    height={400}
                    alt="Property 2"
                  />
                </a>
                <div className="mt-2">
                  <p className="text-lg font-semibold">Property Title 2</p>
                  <p className="text-gray-600">Address: 456 Elm St</p>
                </div>
                <div className="mt-2">
                  <a href="/add-property.html"
                    className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </a>
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
                </div>*/}

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage