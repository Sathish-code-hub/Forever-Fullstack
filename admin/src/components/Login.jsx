import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import {toast} from 'react-toastify'

const Login = ({setToken}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmitHandler = async(e) => {
       try {
        e.preventDefault();
        const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
        console.log(response)
        if (response.data.success) {
            setToken(response.data.token)
        }else{
            toast.error(response.data.message)
        }
        
       } catch (error) {
        console.log(error)
        toast.error(error.message)
        
       }
    }

  return (
    <div className='min-h-screen flex items-center justify-center '>
        <div className='max-w-md bg-white shadow-md rounded-lg px-8 py-6'>
            <h1 className='mb-4 font-bold text-2xl'>Admin Panel</h1>
            <form onSubmit={onSubmitHandler}>
              <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700'>Email Address</p>
                <input type='email' onChange={(e)=>setEmail(e.target.value)} value={email} required placeholder='your@email.com' className='w-full rounded-md px-3 py-2 border border-gray-300 outline-none' ></input>
              </div>
              <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700'>Password</p>
                <input type='password' onChange={(e)=>setPassword(e.target.value)} value={password}  required placeholder='password' className='w-full rounded-md px-3 py-2 border border-gray-300 outline-none'></input>
              </div>
              <button type='submit' className='w-full mt-2 bg-black text-white px-4 py-2 rounded-md'>Login</button>
            </form>
        </div>
      
    </div>
  )
}

export default Login
