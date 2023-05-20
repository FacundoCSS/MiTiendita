import React, {useState, useEffect} from 'react';
import toast from 'react-hot-toast'

import { useProduct } from '../context/ProductContext'
import { useOrder } from '../context/OrderContext.js';

import {AiOutlineCheck} from 'react-icons/ai'
import {FiShoppingBag, FiTrash2} from 'react-icons/fi'

const ShopOrderCard = ({order}) => {

    const {getProduct} = useProduct()
    const {updateOrder, deleteOrder} = useOrder()

    const [products, setProducts] = useState([])
    const [commited, setCommited] = useState(order.completed)
    const [prepared, setPrepared] = useState(order.prepared)
    const [price, setPrice] = useState(0)

    const callData = async (orderProducts) => {
        let price = 0;
        const prods = [];
        for await (let product of orderProducts){
            const res = await getProduct(product.id)
            res.quantity = product.quantity
            res.comment = product.comment
            prods.push(res)
            price += product.quantity * res.price
        }
        await setProducts(prods)
        await setPrice(price)
    }

    useEffect(()=>{
        callData(order.products)
    }, [])

    const handleDelete= (id)=>{
        toast(t=>(
            <div>
                <p className='text-white'>¿Seguro que quieres eliminar esta orden?</p>
                <div>
                    <button 
                    className='bg-red-500 hover:bg-red-400 px-3 py-2 rounded-sm text-sm mx-2 text-white'
                    onClick={()=> {
                        deleteOrder(id)
                        toast.dismiss(t.id)
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
        <div className='text-black bg-white rounded-3xl w-[85%] shadow-lg shadow-black/40 p-[12px] flex my-[13px] font-semibold'>
            <div className='w-[70%] h-[100%]'>
                <div className='text-[19px] flex flex-col'>
                    {order.adress} 
                    <div className='text-black/60 text-[17px]'>{order.fullname}</div>
                    <div className='text-black/60 text-[17px]'>{order.phone_number}</div>
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
            <div className='w-[30%] flex flex-col items-center justify-center'>
                <button
                onClick={()=>{
                    setCommited(!order.completed)
                    updateOrder( order._id, { completed: !order.completed } )
                }}
                className={
                    commited 
                    ? 'p-[10px] bg-[#fba625] text-black rounded-3xl font-semibold text-center rounded-full'
                    : 'p-[10px] bg-orange-100 rounded-3xlfont-semibold text-center cursor-pointer shadow-md shadow-black/20 hover:text-black hover:bg-[#fba625] rounded-full'
                }
                >
                    <AiOutlineCheck/>
                </button>
                <div 
                className='flex items-center text-[20px] bg-black/10 p-[10px] my-[25px] rounded-3xl cursor-pointer hover:bg-black/20'
                onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(order._id) 
                }}
                >
                    <FiTrash2/>
                </div>
            </div>
        </div>
    );
};

export default ShopOrderCard;