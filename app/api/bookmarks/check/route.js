import connectDB from '@/config/database'
import Property from '@/models/Property';
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSessionUser'

// NEXTjs documentation,, Route Segment Config
//dynamic Type 'force-dynamic' ,, to enable post into vercel without error
export const dynamic = 'force-dynamic';


// POST /api/bookmarks // he is just GETTING isBookmarked, but as he is sending the id in the body, he must use POST 
export const POST = async (request) =>{
    try {
        await connectDB()
//const property = await Property.findById(params.id)
        const {propertyId}  = await request.json();

         const sessionUser = await getSessionUser();
  //  console.log('sessionUser-route-L38', sessionUser)

      if (!sessionUser || !sessionUser.userId) { //make sure there is a session and a user in that session
        return new Response('User ID is required-bookmarks/check', {status: 401})
      }
 
        const { userId} = sessionUser

// find user in db, by the id above
const user = await User.findOne({_id:userId}) // or just findById()

//Check if property is already bookmarked,,in the bookmarks array of of this user
let isBookmarked = user.bookmarks.includes(propertyId) 

 

return new Response(JSON.stringify({ isBookmarked}), {status:200})

    } catch (error) {
        console.log('error-Bookmarks/check-POST-L48', error)
        return new Response('Something went wrong-Bookmarks/check-POST', {status:500})
        
    }
};