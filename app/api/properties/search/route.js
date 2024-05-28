import connectDB from "@/config/database";
import Property from "@/models/Property";


//GET /api/properties/search
export const GET = async (request) =>{
   try {
    await connectDB();


    const {searchParams} = new URL(request.url);

   // console.log('searchParams', searchParams)
  //  console.log('request', request)
    //request.url gets all url, then we destructure from it the searchParams
    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');

 //   console.log(location,propertyType)

    const locationPattern = new RegExp(location, 'i')

// Match locationPattern against database fields
    let querry = {
        $or: [
            { name: locationPattern},
            { description: locationPattern},
            { 'location.street': locationPattern},
            { 'location.city': locationPattern},
            { 'location.state': locationPattern},
            { 'location.zipcode': locationPattern},
            ],
                };
// Only check for property if its NOT ALL
    if (propertyType && propertyType !== 'All') {
        const typePattern = new RegExp(propertyType, 'i' );
// Match typePattern against database fields
    querry.type = typePattern;
}

const properties = await Property.find(querry);// search in db according to the querry

    return new Response(JSON.stringify(properties), {status:200});
    //return new Response(JSON.stringify({message:'Success'}), {status:200});

   } catch (error) {
    console.log(error)
    return new Response('Something Went Wrong', {status:500});


   } 
};