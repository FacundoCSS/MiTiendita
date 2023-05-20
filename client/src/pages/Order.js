import React, {useEffect, useState} from 'react';
import * as Yup from 'yup'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import toast from 'react-hot-toast'

import { useParams, useNavigate } from 'react-router-dom';

import { useShop } from '../context/ShopsContext';
import { useOrder } from '../context/OrderContext'

import OrderCard from '../components/OrderCard.js'

import {AiOutlineLoading3Quarters, AiOutlineCheckCircle} from 'react-icons/ai'

import {FaRegListAlt} from 'react-icons/fa'

import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

const Order = () => {

    const [shop, setShop] = useState()
    
    const {getShopByName} = useShop()
    const {orderedProducts, addOrder, price} = useOrder()

    const params = useParams()
    const navigate = useNavigate()

    const callData = async(shopId)=>{
        const shop = await getShopByName(shopId)
        setShop(shop)
    }



    useEffect(()=>{  
        callData(params.name)
    },[])

    
    const handleResponse= (message, order)=>{
        toast(t=>(
            <div className='text-white'>
                <div className='flex items-center'>
                    <AiOutlineCheckCircle className='text-white w-8 h-8'/>
                    <div className='fonte-smibold text-[15px] text-neutral-300'>{message}</div>
                </div>
                <div>
                    <button 
                    className='bg-red-500 hover:bg-red-400 px-3 py-2 rounded-sm text-sm mx-2 text-white'
                    onClick={()=> {
                        toast.dismiss(t.id)
                        navigate(`/${order._id}/status`)
                    }}
                    >
                        Ver el estado de la orden
                    </button>
                </div>
            </div>
        ),{
            style:{
                background: "#171717",
            }
        })
    }

    if(!shop){
        return (
            <div className='flex text-white w-[100vw] h-[100vh] bg-[#fe8405]'>
                <AiOutlineLoading3Quarters className='animate-spin h-5 w-5 m-auto'/>
            </div>
        )
    }
    
    


    return (
        <div className='bg-[#fe8405] w-screen h-screen flex items-center justify-around'>
            <div className='w-[55vw] min-h-[90vh] bg-neutral-100 rounded-3xl shadow-lg shadow-black/40'>
                <div className='mx-[2.5vw] w-[90%] h-[10vh] flex items-center justify-between border-b text-[40px] border-black/30 font-bold'>
                                Formulario
                </div>
                <div>
                    <Formik
                        
                        validationSchema={Yup.object({
                            adress: Yup.string().required("La direccion es necesaria"),
                            name: Yup.string().required("El Nombre es necesario"),
                            surname: Yup.string().required("El Apellido es necesario"),
                            email: Yup.string().required("El email es necesario"),
                            phone_number: Yup.string().required("El numero de telefono es necesario"),
                        })}

                        initialValues={{
                               products: orderedProducts,
                               shop_id: shop._id,
                               price: parseInt(price)
                            }}


                        enableReinitialize
                        onSubmit={async(values, actions)=>{
                            const res = await addOrder(values)
                            handleResponse(res.message, res.order)
                        }}
                        >
                            
                        {({handleSubmit, setFieldValue, isSubmitting}) => (
                            <Form
                            className='w-full h-[70vh] flex flex-col justify-around mx-[5%]'
                            onSubmit={handleSubmit}
                            >
                                <div className='flex flex-col'>
                                    <label htmlFor="adress_field" className='my-[8px] text-[18px] font-semibold'>Direccion</label>
                                    <Field 
                                    name='adress' 
                                    id="adress_field"
                                    autoComplete="off"
                                    placeholder="Ingresa tu direccion"
                                    className='px-3 h-[56px] rounded-3xl w-[250px]  border-2 border-[#fba625]
                                        focus:bg-[#fba625] focus:text-white outline-none focus:w-[400px] transition-all focus:placeholder-white/60'
                                    onChange={(e)=>{
                                        setFieldValue('adress',e.target.value)
                                    }}
                                    />
                                    <ErrorMessage component="p" className='text-red-400 text-sm' name='adress' />
                                </div>
                                
                                <h2 className='text-[18px] font-semibold'>Datos de contacto</h2>
                                <div>
                                    <Field 
                                    name='name' 
                                    autoComplete="off"
                                    placeholder="Nombre"
                                    className='px-3 h-[56px] rounded-3xl w-[250px]  border-2 border-[#fba625]
                                        focus:bg-[#fba625] focus:text-white outline-none focus:w-[400px] transition-all focus:placeholder-white/60'
                                    onChange={(e)=>{
                                        setFieldValue('name',e.target.value)
                                    }}
                                    />
                                    <ErrorMessage component="p" className='text-red-400 text-sm' name='name' />
                                </div>

                                <div>
                                    <Field 
                                    name='surname' 
                                    autoComplete="off"
                                    placeholder="Apellido"
                                    className='px-3 h-[56px] rounded-3xl w-[250px]  border-2 border-[#fba625]
                                        focus:bg-[#fba625] focus:text-white outline-none focus:w-[400px] transition-all focus:placeholder-white/60'
                                    onChange={(e)=>{
                                        setFieldValue('surname',e.target.value)
                                    }}
                                    />
                                    <ErrorMessage component="p" className='text-red-400 text-sm' name='surname' />
                                </div>

                               <div>
                                    <Field 
                                    name='email' 
                                    autoComplete="off"
                                    placeholder="Email"
                                    className='px-3 h-[56px] rounded-3xl w-[250px]  border-2 border-[#fba625]
                                        focus:bg-[#fba625] focus:text-white outline-none focus:w-[400px] transition-all focus:placeholder-white/60'
                                    onChange={(e)=>{
                                        setFieldValue('email',e.target.value)
                                    }}
                                    />
                                    <ErrorMessage component="p" className='text-red-400 text-sm' name='email' />
                               </div>

                                <div>
                                    <IntlTelInput
                                    name='phone_number' 
                                    onPhoneNumberChange={function (){
                                        setFieldValue('phone_number',document.querySelectorAll('.form-control')[0].value)
                                    }}
                                    containerClassName="intl-tel-input"
                                    inputClassName="form-control"
                                    style={{border: "2px solid #fba625 "}}
                                    />
                                   
                                    <ErrorMessage component="p" className='text-red-400 text-sm' name='phone_number' />
                                </div>

                                <button
                                type='submit' 
                                className='px-[20px] py-[7px] border-2 border-[#fba625] rounded-2xl hover:bg-[#fba625] my-[15px] font-semibold w-[150px]
                                    hover:text-white hover:cursor-pointer text-center
                                    focus:text-white focus:cursor-pointer focus:bg-[#fba625] outline-none'
                                >
                                    {isSubmitting ? (
                                        <AiOutlineLoading3Quarters className='animate-spin h-5 w5'/>
                                        ) : 'Encargar'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div className='w-[35vw] min-h-[90vh] bg-neutral-100 rounded-3xl shadow-lg shadow-black/40'>
                        <div className='mx-[2.5vw] w-[90%] h-[10vh] flex items-center justify-between border-b text-[40px] border-black/30 font-bold'>
                            Pedido ${price}
                        </div>
                        <div className='h-[50vh] flex '>
                            {
                                orderedProducts.length !== 0
                                ?
                                <div className='flex flex-col items-center w-full p-[10px]'>
                                    {
                                        orderedProducts.map((orderedProduct)=>{
                                            // console.log(orderedProduct)
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
    );
};

export default Order;