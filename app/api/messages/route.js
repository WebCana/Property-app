import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic'

//GET /api/messages
export const GET = async () =>{
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

      if (!sessionUser || !sessionUser.userId) {  
        return new Response( 'User Id is required', {status: 401})
      }
 
        const { user, userId} = sessionUser;

        const ReadMessages = await Message.find({recipient: userId, read: true})
                    .sort({createdAt: 'desc'}) // sort read msgs in descending order
                    .populate('sender','username') // i wanna get from the sender, his name  , because i have access to the User model due to ref: in the model of Messages
                    .populate('property','name') // i wanna get from the property, its title,, because i have access to the Property model
  
      const unReadMessages = await Message.find({recipient: userId, read: false})
                    .sort({createdAt: -1}) // sort read msgs in ascending order
                    .populate('sender','username') // i wanna get from the sender, his name  , because i have access to the User model due to ref: in the model of Messages
                    .populate('property','name')
    const messages = [...unReadMessages, ...ReadMessages] 
          
                    return new Response(JSON.stringify(messages), {status:200})
  
                  } catch (error) {
                     console.log(error)
        return new Response(JSON.stringify({message: 'Failed to get messages-L28'}), {status:500})
    
  }
}

// POST /api/messages
export const POST = async(request) =>{
    try {
        connectDB();
        const {name,email,phone,message,recipient,property} = await request.json();

 const sessionUser = await getSessionUser();

      if (!sessionUser || !sessionUser.userId) {  
        return new Response(JSON.stringify({msg:'You must be logged in to send a message'}), {status: 401})
      }
 
        const { user, userId} = sessionUser;
     //   console.log('sender', userId)
     //   console.log('reciever-owner', recipient)
      
//can not send message to self
if (userId == recipient) {
  //  console.log('sender == recipient')
    return new Response(JSON.stringify({msg:'Can not send a message to yourself'}), {status:400} )
}

const newMessage = new Message({
    sender: userId, // or user.id
    recipient,
    property,
    name,
    email,
    phone,
    body: message
})

await newMessage.save();

return new Response(JSON.stringify({message: 'Message saved'}), {status:200})

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message: 'Message Failed to save'}), {status:500})

    }
}