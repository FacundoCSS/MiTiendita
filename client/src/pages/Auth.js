
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Signin from '../components/Signin'
import Signup from '../components/Signup'


const Auth = () => {
    
    const [state, setState] = useState('register')

    const onHandleNavClick = (e) => {
        setState(e.target.id)
    }


    return (
        <div className='w-[100vw] h-[100vh] flex flex-col'>
           <header>
                <ul className='w-[100vw] h-[10vh] flex items-center justify-around bg-black text-[#fba625]'>
                    <li>
                        <Link
                        to="/funcionalidades"
                        >Funcionalidades
                        </Link>
                    </li>
                    <li>
                        <Link
                        to="/precios"
                        >Precios
                        </Link>
                    </li>
                    <li className='px-[10px] py-[7px] border-2 border-[#fba625] rounded-2xl hover:bg-[#fba625] hover:text-white'>
                        <Link
                        to="/signin"
                        >Iniciar sesion
                        </Link>
                    </li>
                    <li className='px-[10px] py-[7px] border-2 border-[#fba625] rounded-2xl hover:bg-[#fba625] hover:text-white'>
                        <Link
                        to="/signup"
                        >Probalo Gratis
                        </Link>
                    </li>
                </ul>
            </header>
            <div className='w-[100vw] h-[90vh] flex flex-col items-center justify-center'>
                <div className="bg-black text-white rounded-xl h-[80vh] w-[600px]">
                    <div className="h-[80%]">
                            {state === 'login' && <Signin />}
                            {state === 'register' && <Signup />}
                    </div>
                    <div className="flex items-center justify-center ">
                        {
                            state === 'login' 
                                ? <div
                                className='px-2 py-1 mx-2 my-3 text-[15px]'
                                >   
                                    ¿No tienes una cuenta? 
                                    <div 
                                    id="register" 
                                    onClick={onHandleNavClick}
                                    className="text-sky-600 hover:cursor-pointer inline"
                                    > Registrate
                                    </div>
                                </div>
                                : <div
                                className='px-2 py-1 mx-2 my-3 text-[15px]'
                                >
                                    ¿Ya tienes una cuenta? 
                                    <div 
                                    id="login" 
                                    onClick={onHandleNavClick}
                                    className="text-sky-600 hover:cursor-pointer inline"
                                    > Inicia Sesión
                                    </div>
                                </div>
                        }
                        


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;