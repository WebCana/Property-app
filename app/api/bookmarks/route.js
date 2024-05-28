import connectDB from '@/config/database'
import User from '@/models/User'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'

// NEXTjs documentation,, Route Segment Config
//dynamic Type 'force-dynamic' ,, to enable post into vercel without error
export const dynamic = 'force-dynamic';

// GET /api/bookmarks 
export const GET = async () =>{
    try {
        await connectDB()

//check for the session
    const sessionUser = await getSessionUser();

            if (!sessionUser || !sessionUser.userId) { //make sure there is a session and a user in that session
                return new Response('User ID is required-bookmarks-L19', {status: 401})
            }
                const { userId} = sessionUser

      // find user in db, by the id above
const user = await User.findOne({_id:userId}) // or just findById()

// Get users bookmarks
      const bookmarkedProperties = await Property.find({_id:{$in: user.bookmarks}})//option 1,, this get me array of objects(properties)
 //     const bookmarkedIds =  user.bookmarks; // option 2, NO wrong option, as it get me the array of ids

      return new Response(JSON.stringify(bookmarkedProperties), {status: 200})

    } catch (error) {
        console.log(error)
      return new Response('Something went wrong -GET-L34', {status: 500})

        
    }
}



// POST /api/bookmarks
export const POST = async (request, {params}) =>{
    try {
        await connectDB()
//const property = await Property.findById(params.id)
        const {propertyId}  = await request.json(); // sent in the body, not in URL

         const sessionUser = await getSessionUser();
  //  console.log('sessionUser-route-L38', sessionUser)

      if (!sessionUser || !sessionUser.userId) { //make sure there is a session and a user in that session
        return new Response('User ID is required', {status: 401})
      }
//console.log('id-L75', id)
        const { userId} = sessionUser

// find user in db, by the id above
const user = await User.findOne({_id:userId}) // or just findById()

//Check if property is already bookmarked,,in the bookmarks array of of this user
let isBookmarked = user.bookmarks.includes(propertyId) 

let message;

if (isBookmarked) {
    // if already bookmarked then remove it from the bookmarks array
    user.bookmarks.pull(propertyId)
    message = "Bookmark removed succefully"; // will show in a toast 
    isBookmarked = false; // we cant use a state here as this not a client side
    
} else{ // if not bookmarked,  add id to bookmarks array
    user.bookmarks.push(propertyId);
    message= 'Bookmark added succefully'; // will show in a toast
    isBookmarked = true
}

// save it to DB
await user.save();

return new Response(JSON.stringify({message, isBookmarked}), {status:200})

    } catch (error) {
        console.log('error-Bookmarks-POST-L48', error)
        return new Response('Something went wrong-Bookmarks-POST', {status:500})
        
    }
};