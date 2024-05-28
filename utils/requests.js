// if there is no domain, just return an empty array instead of an error,,//handle the case where the domain is not available yet
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null // to avoid delay/deployment issues to vercel
//                                                          NEXT_PUBLIC_API_DOMAIN=http://localhost:3000/api
// fetchProperties() created in video-6 /section 2
async function fetchProperties({showFeatured = false} = {}){
  try {
//handle the case where the domain is not available yet
    if (!apiDomain) {
        return []
    }

    const res = await fetch(`${apiDomain}/properties${showFeatured ? '/featured' : '' }`, { cache: "no-store" })  // better to use .env file than the way below
    //const res = await fetch('http://localhost:3000/api/properties') // because we are at server side, we have to include : http://localhost:3000, otherwise wont work
    if (!res.ok) { throw new Error('failed to fetch data') }

    else return res.json();
    
  } catch (error) {
    console.log('error-fetchProperties-L14', error)
    return []
  }

}

//fetch Single property-vid-9
async function fetchProperty(id){
//  console.log('id-fetchProperty-L27', id)
  try {
//handle the case where the domain is not available yet
    if (!apiDomain) {
        return null; //if the domain is not ready yet
    }

    const res = await fetch(`${apiDomain}/properties/${id}`, { cache: "no-store" })  
  //  console.log('res-fetchProperty-L34', res) 
    if (!res.ok) { 
      throw new Error('failed to fetch data') 
    
    }else return res.json();

  } catch (error) {
    console.log('error-fetchProperties-L14', error)
    return null
  }

}


export {fetchProperties, fetchProperty}  // not default as we gonna export other functions