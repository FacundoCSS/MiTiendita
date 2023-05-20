import React from 'react';
import { useNavigate} from 'react-router-dom';

import {useAuth} from '../context/AuthContext.js'

const Logout = () => {

    const navigate = useNavigate()
    const {logout} = useAuth()

    return (
        <div className='bg-[#fe8405] w-[100vw] h-[90vh] pt-[10vh]'>
            <div className='m-auto w-[40vw] h-[30vh] bg-white rounded-3xl shadow-lg shadow-black/40 flex flex-col items-center justify-around'>
                <div className='text-[20px] font-semibold'>
                    ¿Estas seguro que quieres cerrar sesión?
                </div>
                <div className="flex items-center justify-around font-semibold w-[60%]">
                    <button 
                    className='bg-red-700 text-white rounded-2xl p-[10px] hover:bg-red-900'
                    onClick={()=>{
                        logout()
                        navigate('/')
                    }}
                    >
                        Cerrar sesión
                    </button>
                    <button 
                    className='bg-neutral-200 rounded-2xl p-[10px] hover:bg-neutral-400'
                    onClick={()=>navigate('/myprofile')}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;