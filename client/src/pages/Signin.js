import React from 'react';
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup'
import {Formik, Form, Field, ErrorMessage} from 'formik'

import {useAuth} from '../context/AuthContext.js'

import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import {VscError} from 'react-icons/vsc'

const Signin = () => {

    const {login} = useAuth()
    const navigate = useNavigate()

    const handleError= (message)=>{
        toast(t=>(
            <div className='flex text-white'>
                <div className='w-[20%] h-full flex items-center'>
                    <VscError className='text-white w-8 h-8'/>
                </div>
                <div className='w-[80%]'>
                    <div className='fonte-smibold text-[20px]'>Error</div>
                    <div className='fonte-smibold text-[15px] text-neutral-300'>{message}</div>
                </div>
            </div>
        ), {
            style:{
                background: "#990000",
            }
        })
    }
    return (
        <div className='w-[100vw] h-[100vh] flex flex-col'>
            <div className='w-[100vw] h-[90vh] flex items-center justify-center'>
                <div className="border-2 border-[#fba625] rounded-3xl h-[80vh] w-[600px] flex flex-col items-center justify-center">

                    <Formik
                    initialValues={{}}
                    validationSchema={Yup.object({
                        email: Yup.string().required("El email es obligatorio"),
                        password: Yup.string().required("La contraseña es obligatoria")
                    })}

                    onSubmit={async(values,actions)=>{
                           try {
                            await login(values)
                            actions.setSubmitting(false)
                            navigate('/myprofile')
                           } catch (error) {
                            handleError(error.response.data.message)
                           }
                        }}

                    enableReinitialize
                    >
                    {({ handleSubmit, isSubmitting}) => (
                        <Form 
                        className='w-[400px] flex flex-col items-center h-[100%]'
                        
                        onSubmit={handleSubmit} 
                        >
                            
                            <label htmlFor="email_field" className='mt-3 text-[15px] font-semibold'>Email</label>
                            <Field 
                            name='email' 
                            id="email_field"
                            autoComplete="off"
                            placeholder="mail@gmail.com"
                            className='my-3 px-3 h-[56px] rounded-3xl w-[250px]  border-2 border-[#fba625] 
                                focus:bg-[#fba625] focus:text-white outline-none focus:w-full transition-all focus:placeholder-white/60'
                            />
                            <ErrorMessage component="p" className='text-red-400 text-sm' name='email' />

                            <label htmlFor="password_field" className='mt-3 text-[15px] font-semibold'>Password</label>
                            <Field 
                            name='password' 
                            id="password_field"
                            autoComplete="off"
                            placeholder="Password"
                            type="password"
                            className='my-3 px-3 h-[56px] rounded-3xl w-[250px]  border-2 border-[#fba625] 
                                focus:bg-[#fba625] focus:text-white outline-none focus:w-full transition-all focus:placeholder-white/60'
                            />
                            <ErrorMessage component="p" className='text-red-400 text-sm' name='password' />

                            <button 
                            type='submit' 
                            className='px-[20px] py-[7px] border-2 border-[#fba625] rounded-2xl hover:bg-[#fba625] mt-[15px] font-semibold
                            hover:text-white hover:cursor-pointer text-center
                            focus:text-white focus:cursor-pointer focus:bg-[#fba625] outline-none
                            '
                            disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <AiOutlineLoading3Quarters className='animate-spin h-5 w5'/>
                                    ) : 'Iniciar sesion'}
                            </button>
                        </Form>
                        )}
                    </Formik>

                    <div className="flex items-center justify-center ">
                        <div
                        className='px-2 py-1 mx-2 my-3 text-[15px]'
                        >
                            ¿Todavia no tienes una cuenta? 
                            <Link
                            to="/signup" 
                            className="text-sky-600 hover:cursor-pointer inline"
                            > Registrate
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin;