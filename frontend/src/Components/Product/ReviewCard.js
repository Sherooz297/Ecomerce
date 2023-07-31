import React from 'react'
import ReactStar from "react-rating-stars-component"
import profile from "../../images/Profile.png"




const ReviewCard = ({rev}) => {
    const options = {
        value: rev.rating,
        readOnly: true,
        precision: 0.5,
      };
  return (
    <>
        <div className='flex-none border border-solid border-gray-500 shadow-sm  w-[30vmax] flex flex-col items-center m-[1vmax] p-[3vmax] '>
            <img src={profile} alt="User" className='w-[10vmax]' />
            <p className='font-bold text-2xl'>{rev.name}</p>
            <ReactStar {...options}/>
            <span className='text-lg'>{rev.comment}</span>
        </div>
    </>
  )
}

export default ReviewCard