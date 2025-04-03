import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    //initial visible is false
    const [visible, setVisible] = useState(false)

    const {setShowSearch,getCartCount,navigate,setCartItems,token,setToken} = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <div className='flex justify-between items-center py-5 font-medium'>

            <Link to='/'><img src={assets.logo} className='w-28 cursor-pointer'></img></Link>

            <ul className='hidden sm:flex gap-6 text-gray-600 '>

                <NavLink className='flex flex-col gap-1 items-center' to='/'>
                    <p>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-500 hidden' />
                </NavLink>

                <NavLink className='flex flex-col gap-1 items-center' to='/collection'>
                    <p>Collection</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-500 hidden' />
                </NavLink>

                <NavLink className='flex flex-col gap-1 items-center' to='/about'>
                    <p>About</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-500 hidden' />
                </NavLink>

                <NavLink className='flex flex-col gap-1 items-center' to='/contact'>
                    <p>Contact</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-500 hidden' />
                </NavLink>

            </ul>

            <div className='flex gap-6 items-center'>
                <img onClick={()=>setShowSearch(true)}src={assets.search_icon} className='w-5 cursor-pointer'></img>

                <div className='group relative'>
                    
                    <img onClick={()=> token ? 'null' : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer'></img>
                    <div className='hidden group-hover:block absolute dropdown-menu right-0 pt-4'>
                        {/* dropdown menu */}
                        {
                            token &&
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 rounded bg-slate-100 text-gray-500'>
                                <p className='cursor-pointer hover:text-black'>My profile</p>
                                <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                       }
                    </div>
                </div>

                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5'></img>
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>

                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden'></img>
            </div>

            {/* menu bar for small screens */}

            <div className={`absolute top-0 right-0 bottom-0 bg-white overflow-hidden transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180'></img>
                        <p>Back</p>
                    </div>
                    {/* adding onclick to go back to the clicked page */}
                    <NavLink  onClick={()=>setVisible(false)}className='pl-7 py-2 border 'to='/'>Home</NavLink>
                    <NavLink  onClick={()=>setVisible(false)}className='pl-7 py-2 border 'to='/about'>About</NavLink>
                    <NavLink  onClick={()=>setVisible(false)}className='pl-7 py-2 border 'to='/contact'>Contact</NavLink>
                    <NavLink  onClick={()=>setVisible(false)}className='pl-7 py-2 border 'to='/collection'>Collection</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
