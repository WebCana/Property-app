//  https://www.youtube.com/watch?v=PfZ4oLftItk&list=PL2rFahu9sLJ2QuJaKKYDaJp0YqjFCDCtN&ab_channel=GoogleMapsPlatform

import React, {useState} from 'react'
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from '@vis.gl/react-google-maps'

export default function GoogleMaps2023({lat,lng})  {
console.log('lat', lat)
    const [open, setOpen] = useState(false)

const position = {lat:lat || 53.54, lng:lng ||10}//  {lat: 53.54, lng: 10} // {lat, lng}

  return (
    <APIProvider apiKey={"AIzaSyDThHl5gHN-fxxtxXzGc-hjiwmYP1Uuz8E"}>

        <div className='h-52  '> 
            <Map 
            zoom={12} 
            center={position}
            mapId={"34548f9255b34385"}
            >
            <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                <Pin background={"grey"} borderColor={"green"} glyphColor={"purple"}/>
            </AdvancedMarker>
                {open && 
                    <InfoWindow position={position} onCloseClick={()=>setOpen(false)} >
                    <p>I am in Hamburg</p>
                    </InfoWindow>
                }
            </Map>
        </div>

    </APIProvider> 
  )
}

 