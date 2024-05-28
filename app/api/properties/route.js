//  import User from '@/models/User';
//   import { getServerSession } from 'next-auth/next';
//   import {  authOptions } from '@/utils/authOptions';
   import connectDB from '@/config/database';
   import Property from '@/models/Property'
   import { getSessionUser } from '@/utils/getSessionUser';
   import cloudinary from '@/config/cloudinary';

   // GET /api/properties 
    export const GET = async (request) => {
    try {
            await connectDB()

//implement pagination
const page = request.nextUrl.searchParams.get('page') || 1; // OR page # 1
const pageSize = request.nextUrl.searchParams.get('pageSize') || 3; // OR 3 properties per page

const skip = (page-1)*pageSize; //if we wanna show page 3, so we skip pages 1&2,,
//so we skip the properties on those two pages,which means we skip 2*pageSize properties

//we wanna get total number of properties we have in db
const total = await Property.countDocuments({});


// now we wanna get ONLY the properties at the page we are looking at:-  
const properties = await Property.find({}).skip(skip).limit(pageSize).sort({createdAt: -1})

// form an object that we wanna send back
const result = {total, properties}

        return new Response( JSON.stringify(result), {status: 200 },{ cache: 'no-store' })
      // return new Response('Salam Alaikom', {status: 200})
    } catch (error) {
        console.log('error-api/properties/route-L35', error)
        return new Response('Something went wrong', {status: 500})
    }
}



// POST /api/properties  Add Property POST API Route
export const POST = async (request) => {
  try {
      await connectDB()
//replace the below 4 lines by using the external file getSessionUser@utils

    //  const session = await getServerSession(authOptions);
        //   if (!session) { // if the user is not loggedIn(no session)
        //     return new Response('Unauthorized', {status:401})
        //   }
        // const userId = session.user.id ;//id of the loggedIn user
    const sessionUser = await getSessionUser();
  //  console.log('sessionUser-route-L38', sessionUser)

      if (!sessionUser || !sessionUser.userId) {
        return new Response('User ID is required', {status: 401})
      }
        const { userId} = sessionUser
      
//         //or {userId} = await getSessionUser() ,, but in this case we cant check if there is a session

     const formData = await request.formData()
    //   console.log('formData', formData.get('name'))

     // Access all values from amenities and images
     const amenities = formData.getAll('amenities');// getAll , as its an array
     const images = formData.getAll('images').filter((image) => image.name !== '')//.filter: to handle the situation when no image was sent,,.filter((image) => image.name !== '')
   //    console.log(amenities,images)
// //Create property data object for database
    const propertyData = {
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

// // Upload image(s) to Cloudinary
 const imageUploadPromises = [];

for(const image of images){
  const imageBuffer = await image.arrayBuffer();
  const imageArray = Array.from(new Uint8Array(imageBuffer));
  const imageData = Buffer.from(imageArray);

  // Convert the image data to base64
  const imageBase64 = imageData.toString('base64')

  //Make request to upload to Cloudinary
  const result = await cloudinary.uploader.upload(
    `data:image/png;base64,${imageBase64}`,{
      folder:'propertypulse'
    }
    );
    imageUploadPromises.push(result.secure_url)

    // Wait for all images to upload
    const uploadedImages = await Promise.all(imageUploadPromises)

    // Add uploaded images to the propertyData object

    propertyData.images = uploadedImages;
  }

   //  console.log('propertyData', propertyData.type)

// Save to the DB
   const newProperty =  new Property(propertyData)
   if (newProperty) {
  // console.log('newProperty-L116', newProperty)
  
   await newProperty.save()
 }

 

  return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`)

//  return new Response(JSON.stringify({message: 'Successful Submit'}), {staus: 200},{ cache: 'no-store' })

  } catch (error) {
    return new Response('Failed to add property', {status:500},{ cache: 'no-store' })
  }
}

 //  const allProperties =   Property.find({})
  //  console.log('allProperties', allProperties)
//   console.log('newProperty-POST-L81', newProperty)

//  await User.create({ // save the below into User model
//                 email: 'naadhm@testtt.com',
//                 username:'naadhm',
//                 image:  'Image'
//                })

//  await Property.create(propertyData
    //{
//   name: "Boston Commons fantastic Retreat",
//   type: "Apartment",
//   description: "This is a beautiful apartment located near the commons. It is a 2 bedroom apartment with a full kitchen and bathroom. It is available for weekly or monthly rentals.",
//   location: {
//     street: "120 Tremont Street",
//     city: "Boston",
//     state: "MA",
//     zipcode: "02108"
//   },
//   beds: 7,
//   baths: 1,
//   square_feet: 1500,
//   amenities: [
//     "Wifi",
//     "Full kitchen",
//     "Washer & Dryer",
//     "Free Parking",
//     "Hot Tub",
//     "24/7 Security",
//     "Wheelchair Accessible",
//     "Elevator Access",
//     "Dishwasher",
//     "Gym/Fitness Center",
//     "Air Conditioning",
//     "Balcony/Patio",
//     "Smart TV",
//     "Coffee Maker"
//   ],
//   rates: {
//     weekly: 1100,
//     monthly: 4200
//   },
//   seller_info: {
//     name: "John Doe",
//     email: "john@gmail.com",
//     phone: "617-555-5555"
//   },
  
   
// }

//  )


  //  await Property.create(  {
  //     email: "naadhm@tenkt.com",
  //     username: "naadhm",
  //     image:  "Image"
  //  })

//  export const GET = async (request) => {
//     try {
//             await connectDB()
//         return new Response( JSON.stringify({message:'Salamaat'}), {status: 200 })
//        // return new Response('Salam Alaikom', {status: 200})
//     } catch (error) {
//         console.log('error-api/properties/route-L6', error)
//         return new Response('Something went wrong', {status: 500})
//     }
// }