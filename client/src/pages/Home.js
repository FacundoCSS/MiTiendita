import React from 'react';
import { Link } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { PublicRoute } from '../components/PublicRoute'

import { useAuth } from '../context/AuthContext.js'

const Home = () => {

    const {auth} = useAuth().state

    return (
        <div className='w-[100vw] h-[100vh] flex flex-col bg-[#fba625]'>
            <img
            className='fixed top-[45vh] w-[811px] z-10'
            src='https://www.e2msolutions.com/wp-content/uploads/2021/10/e-commerce-copywriting-img.png'
            />
            <img
            className='fixed top-[30vh] w-[320px] left-[70vw] z-10'
            src='https://webpuppies.com.sg/wp-content/uploads/2020/05/Group-3.png'
            />
            {
                auth 
                ? 
                <PrivateRoute>
                    <div className='w-[100vw] absolute top-[10vh] h-[90vh] flex flex-col items-center text-white py-[50px] z-20'>
                        <h1 className='text-[77px] font-bold'>
                            Mi tiendita
                        </h1>
                        <h2 className='text-[45px] font-bold my-[7px] w-[550px] text-black text-center'>
                            Crea tu catalogo online de la forma mas sencilla
                        </h2>
                        <div>
                            <div className='px-[25px] py-[7px] my-[2px] text-[20px] border-2 border-white rounded-2xl hover:bg-white hover:text-black'>
                            <Link
                            to="/myprofile"
                            >Ir a tu tiendita
                            </Link>
                            </div>
                        </div>
                    </div>
                </PrivateRoute>
                :
                <PublicRoute>
                    <div className='w-[100vw] h-[90vh] flex flex-col items-center justify-center'>
                        <h1 className='text-[60px] font-bold'>
                            Mi tiendita
                        </h1>
                        <div>
                            <div className='px-[25px] py-[7px] border-2 border-[#fba625] rounded-2xl hover:bg-[#fba625] hover:text-white'>
                            <Link
                            to="/signup"
                            >Probalo Gratis
                            </Link>
                            </div>
                        </div>
                    </div>
                </PublicRoute>
            }
        </div>
    );
};

export default Home;