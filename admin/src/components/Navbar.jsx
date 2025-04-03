import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img src={assets.logo} className='w-[10%]'/>
        <button onClick={()=>setToken("")}>Logout</button>
      
    </div>
  )
}

export default Navbar
