import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useParams} from 'react-router-dom';

import { useProduct } from "../context/ProductContext";
import { useShop } from '../context/ShopsContext';
import { useOrder } from '../context/OrderContext'

import Loading from '../components/Loading.js';
import ProductCard from '../components/ProductCard.js';
import OrderCard from '../components/OrderCard.js'


import {AiOutlineShop, AiOutlineArrowLeft} from 'react-icons/ai'
import {BsBagPlus, BsStopwatch} from 'react-icons/bs'
import {FaRegListAlt} from 'react-icons/fa'
import {ImLocation} from 'react-icons/im'
import {MdPhone, MdMail} from 'react-icons/md'

const Shop = () => {

    const {getProducts} = useProduct()
    const {getShopByName} = useShop()
    const {orderedProducts, price} = useOrder()

    const params = useParams()

    const [shop, setShop] = useState()
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const [showOrder, setShowOrder] = useState(false)

    let search = ''
  
    const handleChange = async (value)=>{
        search = value
        setFilteredProducts(products)
        if (search.length !== 0 ){
            setFilteredProducts(products.filter((product)=>{
                if (product.name.toUpperCase().includes(search.toUpperCase())){
                    return product
                }
            }));
        }
        else{
            setFilteredProducts(products)
        }
    }

    const callData = async(shopId)=>{
        const shop = await getShopByName(shopId)
        setShop(shop)
        const products = await getProducts(shop._id)
        setProducts(products)
        setFilteredProducts(products)
    }
    useEffect(()=>{  
        callData(params.name)
    },[])
    
    if(!shop){
        return <Loading/>
    }

    return (
        <div className='bg-[#1F2839] w-[100dvw] min-h-[100vh]'>
            <div className='w-[100svw] bg-[#fe8405] h-[40vh] font-bold rounded-t rounded-[44px]'>
                <div className='w-[100svw] h-[40vh] flex text-white justify-center px-[100px] max-[1024px]:px-[20px] max-[670px]:flex-col-reverse max-[670px]:items-center max-[670px]:justify-start'>
                    <div className='container text-center text-black flex flex-col justify-center items-center w-[30%] py-[7px]'>
                        <div className=' container text-white text-[35px] max-[768px]:text-[30px] max-[670px]:text-[20px]'>
                        {
                            shop.description
                        }
                        </div>
                        <div
                        className='
                        grid grid-cols-1 text-[25px]
                        max-[1500px]:text-[20px]
                        max-[768px]:text-[15px]
                        max-[670px]:hidden max-[670px]:absolute
                        '
                        >
                            <div className='flex items-center justify-center text-center'>
                                <ImLocation/> 
                                {
                                    shop?.adress
                                    ? shop.adress
                                    : 'Sin determinar'
                                }
                            </div>
                            <div className='flex items-center justify-center text-center'>
                                <BsStopwatch/>
                                {
                                    shop?.schedules_2
                                    ? shop.schedules_2
                                    : 'Sin determinar'
                                }
                            </div>
                            <div className='flex items-center justify-center text-center'>
                                <MdPhone/>
                                {
                                    shop?.phone_number
                                    ? shop.phone_number
                                    : 'Sin determinar'
                                }
                            </div>
                            <div className='flex items-center justify-center text-center'>
                                <MdMail/>{shop.email}
                            </div>
                        </div>
                    
                    </div>
                    <div 
                    className='text-[70px] w-[40%] text-center flex flex-col items-center justify-center
                    max-[768px]:text-[60px]
                    max-[670px]:text-[40px]
                    '>
                        {shop.shop}
                        {
                        shop?.image
                        ?
                        <img 
                        src={shop.image.url} 
                        className='object-cover w-[170px] rounded-full
                        max-[768px]:w-[140px] 
                        max-[768px]:w-[100px]' 
                        alt={shop.image.public_id}
                        ></img>
                        : 
                        <AiOutlineShop className='w-[70px]'/>
                        }
                    </div>
                    <div 
                    className='flex flex-col items-center justify-center w-[30%] text-[25px] 
                    max-[768px]:text-[20px]
                    max-[670px]:hidden max-[670px]:absolute
                    '>
                        <div className='flex items-center my-[10px]'>
                        <BsStopwatch/>
                            {
                                shop?.schedules_1
                                ? shop.schedules_1
                                : 'Sin determinar'
                            }
                        </div>
                        <div className='flex items-center my-[10px]'>
                        <BsStopwatch/>
                        {
                            shop?.schedules_2
                            ? shop.schedules_2
                            : 'Sin determinar'
                        }
                        </div>
                    </div>
                </div>
            </div>
            <div
            className='grid grid-cols-2 text-[15px] container h-[5vh] text-white
            min-[670px]:hidden min-[670px]:absolute
            '
            >
                <div className='flex items-center justify-center text-center'>
                    <ImLocation/> 
                    {
                        shop?.adress
                        ? shop.adress
                        : 'Sin determinar'
                    }
                </div>
                <div className='flex items-center justify-center text-center'>
                    <BsStopwatch/>
                    {
                        shop?.schedules_2
                        ? shop.schedules_2
                        : 'Sin determinar'
                    }
                </div>
                <div className='flex items-center justify-center text-center'>
                    <MdPhone/>
                    {
                        shop?.phone_number
                        ? shop.phone_number
                        : 'Sin determinar'
                    }
                </div>
                <div className='flex items-center justify-center text-center'>
                    <MdMail/>{shop.email}
                </div>
            </div>
            <div className='min-h-[60vh] pt-[5vh] flex justify-around mt-[5vh]'>
                <div 
                className='w-[65vw] min-h-[60vh]  bg-[#F9E699] rounded-3xl shadow-lg shadow-black/40 mb-[80px]
                max-[1500px]:w-[55dvw]
                max-[1200px]:w-[45dvw] 
                max-[768px]:w-[100vw]
                '>
                    <div className='ml-[2.5vw] mb-[4vh] w-[90%] min-h-[10vh] flex items-center justify-center border-b text-[40px] border-black/30 font-bold'>
                        Productos
                    </div>
                    <input 
                    type="text" 
                    placeholder="Buscar productos por nombre"
                    className='w-[90%] py-[15px] px-[10px] ml-[5%] border  rounded-3xl shadow-lg shadow-black/40 
                    bg-white outline-none placeholder:text-neutral-800'
                    onChange={(e)=>{
                        handleChange(e.target.value)
                    }}
                    />
                    <div className='min-h-[50vh] flex '>
                        {
                        products.length !== 0
                        ? 
                        <div 
                        className='grid grid-cols-3  w-full p-[10px] 
                        max-[1500px]:grid-cols-2
                        max-[1200px]:grid-cols-1
                        max-[768px]:grid-cols-2
                        max-[670px]:grid-cols-1
                        '>
                            {
                            filteredProducts.map((product)=>(
                                <ProductCard product={product} myshop={false} key={product._id}/>
                            ))
                            }
                        </div>
                        :
                        <div className=' m-auto flex flex-col items-center justify-center p-[10px] text-black/60 cursor-pointer'>
                            <BsBagPlus className='text-[150px]'/>
                            <div className='mt-[12px] text-[30px]'>
                                No hay Productos
                            </div>
                        </div>
                        }
                        
                    </div>
                    
                </div>
                <div 
                className={
                    showOrder
                    ? 'w-[100vw] h-[100vh] fixed z-20 bg-[#F9E699] top-0'
                    :'w-[400px] min-h-[60vh] bg-[#F9E699] rounded-3xl shadow-lg shadow-black/40 mb-[80px] max-[768px]:hidden'
                }
                
                >
                    
                    <div className='mx-[2.5vw] w-[90%] h-[15vh] flex flex-col justify-around border-b text-[30px] border-black/30 font-bold'>
                        <div className='flex items-center'>
                            <AiOutlineArrowLeft 
                            onClick={()=>{setShowOrder(false)}}
                            className='text-[30px] mr-[20px] min-[768px]:hidden'/>
                            Pedido ${price}
                        </div>
                        {
                            orderedProducts.length !== 0 
                            &&
                            <Link
                            className='text-[20px] text-white bg-[#fe8405] w-[60%] hover:w-[65%] text-center py-[6px] rounded-3xl transition-all'
                            to={`/${params.name}/order`}
                            >
                                Completar pedido
                            </Link>
                        }
                    </div>
                    <div className='h-[50vh] flex '>
                        {
                            orderedProducts.length !== 0
                            ?
                            <div className='flex flex-col items-center w-full p-[10px]'>
                                {
                                    orderedProducts.map((orderedProduct)=>{
                                        return <OrderCard orderedProduct={orderedProduct} key={orderedProduct.product}/>
                                    })
                                }
                            </div>
                            :
                            <div className=' m-auto flex flex-col items-center justify-center text-black/60'>
                                <FaRegListAlt className='text-[150px]'/>
                                <div className='mt-[12px] text-[30px]'>
                                    Pedido vacio
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {
                orderedProducts.length !== 0
                &&
                <div
                onClick={()=>{setShowOrder(true)}}
                className='fixed text-[25px] bg-[#fe8405] rounded-2xl text-white top-[92vh] w-[90vw] ml-[5vw] text-center
                min-[769px]:absolute min-[769px]:hidden'
                >
                    Completar la orden
                </div>
            }
        </div>
    );
};

export default Shop;