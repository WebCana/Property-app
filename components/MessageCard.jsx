'use client'

import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import { useGlobalContext } from '@/context/GlobalContext'



const MessageCard = ({message}) => {
const [isRead, setIsRead] = useState(message.read)
//"read" is false by default, in the model
const [isDeleted, setIsDeleted] = useState(false)

const {setUnreadCount} = useGlobalContext();

const handleReadClick = async() => { // we are not sending any data, just toggle upon recieving the request
      try {
        const res = await fetch(`/api/messages/${message._id}`,{
          method: 'PUT'
        })

        if (res.status === 200) {
          // const data = await res.json()
          // setIsRead(data.read)
          // console.log(data.read)
         // Or 
          const {read} = await res.json();
        //  console.log('read-MessageCard-L28', read)
          setIsRead(read)
          setUnreadCount((prevCount) => (read ? prevCount-1 : prevCount+1) )//true:-1,,false:+1

          // if (read) {
          //   toast.success('Marked as Read')
          // } else { toast.success('Marked as New')}

          toast.success(`Marked as ${isRead ? 'New' : 'Read'}`)
          
        }
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong')
      }
}

const handleDeleteClick = async () =>{
   try {
        const res = await fetch(`/api/messages/${message._id}`,{
          method: 'DELETE'
        })

        if (res.status === 200) {
          setIsDeleted(true)

          setUnreadCount((prevCount) => ( isRead ? prevCount : prevCount- 1 ));
        //  setUnreadCount((prevCount) => (isRead === false ? prevCount-1: prevCount) )

          toast.success( 'Message Deleted')
          
        }
      } catch (error) {
        console.log(error)
        toast.error('Message was not deleted')
      }

}

if (isDeleted) {
  return null
}

  return (
      <div className="relative bg-white p-4 rounded-md shadow-lg border border-gray-200" >

    {!isRead && (
          <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounde-md'>
            New
          </div>
        )}

              <h2 className="text-xl mb-4">
                <span className="font-bold">Property Inquiry:</span>{' '}
                 {message.property.name}
              </h2>
              <p className="text-gray-700">
                {message.body}
              </p>

              <ul className="mt-4">
                <li><strong>Name:</strong>{' '}{message.sender.username}</li>

                <li>
                  <strong>Reply Email:</strong>{' '}
                  <a href={`mailto:${message.email}`} className="text-blue-500"> 
                     {message.email}
                </a>
                </li>
                <li>
                  <strong>Reply Phone:</strong>{' '}
                  <a href={`tel:${message.phone}`} className="text-blue-500" >
                    {message.phone}
                  </a>
                </li>
                <li><strong>Received:</strong>{' '} {new Date(message.createdAt).toLocaleString()}</li>
              </ul>
              <button 
                className={`mt-4 mr-3 ${ isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'}   py-1 px-3 rounded-md`}
                onClick={handleReadClick}
                >
                {isRead ? 'Mark as New' :'Mark As Read'}
              </button>
              <button 
                  className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
                  onClick={handleDeleteClick}
                  >
                Delete
              </button>
            </div>
  )
}

export default MessageCard