import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

    const [method,setMethod] = useState('cod');
    const {navigate,backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);
    const [formData,setFromData]  = useState({
        firstName : '',
        lastName:'',
        email:'',
        street:'',
        city:'',
        state:'',
        zipcode:'',
        country:'',
        phone:''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        setFromData(data => ({...data,[name]:value}))
    }

    const onSubmitHandler = async(event) =>{
        event.preventDefault()
        try {
            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item]) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo)
                        }
                        if (!itemInfo) {
                            console.error(`Product not found for ID: ${items}`);
                            continue;
                        }
                    }
                }

            }

            // console.log(orderItems)

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch(method){
                
                // Api call for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData,{headers:{token}})
                    console.log(response.data.success)
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                        toast.success("Your Order is placed")                        
                    }
                    else{
                        toast.error(response.data.message)
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}})
                    if (responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)
                    }else{
                        toast.error(responseStripe.data.message)
                    }
                    break;

                default:
                    break;
            }

        } catch (error) {
            
        }
    }

    

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* ----------------- Left Side ---------------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input onChange={onChangeHandler} required name='firstName' value={formData.firstName} className='border border-gray-200 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name' />
                    <input onChange={onChangeHandler} required name='lastName' value={formData.lastName} className='border border-gray-200 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name' />
                </div>
                <input onChange={onChangeHandler} required name='email' value={formData.email} className='border border-gray-200 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email address' />
                <input onChange={onChangeHandler} required name='street' value={formData.street} className='border border-gray-200 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />
                <div className='flex gap-3'>
                    <input onChange={onChangeHandler} required name='city' value={formData.city} className='border border-gray-200 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
                    <input onChange={onChangeHandler} required name='state' value={formData.state} className='border border-gray-200 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <input onChange={onChangeHandler} required name='zipcode' value={formData.zipcode} className='border border-gray-200 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Zipcode' />
                    <input onChange={onChangeHandler} required name='country' value={formData.country} className='border border-gray-200 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
                </div>
                <input onChange={onChangeHandler} required name='phone' value={formData.phone} className='border border-gray-200 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone' />
            </div>

            {/* -----------------Right Side---------------- */}
            <div className='mt-8'>

                <div className='mt-8 min-w-80'>
                    <CartTotal/>
                </div>
                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'}/>

                    {/* -----------------Payment method selection---------------- */}
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo}/>
                        </div>
                        <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.razorpay_logo}/>
                        </div>
                        <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELVERY</p>
                        </div>

                    </div>


                    <div className='text-end mt-5'>
                        <button type='submit' className='px-5 py-2 bg-black text-white'>PLACE ORDER</button>
                    </div>
                </div>
            </div>


        </form>
    )
}

export default PlaceOrder
