'use client'
import { ClipLoader } from "react-spinners"
//import ClipLoader from 'react-spinners/ClipLoader'

const LoadingPage = ({loading}) => {
 
    const override = {
        display:'block',
        margin:'100px auto'
    }

  return (
    <ClipLoader 
        color='#3b82f6'
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
       
    />
  )
}

export default LoadingPage