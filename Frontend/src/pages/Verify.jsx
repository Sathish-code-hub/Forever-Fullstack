import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {

    const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(true)

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {

            if (!token) {
                return null                
            }

            const response = await axios.post(backendUrl + '/api/order/verifyStripe', {success, orderId}, {headers:{token}})

            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
                toast.success("Your Order is Placed")                
            }else{
                toast.error('Payment not verified')
                navigate('/cart')
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            navigate('/cart')
        }finally {
            setLoading(false)
          }
    }

    useEffect(()=>{
         verifyPayment()       
    },[token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    {loading && (
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-lg font-semibold text-gray-700">
          Verifying your payment, please wait...
        </p>
      </div>
    )}
  </div>
  )
}

export default Verify
