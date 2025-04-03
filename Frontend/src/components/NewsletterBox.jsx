import React from 'react'

const NewsletterBox = () => {

    const OnsubmitHandler = (event)=>{
        event.preventDefault();

    }
  return (
    <div className='text-center'>
        <p className='text-gray-800 font-medium'>Subscribe Now & get 20% off</p>
        <p className='text-gray-500 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, delectus?</p>
        <form onSubmit={OnsubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 pl-3 border'>
            <input type='email' placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required/>
            <button type="submit"className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox
