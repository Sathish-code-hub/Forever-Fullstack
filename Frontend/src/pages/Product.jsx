import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

    const {products,currency,addToCart} = useContext(ShopContext);
    const {productId} = useParams();
    const [productData,setProductData] = useState(false);
    const [image,setImage] = useState('');
    const [size,setSize] = useState('');

    const fetchProductData = async () => {
        products.map((item)=>{
            if (item._id === productId){
                setProductData(item)
                console.log(item)
                setImage(item.image[0])
                return null
            }
        })
    }

    useEffect(()=>{
        fetchProductData();
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 smooth scrol
    },[productId,products])


  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/* product data */}
        <div className='flex gap-12 flex-col sm:flex-row'>

            {/*--------------- product images------------ */}
            <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

                <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between
                                sm:justify-normal sm:w-[18.7%] w-full'>
                    { 
                        productData.image.map((item,index)=>(
                            <img onClick={()=>setImage(item)} 
                            src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
                        ))
                    }

                </div>
                <div className='w-full sm:w-[80%]'>
                    <img src={image} className='w-full h-auto'/>

                </div>
            </div>

            {/* ------product info-------- */}
            <div className='flex-1'>
                <h1 className='text-2xl font-medium mt-2'>{productData.name}</h1>
                <div className='flex items-center mt-2 gap-1'>
                    <img src={assets.star_icon} alt="" className="w-3.5" />
                    <img src={assets.star_icon} alt="" className="w-3.5" />
                    <img src={assets.star_icon} alt="" className="w-3.5" />
                    <img src={assets.star_icon} alt="" className="w-3.5" />
                    <img src={assets.star_dull_icon} alt="" className="w-3.5" />
                    <p className='pl-2'>(122)</p>
                </div>
                <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
                <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
                <div className='flex flex-col gap-4 my-8 '>
                    <p>Select Size</p>
                    <div className='flex gap-2'>
                        {
                            productData.sizes.map((item,index)=>(
                                <button onClick={()=>setSize(item)} className={`px-4 py-2 border bg-gray-100 ${item === size ? 'border-orange-500':''}`}key={index}>{item}</button>
                            ))
                        }
                    </div>
                </div>
                <button onClick={()=>addToCart(productData._id,size)} className='px-8 py-3 bg-black text-white text-sm active:bg-gray-700'>
                    ADD TO CART
                </button>
                <hr className='mt-10 sm:w-4/5'/>
                <div className='mt-5 text-gray-500 text-sm flex flex-col gap-1'>
                    <p>100% Original product.</p>
                    <p>Cash on delivery is available on this product.</p>
                    <p>Easy return and exchange policy within 7 days.</p>
                </div>

            </div>
        </div>

        {/* ------------Review & description --------------- */}
        <div className='mt-20'>
            <div className='flex'>
                <b className='border px-5 py-3 text-sm'>Description</b>
                <p  className='border px-5 py-3 text-sm'>Reviews(122)</p>
            </div>
        </div>

        {/* --------------display related products---------- */}
        <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
      
    </div>
  ):<div className='opacity-0'>

  </div>
}

export default Product
