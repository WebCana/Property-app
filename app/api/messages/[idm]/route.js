import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";


export const dynamic = 'force-dynamic';

//PUT /api/messages/:idm
export const PUT = async (request, {params}) => {
    try {
        await connectDB();

        const {idm} = params;
//get session user,,singed in user
        const sessionUser = await getSessionUser();

      if (!sessionUser || !sessionUser.userId) {  
        return new Response( 'User Id is required', {status: 401})
      }
 
        const { userId} = sessionUser;

        const message = await Message.findById(idm)

        if (!message)  return new Response( 'Message not found ', {status:404})
           
//Verify ownership 
        if (message.recipient.toString() !== userId) {
            return new Response('Unauthorized', {status: 401})
        }

//Toggle read field:-- Update message either read/unread depending on the current status
//"read" is false by default, in the model
        message.read = !message.read ; 

// Save the toggle(the update)
        await message.save();

//Return messages object to the Meesage.jsx into MessageCard.jsx
        return new Response(JSON.stringify(message),{status:200})

    } catch (error) {
        console.log(error)
        return new Response( 'Something went wrong ', {status:500})
    }
}

//DELETE /api/messages/:idm
export const DELETE = async (request, {params}) => {
    try {
        await connectDB();

        const {idm} = params;
//get session user,,singed in user
        const sessionUser = await getSessionUser();

      if (!sessionUser || !sessionUser.userId) {  
        return new Response( 'User Id is required', {status: 401})
      }
 
        const { userId} = sessionUser;

        const message = await Message.findById(idm)

        if (!message)  return new Response( 'Message not found ', {status:404})
           
//Verify ownership 
        if (message.recipient.toString() !== userId) {
            return new Response('Unauthorized', {status: 401})
        }

//Delete the message
 await message.deleteOne() 

//Return  msg to the Meesage.jsx into MessageCard.jsx
        return new Response( 'Message Deleted',{status:200})

    } catch (error) {
        console.log(error)
        return new Response( 'Something went wrong ', {status:500})
    }
}
