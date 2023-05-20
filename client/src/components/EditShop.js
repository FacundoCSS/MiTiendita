import React, {useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import {Formik, Form, Field} from 'formik'

import {useShop} from '../context/ShopsContext'
import {useAuth} from '../context/AuthContext'

import {AiOutlineLoading3Quarters, AiOutlineShop} from 'react-icons/ai'


const EditShop = () => {
    
    const [value, setValue] = useState('')
    const [state, setState] = useState(false)
    

    const {updateShop} = useShop()
    const {shop} = useAuth().state

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
                initialValues={{
                        shop: shop.shop,
                        phone_number: shop.phone_number,
                        description: shop?.description ? shop.description : "",
                        adress: shop?.adress ? shop.adress : "",
                        schedules_1: shop?.schedules_1 ? shop.schedules_1 : "",
                        schedules_2: shop?.schedules_2 ? shop.schedules_2 : ""
                    }}

                enableReinitialize
                onSubmit={async(values, actions)=>{
                    await updateShop(shop._id, values)
                    navigate(0)
                }}
                >
                    
                {({isSubmitting, handleSubmit, setFieldValue}) => (
                    <Form 
                    className='w-full flex flex-col items-center '
                    onSubmit={handleSubmit}
                    >
                        <h2 className='text-[40px] font-bold'>
                            Edita el perfil de tu tienda
                        </h2>
                        <label 
                              htmlFor="file-1"
                              className='p-[15px] bg-neutral-200 rounded-full text-neutral-500 hover:bg-neutral-300 hover:text-neutral-700 cursor-pointer'
                              >
                        {
                            state
                            ?<div className='resultado'></div>  
                            :
                            shop?.image
                            ?<img src={shop.image.url} class='object-cover h-32 w-32 rounded-full' alt="avatar"></img>
                            : <AiOutlineShop className='h-32 w-32'/>
                        }
                        
                        </label> 
                        
                        <input
                        type="file" 
                        name="image" 
                        className='absolute invisible'
                        id="file-1"
                        onChange={e => {
                            readFile(e.target.files[0])
                            setState(true)
                            setFieldValue('image', e.target.files[0])
                            console.log(e.target.files[0])
                        }}

                        />
                        <label htmlFor="shop_field" className='mt-3 text-[15px] font-semibold'>Nombre de tu tienda</label>
                        <Field 
                        name='shop' 
                        id="shop_field"
                        autoComplete="off"
                        placeholder="Mi Tiendita"
                        className='px-3 h-[56px] rounded-3xl w-[250px]  border-2 border-[#fba625]
                            focus:bg-[#fba625] focus:text-white outline-none focus:w-[400px] transition-all focus:placeholder-white/60'
                        onChange={(e)=>{
                            setValue(e.target.value)
                            setFieldValue('shop',e.target.value)
                        }}
                        />


                        <label htmlFor="phone_number_field" className='mt-3 text-[15px] font-semibold'>Numero de telefono de tu tienda</label>
                        <Field 
                        name='phone_number' 
                        id="phone_number_field"
                        autoComplete="off"
                        placeholder="011 15-2345-6789"
                        className='px-3 h-[56px] rounded-3xl w-[250px]  border-2 border-[#fba625]
                            focus:bg-[#fba625] focus:text-white outline-none focus:w-[400px] transition-all focus:placeholder-white/60'
                        onChange={(e)=>{
                            setValue(e.target.value)
                            setFieldValue('phone_number',e.target.value)
                        }}
                        />
                        
                        <label htmlFor="adress_field" className='mt-3 text-[15px] font-semibold'>Direccion de la tienda</label>
                        <Field 
                        name='adress' 
                        id="adress_field"
                        autoComplete="off"
                        placeholder="Caseros y Alvear"
                        className='px-3 h-[56px] rounded-3xl w-[250px]  border-2 border-[#fba625] 
                            focus:bg-[#fba625] focus:text-white outline-none focus:w-[400px] transition-all focus:placeholder-white/60'
                        onChange={(e)=>{
                            setValue(e.target.value)
                            setFieldValue('adress',e.target.value)
                        }}
                        />

                        <label htmlFor="description_field" className='mt-3 text-[15px] font-semibold'>Descripcion de tu tienda</label>
                        <Field 
                        name='description' 
                        component="textarea"
                        id="description_field"
                        data-autoresize
                        rows="2"
                        autoComplete="off"
                        placeholder="La mejor tiendita del mundo"
                        className='px-3 py-[12px] rounded-3xl w-[400px]  border-2 border-[#fba625] resize-none box-border overflow-y-hidden
                            focus:bg-[#fba625] focus:text-white outline-none  transition-all focus:placeholder-white/60'
                        onChange={(e)=>{
                            setValue(e.target.value)
                            setFieldValue('description',e.target.value)
                        }}
                        />
                        
                        <label htmlFor="schedules_1_field" className='mt-3 text-[15px] font-semibold'>Horarios de entrega a domicilio</label>
                        <Field 
                        name='schedules_1' 
                        id="schedules_1_field"
                        autoComplete="off"
                        placeholder="17:00 a 23:59"
                        className='px-3 h-[56px] rounded-3xl w-[250px]  border-2 border-[#fba625] 
                            focus:bg-[#fba625] focus:text-white outline-none focus:w-[400px] transition-all focus:placeholder-white/60'
                        onChange={(e)=>{
                            setValue(e.target.value)
                            setFieldValue('schedules_1',e.target.value)
                        }}
                        />

                        <label htmlFor="schedules_2_field" className='mt-3 text-[15px] font-semibold'>Horarios para retirar</label>
                        <Field 
                        name='schedules_2' 
                        id="schedules_2_field"
                        autoComplete="off"
                        placeholder="17:00 a 23:59"
                        className='px-3 h-[56px] rounded-3xl w-[250px]  border-2 border-[#fba625] 
                            focus:bg-[#fba625] focus:text-white outline-none focus:w-[400px] transition-all focus:placeholder-white/60'
                        onChange={(e)=>{
                            setValue(e.target.value)
                            setFieldValue('schedules_2',e.target.value)
                        }}
                        />

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
                                ) : 'Añadir cambios'}
                        </button>
                    </Form>
                )}
                    
                </Formik>
        </div>
    );
};

export default EditShop;