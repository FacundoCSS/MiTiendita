import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.js'
import { useProduct } from '../context/ProductContext'
import { useOrder } from '../context/OrderContext.js';

import AddProductForm from '../components/AddProductForm.js';
import ProductCard from '../components/ProductCard.js';
import EditShop from '../components/EditShop.js';
import Loading from '../components/Loading.js';
import ShopOrderCard from '../components/ShopOrderCard.js'

import {AiOutlineShop, AiOutlineClose,  AiOutlineArrowLeft} from 'react-icons/ai'
import {BsBagPlus, BsStopwatch} from 'react-icons/bs'
import {FaRegListAlt} from 'react-icons/fa'
import {FiEdit} from 'react-icons/fi'
import {ImLocation} from 'react-icons/im'
import {MdPhone, MdMail} from 'react-icons/md'

const MyProfile = () => {

    const navigate = useNavigate()

    const [isOpenAddProduct, setIsOpenAddProduct] = useState(false)
    const [isOpenEditShop, setIsOpenEditShop] = useState(false)
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [showOrder, setShowOrder] = useState(false)

    const {getProducts} = useProduct()
    const {shop} = useAuth().state
    const {getOrders, orders} = useOrder()

    const callData = async (id) =>{
        const data = await getProducts(id)
        setProducts(data)
        setFilteredProducts(data)
        await getOrders(id)
    }
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

    useEffect(()=>{
        if (shop) callData(shop._id)
    },[])
    if(!shop){
        setTimeout(() => {
            navigate(0);
          }, 7000);
        return <Loading/>
    }

    return (
        <div>
            <div className='bg-[#1F2839] w-[100dvw] min-h-[90vh]'>
                {
                    isOpenEditShop &&
                    <div
                    className='fixed top-0 left-0 container min-h-[100vh] text-white flex justify-center'
                    >
                        <div  
                        className='fixed top-0 left-0 min-h-[100vh] bg-black/[.15] flex z-10'
                        onClick={()=>{setIsOpenEditShop(false)}}
                        >
                        </div>
                        <div 
                        className=' fixed w-[623px] min-h-[670px] max-[768px]:max-h-[770px] text-black bg-white shadow-lg shadow-black/40 rounded-3xl z-20 pb-[5vh] mt-[7vh] transition-all overflow-y-auto
                        max-[768px]:w-[100vw] max-[768px]:m-0
                        '>
                            <div className="pt-[15px] px-[20px] bg-white fixed rounded-b rounded-3xl">
                                <div 
                                className="p-[10px] hover:bg-black/30 rounded-full inline-block cursor-pointer"
                                onClick={(e)=>{
                                    e.preventDefault()
                                    setIsOpenEditShop(false)
                                }}
                                > 
                                    <AiOutlineClose/>
                                </div>
                            </div>
                            <div className='h-full mt-[60px]'>
                                <EditShop/>
                            </div>
                        </div>
                    </div>
                }
                {
                    isOpenAddProduct &&
                    <div
                    className='fixed top-0 left-0 container min-h-[100vh] text-white flex justify-center'
                    >
                        <div  
                        className='fixed top-0 left-0 min-h-[100vh] bg-black/[.15] flex z-10'
                        onClick={()=>{setIsOpenAddProduct(false)}}
                        >
                        </div>
                        <div 
                        className='
                        fixed top-0 left-0 w-[623px] min-h-[670px] max-[768px]:max-h-[770px] text-black bg-white shadow-lg shadow-black/40 rounded-3xl z-20 pb-[5vh] mt-[7vh] transition-all overflow-y-auto
                        max-[768px]:w-[100vw] max-[768px]:m-0
                        '>
                            <div className="pt-[15px] px-[20px]">
                                <div 
                                className="p-[10px] hover:bg-black/30 rounded-full inline-block cursor-pointer fixed max-[768px]:mt-[80px]"
                                onClick={(e)=>{
                                    e.preventDefault()
                                    setIsOpenAddProduct(false)
                                }}
                                > 
                                    <AiOutlineClose/>
                                </div>
                            </div>
                            <div className='h-full'>
                                <AddProductForm/>
                            </div>
                        </div>
                    </div>
                }
            <div className='w-[100svw] bg-[#fe8405] h-[40vh] font-bold rounded-t rounded-[44px]'>
                <div className='w-[100svw] h-[40vh] flex text-white justify-center px-[100px] max-[1024px]:px-[20px] max-[670px]:p-0 max-[670px]:flex-col-reverse max-[670px]:items-center'>
                    <div 
                    className='flex items-center text-[30px] text-black bg-black/10 absolute top-[15vh] left-[3vw] rounded-3xl cursor-pointer hover:bg-black/30 p-[7px]'
                    onClick={()=>setIsOpenEditShop(true)}
                    >
                        <FiEdit/>
                    </div>
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
                    className='text-[70px] w-[40%] text-center flex flex-col items-center
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
                        <div className='ml-[2.5vw] w-[90%] min-h-[10vh] flex items-center justify-between border-b text-[40px] border-black/30 font-bold'>
                            Tus productos 
                            <div 
                            className='text-[20px] p-[11px] shadow-md shadow-black/40 rounded-3xl bg-[#fe8405] hover:p-[14px] transition-all cursor-pointer'
                            onClick={()=>{setIsOpenAddProduct(true)}}
                            >
                                Añadir Producto
                            </div>
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
                                        <ProductCard product={product} myshop={true} key={product._id}/>
                                    ))
                                }
                            </div>
                            :
                            <div className=' m-auto flex flex-col items-center justify-center p-[10px] text-black/60 
                            hover:text-black cursor-pointer rounded-3xl shadow-md shadow-black/30 hover:shadow-black/40'
                            onClick={()=>setIsOpenAddProduct(true)}
                            >
                                <BsBagPlus className='text-[150px]'/>
                                <div className='mt-[12px] text-[30px]'>
                                    Agrega un producto
                                </div>
                            </div>
                            }
                            
                        </div>
                        
                    </div>
                    
                    <div 
                    className={
                        showOrder
                        ? 'w-[100vw] h-[100vh] fixed z-20 bg-[#F9E699] top-0'
                        :'w-[400px] min-h-[60vh] bg-[#F9E699] rounded-3xl shadow-lg shadow-black/40 mb-[80px] max-[768px]:hidden transition-all'
                    }
                    
                    >
                        <div className='ml-[2.5vw] w-[90%] h-[10vh] flex items-center border-b text-[40px] border-black/30 font-bold'>
                        <AiOutlineArrowLeft 
                            onClick={()=>{setShowOrder(false)}}
                            className='text-[30px] mr-[20px] min-[768px]:hidden'/>
                            Ordenes
                        </div>
                        <div className='min-h-[50vh] flex flex-col'>
                            <div className='ml-[2.5vw] w-[90%] h-[7vh] flex items-center text-[25px] font-bold'>
                                Pendientes
                            </div>
                            {
                                orders.length !== 0
                                ?
                                <div className='w-full min-h-[25vh] flex flex-col items-center justify-around'>
                                    {
                                        orders && orders.map(order=> order.completed === false &&  <ShopOrderCard order={order} key={order._id}/>)
                                    }
                                </div>
                                :
                                <div className=' m-auto flex flex-col items-center justify-center text-black/60'>
                                    <FaRegListAlt className='text-[150px]'/>
                                    <div className='mt-[12px] text-[30px]'>
                                        Todavia no tienes ordenes
                                    </div>
                                </div>
                            }
                            <div className='ml-[2.5vw] w-[90%] h-[7vh] flex items-center text-[25px] font-bold'>
                                Entregados
                            </div>
                            {
                                orders.length !== 0
                                &&
                                <div className='w-full min-h-[35vh] flex flex-col-reverse items-center justify-around'>
                                    {
                                        orders.map(order=> order.completed === true &&  <ShopOrderCard order={order} key={order._id}/>)
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div
            onClick={()=>{setShowOrder(true)}}
            className='fixed text-[25px] bg-[#fe8405] rounded-2xl text-white top-[92vh] w-[90vw] ml-[5vw] text-center
            min-[769px]:absolute min-[769px]:hidden'
            >
                Ver ordenes
            </div>
        </div>
    );
};

export default MyProfile;