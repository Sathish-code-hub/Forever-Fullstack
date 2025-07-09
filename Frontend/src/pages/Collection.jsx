import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
    const { products,search,showSearch } = useContext(ShopContext);
    const [showFilter, setShowfilter] = useState(false)
    const [Filterproducts, setFilterproducts] = useState([]);
    const [Category, setCategory] = useState([]);
    const [SubCategory, setSubCategory] = useState([]);
    const [sortType,setSortType] = useState(['relavent'])

    const toggleCategory = (e) => {
        if(Category.includes(e.target.value)){
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else{
            setCategory(prev =>[...prev,e.target.value])
        }

    }

    const toggleSubCategory = (e) => {
        if(SubCategory.includes(e.target.value)){
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else{
            setSubCategory(prev =>[...prev,e.target.value])
        }

    }

    const applyFilter = () =>{
        let productsCopy = products.slice();

         //  1. Apply search filtering
        if (search.trim() !== '') {
            const keyword = search.toLowerCase().trim();
    
            productsCopy = productsCopy.filter(item =>
                item.name.toLowerCase().includes(keyword) ||
                item.description.toLowerCase().includes(keyword) ||
                item.category.toLowerCase().includes(keyword) ||
                item.subCategory.toLowerCase().includes(keyword)
            );
        }
        
        if(Category.length>0){
            productsCopy = productsCopy.filter(item => Category.includes(item.category))
        }
        
        if(SubCategory.length>0){
            productsCopy = productsCopy.filter(item => SubCategory.includes(item.subCategory))
        }

        setFilterproducts(productsCopy);
               
    }

    const sortproduct = () => {
        let fpCopy = Filterproducts.slice();
        switch (sortType) {
            case 'low-high':
                setFilterproducts(fpCopy.sort((a,b)=>(a.price - b.price)))
                break;
            case 'high-low':
                setFilterproducts(fpCopy.sort((a,b)=>(b.price - a.price)))
                break;
            default:
                applyFilter();
                break; 
        }
    }

    useEffect(()=>{
        applyFilter()
    },[Category,SubCategory,search,showSearch,products])

    useEffect(()=>{
        sortproduct()
    },[sortType])

    

    
    return (
        <div className='pt-10 border-t flex flex-col sm:flex-row gap-1 sm:gap-10'>
            {/* filter options */}
            <div className='min-w-60'>
                <p onClick={() => setShowfilter(!showFilter)} className='my-2 text-xl flex items-center gap-2 cursor-pointer'>FILTERS
                    <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
                </p>
                {/* category filter */}
                <div className={`border pl-5 py-3 mt-6 border-gray-300 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='text-sm font-medium mb-3'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} />Men
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory} />Women
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory} />Kids
                        </p>
                    </div>
                </div>
                {/* sub category filter */}
                <div className={`border pl-5 py-3 my-5 border-gray-300 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='text-sm font-medium mb-3'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} />Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory} />Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory} />Winterwear
                        </p>
                    </div>
                </div>
            </div>
            {/* right side */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />
                    {/* product sort */}
                    <select onChange={(e)=>setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
                        <option value="relavent">sort by: relavent</option>
                        <option value="low-high">sort by: low-high</option>
                        <option value="high-low">sort by: high-low</option>
                    </select>

                </div>
                {/* map products  */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {
                        Filterproducts.map((item, index) => (
                            <ProductItem
                                key={index}
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price} />
                        ))
                    }
                    {Filterproducts.length === 0 && (
                        <p className="text-center text-gray-500 col-span-full">No matching products found.</p>
                    )}

                </div>
            </div>




        </div>
    )
}

export default Collection
