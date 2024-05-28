 import connectDB from '@/config/database';
   import Property from '@/models/Property'
   
     
    

   /**
 Two ways to get a user listings:
 1- /api/properties/user,, then get user from session son only that user can get his listings
 2- use user_id in url, BUT this makes anyone can get this user's listings--
 we will take option 2,, but not editing/deleting , just browse the listings
 */

   // GET /api/properties/user/:userId
    export const GET = async (request, {params}) => { // user id, not property id
    try {
            await connectDB()

            const id = params.usrId; // if we called the folder id, then params.id
        //   console.log('userIdd', id)

             if(!id){return new Response('User ID is required', {status:400})}

                const properties = await Property.find({owner: id})

       return new Response( JSON.stringify(properties), {status: 200 },{ cache: 'no-store' })

      //  return new Response(  'connected', {status: 200 },{ cache: 'no-store' })
      
    } catch (error) {
        console.log('error-api/properties/user/userId-route-L28', error)

        return new Response('Something went wrong-GET-L33', {status: 500})
    }
}

 



//661d3ea4c8522c7402e2b056