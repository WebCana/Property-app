   import connectDB from '@/config/database';
   import Property from '@/models/Property'
   import { getSessionUser } from '@/utils/getSessionUser';
//import { useParams } from 'next/navigation';

   // GET /api/properties /id
    export const GET = async (request, {params}) => {
    try {
            await connectDB()
const property = await Property.findById(params.id)
//console.log('property', property)

        if (!property) return new Response('Property Not Found-GET-L11', {status:404});

        return new Response( JSON.stringify(property), {status: 200 },{ cache: 'no-store' })
     
    } catch (error) {
        console.log('error-api/properties/route-L6', error)
        return new Response('Something went wrong', {status: 500})
    }
}

// DELETE /api/properties /id
//we must enable only the property owner to delete: 
//1- make sure there is a session, 2- match the loggedin user to the owner of the session

    export const DELETE = async (request, {params}) => {
    try {
        const propertyId = params.id; // because we wanna use it in many places
        const sessionUser = await getSessionUser()

    //Check for session
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', {status: 401})
        }

        const {userId} = sessionUser;

            await connectDB()

            const property = await Property.findById(propertyId)
        //console.log('property', property)

        if (!property) return new Response('Property Not Found-GET-L11', {status:404});

        //Verify ownership 
        if (property.owner.toString() !== userId) {
            return new Response('Unauthorized', {status: 401})
        }

        await property.deleteOne()

        return new Response( 'Property Deleted' , {status: 200 },{ cache: 'no-store' })
     
    } catch (error) {
        console.log('error-api/properties/route-L6', error)
        return new Response('Something went wrong', {status: 500})
    }
}


// PUT /api/properties/id  ,, update Property PUT API Route
export const PUT = async (request, {params}) => {
  try {
      await connectDB()
 
      //Get property id
      const {id} = params // property id,, that came in url

    const sessionUser = await getSessionUser();
  //  console.log('sessionUser-route-L38', sessionUser)

      if (!sessionUser || !sessionUser.userId) {
        return new Response('User ID is required', {status: 401})
      }
//console.log('id-L75', id)
        const { userId} = sessionUser
      
// console.log('userId-L78', userId)

     const formData = await request.formData()
   //    console.log('formData-L81', formData.get('name'))

// Access all values from amenities  
     const amenities = formData.getAll('amenities');// getAll , as its an array
  //   const images = formData.getAll('images').filter((image) => image.name !== '')//.filter: to handle the situation when no image was sent,,.filter((image) => image.name !== '')
   //    console.log(amenities)

// Get the property to be updated
    const existingProperty = await Property.findById(id)
//console.log('existingProperty-L90', existingProperty)
        if (!existingProperty) {
        return new Response('Property Does not exist', {status: 404})  
        }
//Verify Ownership
if (existingProperty.owner.toString() !== userId) {
    return new Response('Unauthorized', {status: 401})
}

// //Create property data object for database
    const editedPropertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
     owner: userId,

    };

// Update property in DB
 const updatedProperty =  await Property.findByIdAndUpdate(id, editedPropertyData)
   

   return new Response(JSON.stringify(updatedProperty), {staus: 200},{ cache: 'no-store' })

  } catch (error) {
    return new Response('Failed to Update property', {status:500},{ cache: 'no-store' })
  }
}
