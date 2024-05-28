
import {revalidatePath} from 'next/cache'
revalidatePath('/properties')

// Property Image Display
// Reed Topham on Mar 6
// Rather than passing cache: no-store to prevent caching on every request 
// for all properties, would it be better to use the revalidatePath function from next/cache and revalidatePath('/properties') 
// in the POST request just before returning the Response.redirect? Would this be more efficient 
// if there were thousands of properties in the database?

// REPLY

// Will Adams on Mar 9
// Hi Reed.
// Yes I think I would agree and it makes sense to me to do so.
// Obviously we would on occasion benefit from caching the data, but in the case of having just added a property 
// then yes it would make sense to invalidate that cache so the user gets the latest properties without caching so guaranteed 
// to include the newly added property.
// I'll add some links for further reading for others, but it sounds like you have done your research?

// options.cache:
// https://nextjs.org/docs/app/api-reference/functions/fetch#optionscache

// revalidatePath:
// https://nextjs.org/docs/app/api-reference/functions/revalidatePath

// Caching in Next is quite a big subject in itself and I think Brad only touches on what is possible in this course.
// Hope that helps.

// REPLY

// Reed Topham on Mar 10
// Thanks for the response. Yes, I think caching is one of the hardest parts about moving from SPAs to Next, 
// which is why it is tempting to simply add cache: no-store to every fetch. I agree caching in Next could be a course 
// of its own. I have a bunch of other really high level questions, but I'll wait until I finish and post them on Discord. 
// Thanks again.

/*
Geocoding & Mapbox Map
Hey guys, apparently now you have to have a credit card on file in order to use Mapbox. 
It will NOT be charged if you are under 15K requests per month. 

This is something that they changed and I was not aware of because I already had a card on file. 
Unless you are making this a production app and get a bunch of users, you will stay under that threshold.


Say Something...

JOHN HORN on Apr 15
Is there an alternative that does not need a credit card? I have no credit card available to me.

REPLY

Will Adams on Apr 16
Hi John.
Some possible alternatives you could try:

OpenCage Geocoder:
Provides forward and reverse geocoding. It uses a variety of sources and is built on open data.
Offers a free tier with limited requests per day without needing a credit card.

LocationIQ:
Offers both geocoding and reverse geocoding services.
Provides a free tier with daily request limits and does not require a credit card for sign-up.

Here Technologies:
Offers mapping, geocoding, and location services.
Provides a freemium plan that includes access to their API without requiring a credit card.

Leaflet with Nominatim (for OpenStreetMap):
Leaflet is an open-source JavaScript library for mobile-friendly interactive maps.
Nominatim is a tool to search OpenStreetMap data by name and address (geocoding) and to generate synthetic addresses of OSM points (reverse geocoding).
Both are free and open-source, perfect for integration without any cost.

Bing Maps:
Offers geocoding services, though typically less popular than Google, it still provides robust API options.
Has a free tier that allows for a basic number of transactions without a credit card.

You could always sign up for a Mobile Banking app such as Revolut or Monzo where you then get virtual cards you could use. You don't need any funds to do this and your card won't be charged by the API's (at least running locally for the course). Even if you did use them in deployment too and people actually started using your app, you get generous free usage with both API's.

Hope that helps.
*/

 