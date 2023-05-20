import React, {useEffect, useState} from 'react';
import {FiShoppingBag} from 'react-icons/fi';
import {Formik, Form, Field} from 'formik'

import {useOrder} from '../context/OrderContext'

const Product = ({product}) => {

    const [counter, setCounter] = useState(1)

    const {addProduct, addPrice} = useOrder()

    useEffect(()=>{
        const addAutoResize = () => {
            document.querySelectorAll('[data-autoresize]').forEach(function (element) {
              element.style.boxSizing = 'border-box';
              var offset = element.offsetHeight - element.clientHeight;
              element.addEventListener('input', function (event) {
                event.target.style.height = 'auto';
                event.target.style.height = event.target.scrollHeight + offset + 'px';
              });
              element.removeAttribute('data-autoresize');
            });
          }
          addAutoResize()
    }, [])

    return (
        <div className='flex flex-col'>
            <div className='w-full flex'>
            {product?.image 
                        ? <img className='object-cover w-full h-[250px]' src={product.image.url} alt={product.image.public_id}/> 
                        :<div className='w-full h-[250px] flex bg-[#fe8405]'><FiShoppingBag className='h-[200px] w-[200px] text-neutral-800 m-auto'/></div>
            }
            </div>
            <div className='flex justify-between px-[5%] py-[15px] font-semibold text-[20px]'>
                <div className=''>
                    {product.name}
                </div>
                <div className='text-[#fe8405] border rounded-2xl border-[#fe8405] px-[10px] py-[5px}'>
                    ${product.price}
                </div>
            </div>
            <div className='px-[5%]'>
                {product.description}
            </div>
            <div className='flex my-[15px] px-[3px] rounded-2xl shadow-md shadow-black/30 w-[90%] m-auto font-semibold'>
                <div 
                className='w-[15%] flex items-center justify-center py-[7px] border-r-2 cursor-pointer'
                onClick={()=>{
                    if(counter !== 1){
                        setCounter(counter - 1)
                    }
                }}
                >
                    -
                </div>
                <div className='w-[70%] flex items-center justify-center py-[7px]'>
                    {counter}
                </div>
                <div 
                className='w-[15%] flex items-center justify-center py-[7px] border-l-2 cursor-pointer'
                onClick={()=>{setCounter(counter + 1)}}
                >
                    +
                </div>
            </div>
            <div className='w-[90%] pt-[20px] border-b-2 m-auto '></div>
            <Formik
            enableReinitialize
            initialValues={{
                id: product._id,
                title: product.name,
                quantity: counter,
                unit_price: parseInt(product.price)

            }}
            onSubmit={async(values, actions)=>{
                await addProduct(values)
                addPrice(product.price * counter)
            }}
            >        
                {({isSubmitting, handleSubmit, setFieldValue}) => (
                    <Form onSubmit={handleSubmit} >
                        <label htmlFor="comment_field" className='pt-[10px] font-semibold w-[90%] mx-[5%] my-[15px]'>Comentarios</label>
                        <Field 
                                name='comment' 
                                component="textarea"
                                id="comment_field"
                                data-autoresize
                                rows="2"
                                autoComplete="off"
                                placeholder='Agrega un comentario'
                                className='w-[90%] h-[100px] p-[5px] mx-[5%] outline-none resize-none box-border overflow-y-hidden bg-neutral-200 rounded-lg'
                                onChange={(e)=>{
                                    setFieldValue('comment',e.target.value)
                                }}
                                />
                        <button 
                        type='submit' 
                        className='w-[90%] m-auto flex items-center justify-around rounded-2xl py-[6px] px-[10px] bg-[#fe8405] font-semibold text-white mt-[14px]'>
                            <div>Agregar a mi pedido</div>
                            <div>${product.price * counter}</div>
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Product;