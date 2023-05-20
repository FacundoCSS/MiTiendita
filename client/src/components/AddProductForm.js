import React, {useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import * as Yup from 'yup'
import {Formik, Form, Field, ErrorMessage} from 'formik'

import {useProduct} from '../context/ProductContext'

import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import {FiShoppingBag} from 'react-icons/fi'

const AddProductForm = ({edit_product}) => {
    
    const [value, setValue] = useState('')
    const [state, setState] = useState(false)
    

    const {addProduct, updateProduct} = useProduct()

    const navigate = useNavigate()

    const readFile = (file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        return reader.addEventListener("load", e=>{
            let newImg = `<img src='${e.currentTarget.result}' class='object-cover h-32 w-32 rounded-full' alt="avatar"></img>`
            document.querySelector(".resultado").innerHTML+=newImg
        })
    }

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
        <div className='container text-black flex px-[16px]'>
                <Formik

                validationSchema={Yup.object({
                    name: Yup.string().required("El Nombre es necesario"),
                    price: Yup.string().required("El precios es necesario"),
                    description: Yup.string().required("La descripcion es necesaria"),
                })}

                initialValues={
                    edit_product
                    ? {
                        name: edit_product.name,
                        price: edit_product.price,
                        filter: edit_product.filter,
                        description: edit_product.description,
                    }
                    : {
                        name: "",
                        price: "",
                        filter: "",
                        description: "",
                }}


                enableReinitialize
                onSubmit={async(values, actions)=>{
                    if (edit_product){
                        await updateProduct(edit_product._id, values)
                        navigate(0)
                    }
                    else {
                        await addProduct(values)
                        navigate(0)
                    }
                }}
                >
                    
                {({isSubmitting, handleSubmit, setFieldValue}) => (
                    <Form 
                    className='w-full flex flex-col items-center '
                    onSubmit={handleSubmit}
                    >
                        <h2 className='text-[40px] font-bold'>
                            Añade un producto
                        </h2>
                        <label 
                              htmlFor="file-1"
                              className='p-[15px] bg-neutral-200 rounded-full text-neutral-500 hover:bg-neutral-300 hover:text-neutral-700 cursor-pointer'
                              >
                        {
                            state
                            ?<div className='resultado'></div>  
                            :
                            edit_product?.image
                            ?<img src={edit_product.image.url} class='object-cover h-32 w-32 rounded-full' alt="avatar"></img>
                            : <FiShoppingBag className='h-32 w-32'/>
                        }
                        
                        </label> 
                        
                        <input 
                        type="file" 
                        name="image" 
                        className='absolute invisible'
                        id="file-1"
                        onChange={e => {
                            setValue('file')
                            readFile(e.target.files[0])
                            setState(true)
                            setFieldValue('image', e.target.files[0])
                        }}
                        />

                        <label htmlFor="name_field" className='mt-3 text-[15px] font-semibold'>Nombre del producto</label>
                        <Field 
                        name='name' 
                        id="name_field"
                        autoComplete="off"
                        placeholder="Super hamburguesa"
                        className='px-3 h-[56px] rounded-3xl w-[250px]  border-2 border-[#fba625] max-[768px]:w-[90%]
                            focus:bg-[#fba625] focus:text-white outline-none focus:w-[400px] transition-all focus:placeholder-white/60'
                        onChange={(e)=>{
                            setValue(e.target.value)
                            setFieldValue('name',e.target.value)
                        }}
                        />
                        <ErrorMessage component="p" className='text-red-400 text-sm' name='name' />

                        <label htmlFor="price_field" className='mt-3 text-[15px] font-semibold'>Precio del producto</label>
                        <Field 
                        name='price' 
                        id="price_field"
                        autoComplete="off"
                        placeholder="1000"
                        className='px-3 h-[56px] rounded-3xl w-[250px]  border-2 border-[#fba625] max-[768px]:w-[90%] max-[768px]:w-[90%]
                            focus:bg-[#fba625] focus:text-white outline-none focus:w-[400px] transition-all focus:placeholder-white/60'
                        onChange={(e)=>{
                            setValue(e.target.value)
                            setFieldValue('price',e.target.value)
                        }}
                        />
                        <ErrorMessage component="p" className='text-red-400 text-sm' name='price' />
                        
                        
                        <label htmlFor="category_field" className='mt-3 text-[15px] font-semibold'>Categoria del producto</label>
                        <Field 
                        name='filter' 
                        id="category_field"
                        autoComplete="off"
                        placeholder="Bebida, Hamburguesa, Ensalada"
                        className='px-3 h-[56px] rounded-3xl w-[250px]  border-2 border-[#fba625]  max-[768px]:w-[90%]
                            focus:bg-[#fba625] focus:text-white outline-none focus:w-[400px] transition-all focus:placeholder-white/60'
                        onChange={(e)=>{
                            setValue(e.target.value)
                            setFieldValue('filter',e.target.value)
                        }}
                        />
                        <ErrorMessage component="p" className='text-red-400 text-sm' name='filter'/>

                        <label htmlFor="description_field" className='mt-3 text-[15px] font-semibold'>Descripcion del producto</label>
                        <Field 
                        name='description' 
                        component="textarea"
                        id="description_field"
                        data-autoresize
                        rows="2"
                        autoComplete="off"
                        placeholder="Hamburguesa doble con queso cheddar"
                        className='px-3 py-[12px] rounded-3xl w-[400px]  border-2 border-[#fba625] resize-none box-border overflow-y-hidden max-[768px]:w-[90%]
                            focus:bg-[#fba625] focus:text-white outline-none  transition-all focus:placeholder-white/60'
                        onChange={(e)=>{
                            setValue(e.target.value)
                            setFieldValue('description',e.target.value)
                        }}
                        />
                        <ErrorMessage component="p" className='text-red-400 text-sm' name='description'/>
                        
                        <button
                        type='submit' 
                        className='px-[20px] py-[7px] border-2 border-[#fba625] rounded-2xl hover:bg-[#fba625] my-[15px] font-semibold
                            hover:text-white hover:cursor-pointer text-center
                            focus:text-white focus:cursor-pointer focus:bg-[#fba625] outline-none
                            '
                        disabled={!value}
                        >
                            {isSubmitting ? (
                                <AiOutlineLoading3Quarters className='animate-spin h-5 w5'/>
                                ) : 'Añadir'}
                        </button>
                    </Form>
                )}
                    
                </Formik>
        </div>
    );
};

export default AddProductForm;