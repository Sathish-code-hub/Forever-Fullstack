import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-32 text-sm'>
                <div>
                    <img src={assets.logo} className='w-32 mb-5' />
                    <p className='w-full md:w-2/3 text-gray-700'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, enim!
                    </p>
                </div>
                <div>
                    <p className='font-medium mb-5 text-xl'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-700'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy-policy</li>
                    </ul>
                </div>
                <div>
                    <p className='font-medium mb-5 text-xl'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-700'>
                        <li>+9840</li>
                        <li>@email.com</li>
                    </ul>
                </div>

            </div>
            <div>
                <hr />
                <p className='text-center text-sm py-5'>
                    copyright 2025@ forever.com - All rights reserved
                </p>
            </div>

        </div>
    )
}

export default Footer
