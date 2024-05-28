 import Link from "next/link"

const InfoBox = ({
    heading,
    backgroundColor ,
    textColor ='text-gray-800',
    buttonInfo,
    children
                }) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
            <h2 className={`${textColor} text-2xl font-bold`}> {heading}</h2>
            <p className={`${textColor} mt-2 mb-4`}>
               {children}
            </p>
            {/* a is a link formatted as a button */}
            <Link  
              href={ buttonInfo.link}
              className={` ${buttonInfo.backgroundColor} inline-block  text-white rounded-lg px-4 py-2 hover:opacity-80`}
            >
               {buttonInfo.text}
            </Link>
    </div>
  )
}

export default InfoBox