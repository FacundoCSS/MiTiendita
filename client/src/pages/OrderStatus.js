import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useParams} from 'react-router-dom';

import { useProduct } from "../context/ProductContext";
import { useShop } from '../context/ShopsContext';
import { useOrder } from '../context/OrderContext'

import Loading from '../components/Loading.js';

import {AiOutlineShop} from 'react-icons/ai'
import {FiShoppingBag, FiTrash2} from 'react-icons/fi'

const OrderStatus = () => {

    const {getOrder, order} = useOrder()
    const {getProduct} = useProduct()
    const {getShop} = useShop()

    const params = useParams()

    const [shop, setShop] = useState()
    const [products, setProducts] = useState([])
    const [price, setPrice] = useState(0)

    const callData = async(orderId)=>{
        const order = await getOrder(orderId)
        
        const shop = await getShop(order.shop_id)
        setShop(shop)

        let price = 0;
        const prods = [];

        for await (let product of order.products){
            const res = await getProduct(product.id)
            res.quantity = product.quantity
            res.comment = product.comment
            prods.push(res)
            price += res.quantity * res.price
        }
        await setProducts(prods)
        await setPrice(price)
    }

    useEffect(()=>{  
        callData(params.id)
    },[])
    
    if(!order || !shop || !products){
        return <Loading/>
    }
    return (
        <div className='bg-[#1F2839] w-[100vw] flex'>
            <div className='bg-[#fe8405] w-[40vw] h-[50vh] m-auto rounded-3xl font-bold flex flex-col justify-around pb-[15px] text-[30px]'>
                <div className='container flex items-center justify-center text-[50px] text-white'>
                    Tu orden
                </div>
                <div className='flex justify-between w-[94%] h-min mx-[3%] '>
                    {
                        order.completed
                        ? 
                        <div className='bg-[#FEF8D7] w-max text-[#fe8405] px-[12px] py-[8px] rounded-2xl shadow-lg shadow-black/30'>
                            Entregado
                        </div>
                        : order.prepared
                        ?
                        <div className='bg-[#1F2839] w-max text-white px-[12px] py-[8px] rounded-2xl shadow-lg shadow-black/30'>
                            Pedido preparado
                        </div>
                        :
                        <div className='bg-white w-max text-[#1F2839] px-[12px] py-[8px] rounded-2xl shadow-lg shadow-black/30'>
                            Preparando el pedido
                        </div>
                    }
                    <div className='bg-[#FEF8D7] w-max px-[12px] rounded-2xl shadow-lg shadow-black/30 text-[20px] flex items-center'>
                        Cancelar pedido
                    </div>
                </div>
                
                <div className='w-[94%] mx-[3%] my-[15px] px-[25px] bg-[#FEF8D7] rounded-3xl shadow-lg shadow-black/30'>
                    <div className='flex items-center text-[40px] py-[10px]'>
                        {
                        shop?.image
                        ?<img src={shop.image.url}  className='object-cover h-16 w-16 rounded-full mr-[9px]' alt={shop.image.public_id}></img>
                        : <AiOutlineShop className='h-16 w-16'/>}
                        <Link to={`/${shop.name}`} className=' mx-[9px]'>
                            {shop.shop}
                        </Link>
                        <div>
                            
                        </div>
                    </div>
                    <div className='text-[19px]'>
                        {
                            products.map( product =>(
                                <div key={product._id} className='flex items-center border-b border-neutral-500'>
                                    {
                                    product?.image 
                                        ? 
                                        <div className='mx-[5px]'>
                                            <img className='object-cover h-14 w-14 rounded-full' src={product.image.url} alt={product.image.public_id}/>
                                        </div> 
                                        :
                                        <FiShoppingBag className='h-12 w-12 text-neutral-800'/>
                                    }    
                                    
                                    <div className='flex flex-col mx-[5px]'>
                                        {product.quantity} {product.name}
                                        <div className='text-neutral-500 text-[16px]'>{product.comment}</div>
                                    </div>
                                </div>
                            ))
                        }
                        <div className='text-[22px] my-[5px]'>
                        Total: ${price}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderStatus;