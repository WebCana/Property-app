//  https://www.youtube.com/watch?v=YhvLnd0ylds&ab_channel=OpenJavaScript
'use client'

import React, {useState, useEffect} from 'react'
//import Map, {Marker} from 'react-map-gl'
import { setDefaults, fromAddress } from 'react-geocode'
import Spinner from '../Spinner'
import Image from 'next/image'
import pin from '@/assets/images/pin.svg'
import GoogleMaps2023 from '../Maps2/GoogleMaps2023'

const PropertyMap = ({property}) => {

    const [lat, setLat] = useState()
    const [lng, setLng] = useState()

    const [viewport, setViewport] = useState({
      latitude:0,
      longitude:0,
      zoom:12,
      width:'100%',
      height:'500px'
    })
    const [loading, setLoading] = useState(true)

    const [show, setShow] = useState(true)
    const [geo, setGeo] = useState(false)
    const [browser, setBrowser] = useState(false )
    const [manual, setManual] = useState( false)
   // const [map, setMap] = useState(false )
    

const getPropertyGeoLocation = async ()=>{
  
  if(!navigator.geolocation){
    throw new Error("No geolocation available")
  }
  
  function success(pos){
    console.log('pos-L9', pos)
    
    setLat(pos.coords.latitude)
    setLng(pos.coords.longitude)
   // const position = {lat,lng}
   console.log('lat,lng', lat,lng)
     }   

  function error(err){
    console.log('err-L25', err)
    if(err.code === 1){
      alert("Please allow access to geolocation")
    }else{
      alert("Position is currently is unavailable")
    }
  }
  
  const options ={
    enableHighAccuracy: true, //coords accuracy
    timeout: 5000, // time of browser getting the coords
    maximumAge: 0, // old coords,, 10k ms, how long back in time it is acceptable coords, to get a Cashed position from his browser
    //usually this is set to 0 to get the current position
  };
  
  navigator.geolocation.getCurrentPosition(success, error, options);
}

 
 // npm i react-map-gl  mapbox-gl  react-geocode

return (
  <section>                          
        <div className='flex ml-4'>
          <label id="choose" className='text-sm text-gray-400'> Add geoLocation and Show the Map </label>
          <input className='ml-2' type="radio" id="choose" onClick={()=>setGeo(!geo)}/>
        </div>

    {geo && 
          <div className='flex ml-4'>

            <div className=' ml-4'>
              <label id="browser" className='text-sm text-gray-400'>Browser Location </label>
              <input className='ml-2' type="radio" name='location_way' id="browser" onClick={()=> {setBrowser(true);  setManual(false) } } />
            </div>
            <div className=' ml-4'>
              <label id="manual" className='text-sm text-gray-400'>Enter Location Manually </label>
              <input className='ml-2' type="radio" name='location_way' id="manual" onClick={()=>{setBrowser(false); setManual(true) }}  />
            </div>
          
          { manual && 
  
            <div className='block bg-blue-200  pl-2 text-center m-2 '>          
                <label className='block ml-2 mb-1 text-sm font-medium text-gray-900 dark:text-white'> Latitude & Longitude </label>
                <input  value={lat}  className='border p-2  mb-1' type="number" placeholder='Enter Latitude'  onChange={(e)=> setLat(e.target.value)}/>
                <input value={lng}   className='border p-2  mb-1' type="number" placeholder='Enter Longitude' onChange={(e)=> setLng(e.target.value)} />
            </div>
          }
          { browser &&

            <div className='block bg-blue-200  pl-2 text-center m-2 '>          
                <label className='block ml-2 mb-1 text-sm font-medium text-gray-900 dark:text-white'>Browser</label>
                <input   onClick={getPropertyGeoLocation}  className='border p-2  mb-1' type="radio" /> 

                <GoogleMaps2023 position={{lat,lng}}/>

            </div>


         }
       

        </div>
        }
      
  </section>
  )
}

export default PropertyMap