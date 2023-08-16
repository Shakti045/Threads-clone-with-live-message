'use client'
import React from 'react'
import { Swiper,SwiperSlide } from 'swiper/react'
import ReactPlayer from 'react-player'
import "swiper/css"
const MediaCard = ({medialinks}:{medialinks:any}) => {
  return (
    <div className=' mx-auto mt-3 text-white   w-[600px]  '>
      <Swiper
         slidesPerView={1}
        >
            {
                medialinks?.map((link:any)=>(
                    <SwiperSlide key={link._id}>
                        {
                            link?.resource_type==="video"?(<ReactPlayer url={link.url} controls width={200} height={200} />):(<img src={link.url}  width={200} height={200}    alt="image" />)
                            
                        }
                    </SwiperSlide>
                ))
            }
          
        </Swiper>
    </div>
  )
}

export default MediaCard