import React, {useState, useEffect} from 'react'
//import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps'
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMapsLibrary} from '@vis.gl/react-google-maps'



const MapByAddress = ({property}) => {
 
const [open, setOpen] = useState(false)
//const [position, setPosition] = useState({lat:0,lng:0})
//const [geocodeError, setGeocodeError] = useState(false)
const [loading, setLoading] = useState(true)

 const address = property.location.street
 
 const geocodinngApiLoaded = useMapsLibrary("geocoding")
//console.log('geocodinngApiLoaded', geocodinngApiLoaded)
  const [geocodingService, setGeocodingService] = useState();
  const [geocodingResult, setGeocodingResult] = useState()
  //const [address, _setAddress] = useState("552 peerless st ottawa") // _setAddress, _ means will NOT change this state

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
          setLoading(false)
         } 
      })

  },[geocodingService,address])

    if(!geocodingService) return <div>Loading...</div>
    if(!geocodingResult) return <div className='text-xl'>Geocoding....No Location data found</div>
      

 
const position = {lat:geocodingResult.geometry.location.lat(),lng:geocodingResult.geometry.location.lng()} //  {lat: 53.54, lng: 10} // {lat, lng}

  return (
      <div>
   
        <h1>Address: {geocodingResult.formatted_address}</h1>
  {/* <p>Place_ID: {geocodingResult.place_id}</p>*/}
        <p>Latitude: {geocodingResult.geometry.location.lat()}</p>
        <p>Longitude: {geocodingResult.geometry.location.lng()}</p>

         
            <div className='h-72'> 
                <Map 
                zoom={12} 
                center={ position}
                mapId={"34548f9255b34385"}
                >
                <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                    <Pin background={"grey"} borderColor={"green"} glyphColor={"purple"}/>
                </AdvancedMarker>
                    {open && 
                        <InfoWindow position={position} onCloseClick={()=>setOpen(false)} >
                        <p>I am in  {geocodingResult.address_components[3].long_name  }</p>
                        </InfoWindow>
                    }
                </Map>
            </div>
        

   
    </div>
  )
}

export default MapByAddress