'use client'
import HashLoader from  "react-spinners/HashLoader"


const Loader= () => {
  return (
    <div className=" bg-dark-1  absolute top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center">
        <HashLoader
       color="#1724a5"
       speedMultiplier={1}
         />
    </div>
  )
}

export default Loader;