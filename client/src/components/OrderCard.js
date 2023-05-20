import React, {useState, useEffect} from 'react';

import { useProduct } from "../context/ProductContext";

import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import {FiShoppingBag, FiTrash2} from 'react-icons/fi'
import { useOrder } from '../context/OrderContext';

const OrderCard = ({orderedProduct}) => {
    const {deleteProduct, addPrice} = useOrder()
    const {getProduct} = useProduct()

    const [product, setProduct] = useState()

    const callData = async (id)=>{
        const res = await getProduct(id)
        await setProduct(res)
    }

    useEffect(()=>{
        callData(orderedProduct.id)
    },[])

    if(!product){
        return  <AiOutlineLoading3Quarters className='animate-spin h-12 w-5 m-auto text-[#fe8405]'/>
    }

    return (
        <div 
        className='w-[95%] min-h-[170px] bg-white rounded-3xl shadow-md shadow-black/40 my-[10px] flex'
        >
            <div className='h-full w-[30%] flex ml-[5%]'>
            {product?.image 
                ? <div className='m-auto'><img className='object-cover w-[100%] rounded-2xl m-auto' src={product.image.url} alt={product.image.public_id}/></div> 
                :<FiShoppingBag className='h-12 w-12 text-neutral-800 m-auto'/>
                }    
            </div>
            <div className='h-full w-[50%] pt-[10px] pl-[5%]'>
                <div className='text-[18px] font-semibold py-[6px]'>
                {orderedProduct.quantity} {orderedProduct.title}
                    </div>    
                <div className='text-[17px] py-[6px]'>
                {orderedProduct?.comment}
                </div>
                <div className='text-[20px] py-[6px] font-semibold'>
                    ${orderedProduct.quantity * orderedProduct.unit_price}
                </div>
            </div>
            <div className='h-full w-[10%] flex flex-col items-center justify-around'>
                <div 
                className='flex items-center text-[20px] bg-black/10 mr-[30px] p-[10px] rounded-3xl cursor-pointer hover:bg-black/20 hover:text-red-700'
                onClick={()=>{
                    addPrice(orderedProduct.quantity * -orderedProduct.unit_price)
                    deleteProduct(orderedProduct.id)
                }}
                >
                    <FiTrash2/>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;