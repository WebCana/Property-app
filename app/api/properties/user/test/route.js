 import connectDB from '@/config/database';
   import Property from '@/models/Property'
   import User from '@/models/User';
     
    

   /**
 Two ways to get a user listings:
 1- /api/properties/user,, then get user from session son only that user can get his listings
 2- use user_id in url, BUT this makes anyone can get this user's listings--
 we will take option 2,, but not editing/deleting , just browse the listings
 */

   // GET /api/properties/user/:userId
    export const GET = async (request, {params}) => {
    try {
            await connectDB()

            const userId = params.userId; // if we called the folder id, then params.id
            console.log('userIdd', userId)

            if(!userId){return new Response('User ID is required', {status:400})}

                const properties = await Property.find({owner: userId})

        return new Response( JSON.stringify(properties), {status: 200 },{ cache: 'no-store' })
      
    } catch (error) {
        console.log('error-api/properties/user/userId-route-L28', error)

        return new Response('Something went wrong', {status: 500})
    }
}


//661d3ea4c8522c7402e2b056