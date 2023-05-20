
import { Navigate, Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.js'

export const PublicRoute = ({children}) => {
   
  const {auth} = useAuth().state

  return (auth)
    ? <Navigate to="/myprofile" /> 
    : <div>
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
     <div>
       {children}
     </div>
   </div>
    
}