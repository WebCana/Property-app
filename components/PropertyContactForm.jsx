'use client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import  {FaPaperPlane} from 'react-icons/fa'
import {toast} from 'react-toastify'

const PropertyContactForm = ({property}) => {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [message, setMessage] = useState('')
const [phone, setPhone] = useState('')
const [wasSubmitted, setWasSubmitted] = useState(false)

  
  const{data:session} = useSession();
     const userId = session?.user?.id;
    // console.log('userId', userId)
    // console.log('property.owner', property.owner)


const handleSubmit = async (e) =>{
  e.preventDefault();
  
  const data ={
    name,
    email,
    phone,
    message,
    recipient: property.owner,
    property: property._id,
  }
 // console.log(data)
try {
  const res = await fetch('/api/messages', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json', 
    },
    body: JSON.stringify(data)
  });
//  console.log('res-L45', res)
  if (res.status ===200) {
    toast.success('Message sent succefully')
    setWasSubmitted(true)
  } else if(res.status === 400 || res.status === 401) {
  //console.log('res', res)
    const dataObj = await res.json();

  // console.log('dataObj', dataObj)
  // console.log('dataObj', dataObj)
    toast.error(dataObj.msg)
  //  toast.error(res.statusText)
  } else {
   // toast.error('Error sending form')
  }

} catch (error) {
  console.log('error-L56', error)
    toast.error('Error sending form-PropertyContactFormL57')

} finally {
  setName('')
  setEmail('')
  setPhone('')
  setMessage('')
}
}

//Just install a package like nodemailer to send an email notification to the owner 
//as well as storing the message to MongoDB

// {condition ? ():()}       
return (
    <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
       
{!session ? (<p className='text-red-500 mb-4'>You Must Be logged in to send a message</p>): (

 property.owner === userId ? (<p className='text-red-500 mb-4'>You can not send a message to yourself</p>) 
            : (
   wasSubmitted ? ( <p className='text-green-500 mb-4'>Your message has been sent succefully</p> ) 

          : (<form onSubmit={handleSubmit}>
                <div className='mb-2'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-1'
                    htmlFor='name'
                  >
                    Name:
                  </label>
                  <input
                    className='shadow appearance-none mb-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='name'
                    type='text'
                    placeholder='Enter your name'             
                    required
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-1"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div className='mb-4'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-1'
                    htmlFor='phone'
                  >
                    Phone:
                  </label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='phone'
                    type='text'
                    placeholder='Enter your phone number'
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-1"
                    htmlFor="message"
                  >
                    Message:
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                    id="message"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                    type="submit"
                  >
                    <FaPaperPlane className="mr-2" /> Send Message
                  </button>
                </div>
          </form>)
) 
)}




              
            </div>
  )
}

export default PropertyContactForm