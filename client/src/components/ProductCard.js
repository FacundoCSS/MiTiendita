import React, {useState} from 'react';
import toast from 'react-hot-toast'
import {FiShoppingBag, FiEdit, FiTrash2} from 'react-icons/fi'

import {useProduct} from '../context/ProductContext'

import {AiOutlineClose} from 'react-icons/ai'
import AddProductForm from './AddProductForm';
import { useNavigate } from 'react-router-dom';
import Product from './Product';

const ProductCard = ({product, myshop}) => {

    const [isOpenAddProduct, setIsOpenAddProduct] = useState(false)
    const [isOpenProduct, setIsOpenProduct] = useState(false)

    const {deleteProduct} = useProduct()

    const navigate = useNavigate()

    const handleDelete= (id, name)=>{
        toast(t=>(
            <div>
                <p className='text-white'>¿Seguro que quieres eliminar este producto?<strong>{name}</strong> </p>
                <div>
                    <button 
                    className='bg-red-500 hover:bg-red-400 px-3 py-2 rounded-sm text-sm mx-2 text-white'
                    onClick={()=> {
                        deleteProduct(id)
                        toast.dismiss(t.id)
                        navigate(0)
                    }}
                    >
                        Eliminar
                    </button>
                    <button className='bg-slate-400 hover:bg-slate-500 px-3 py-2 rounded-sm mx-2 text-white'
                    onClick={()=> toast.dismiss(t.id)}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        ), {
            style:{
                background: "#202020"
            }
        })
    }
    return (
            <div className='container flex justify-center'>
                {
                isOpenProduct &&
                <div
                className='fixed top-0 left-0 container min-h-[100vh] flex justify-center'
                >
                    <div  
                    className='fixed top-0 left-0 w-[100vw] min-h-[100vh] bg-black/20 z-10'
                    onClick={()=>setIsOpenProduct(false)}>
                    </div>
                    <div 
                    className=' fixed w-[463px] min-h-[631px] max-h-[800px] text-black bg-white shadow-lg shadow-black/40 
                    rounded-3xl z-20 pb-[5vh] mt-[7vh] transition-all overflow-y-auto
                    max-[500px]:w-[100vw] max-[768px]:mt-0 max-[768px]:top-0 max-[500px]:left-0
                    '>
                        <div className="px-[20px]">
                            <div 
                            className="p-[10px] bg-white mt-[10px] rounded-full inline-block cursor-pointer fixed"
                            onClick={(e)=>{
                                e.preventDefault()
                                setIsOpenProduct(false)
                            }}> 
                                <AiOutlineClose/>
                            </div>
                        </div>
                        <div className='h-full'>
                            <Product product={product}/>
                        </div>
                    </div>
                </div>
                }
                {
                isOpenAddProduct &&
                <div className='fixed top-0 left-0 container min-h-[100vh] flex justify-center'>
                    <div  
                    className='fixed top-0 left-0 min-h-[100vh] bg-black/20 z-10'
                    onClick={()=>{
                        setIsOpenAddProduct(false)
                    }}
                    >
                    </div>
                    <div className=' fixed w-[40vw] h-[90vh] text-black bg-white shadow-lg shadow-black/40 rounded-3xl z-20 pb-[5vh] mt-[7vh] transition-all overflow-y-auto'>
                        <div className="pt-[15px] px-[20px]">
                            <div 
                            className="p-[10px] hover:bg-black/30 rounded-full inline-block cursor-pointer fixed"
                            onClick={()=>{
                                setIsOpenAddProduct(false)
                            }}
                            > 
                                <AiOutlineClose/>
                            </div>
                        </div>
                        <div className='h-full'>
                            <AddProductForm edit_product={product}/>
                        </div>
                    </div>
                </div>
                }
                
                <div 
                className='w-[310px] min-h-[240px] bg-white rounded-3xl shadow-md shadow-black/40 my-[10px] cursor-pointer transition-all
                hover:w-[320px] flex flex-col'
                onClick={(e)=>{
                    e.preventDefault()
                    setIsOpenProduct(true)
                }}
                >
                    <div className='w-full h-[35%] flex'>
                    {product?.image 
                        ? <div className='m-auto'><img className='object-cover h-24 w-24 rounded-2xl m-auto' src={product.image.url} alt={product.image.public_id}/></div> 
                        :<FiShoppingBag className='h-12 w-12 text-neutral-800 m-auto'/>
                        }    
                    </div>
                    <div className='w-full h-[45%] p-[10px]'>
                        <div className='text-[23px] font-semibold py-[6px]'>
                            {product.name}
                            </div>    
                        <div className='text-[17px] py-[6px]'>
                            {product.description}
                        </div>
                        <div className='text-[20px] py-[6px] font-semibold'>
                            ${product.price}
                        </div>
                    </div>
                    {
                        myshop 
                        && 
                        <div className='w-full h-[20%] flex items-center justify-around px-[50px]'>
                        <div 
                        className='flex items-center text-[20px] bg-black/10 mr-[30px] p-[10px] rounded-3xl cursor-pointer hover:bg-black/20'
                        onClick={(e)=>{
                            e.stopPropagation();
                            setIsOpenAddProduct(true)
                        }}
                        >
                            <FiEdit/>
                        </div>
                        <div 
                        className='flex items-center text-[20px] bg-black/10 mr-[30px] p-[10px] rounded-3xl cursor-pointer hover:bg-black/20 hover:text-red-700'
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(product._id, product.name) 
                        }}
                        >
                            <FiTrash2/>
                        </div>
                    </div>
                    }
                </div>
            </div>
    );
};

export default ProductCard;