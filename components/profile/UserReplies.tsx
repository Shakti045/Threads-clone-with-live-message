'use client'
import React from 'react'
import Threadcard from '../Cards/Threadcard'


const UserReplies = ({threads}:{threads:any[]}) => {
    console.log(threads)
  return (
    <div>
        {
           threads.map((thread:any) => {
            return (
              <Threadcard user={thread?.user} medialinks={thread?.medialinks} likedusers={thread?.likedusers} comments={thread?.comments} createdat={thread?.createdat}  _id={thread._id} content={thread.content} key={thread._id}
              
              />
            )
            }) 
        }
    </div>
  )
}

export default UserReplies