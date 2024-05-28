// https://www.youtube.com/watch?v=cOSw0Vmi3uQ&ab_channel=LeighHalliday

import React, {useState, useEffect} from 'react'
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps'

export default function GeocodingPage({property}) {


  
  return (
    <APIProvider apiKey='AIzaSyDThHl5gHN-fxxtxXzGc-hjiwmYP1Uuz8E'>
      <Geocoding />  {/**the component is below as its a short code */}
    </APIProvider>
  )
}

 

 function Geocoding() {
  const geocodinngApiLoaded = useMapsLibrary("geocoding")

  const [geocodingService, setGeocodingService] = useState();
  const [geocodingResult, setGeocodingResult] = useState()
  const [address, _setAddress] = useState("116 Tandalee crs, Kanata") // _setAddress, _ means will NOT change this state

  useEffect(()=>{
    if(!geocodinngApiLoaded) return;
      setGeocodingService(new window.google.maps.Geocoder())
  },[geocodinngApiLoaded])

  useEffect(()=>{
    if(!geocodingService || !address) return; //true?exit:go down

      geocodingService.geocode({address}, (results, status) =>{
        if(results && status === "OK") {
          console.log('results-L31', results)
          setGeocodingResult(results[0])
        }
      })

  },[geocodingService,address])

    if(!geocodingService) return <div>Loading...</div>
      if(!geocodingResult) return <div>Geocoding....</div>

  return (
    <div>
      <h1>Address: {geocodingResult.formatted_address}</h1>
      <p>Place_ID: {geocodingResult.place_id}</p>
      <p>Latitude: {geocodingResult.geometry.location.lat()}</p>
      <p>Latitude: {geocodingResult.geometry.location.lng()}</p>
    </div>
  )
}

