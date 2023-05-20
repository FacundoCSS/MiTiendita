import { Navigate, Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.js'

export const PrivateRoute = ({children}) => {

  const {auth} = useAuth().state

    return (!auth)
    ? <Navigate to="/signin" /> 
    : <div>
        <header>
          <ul className='w-[100vw] h-[10vh] flex items-center text-[15px] justify-around bg-black text-[#fba625] max-[600px]:text-[12px]'>
              <li>
                  <Link
                  to="/myprofile"
                  >Mi Tiendita
                  </Link>
              </li>
              <li>
                  <Link
                  to="/configuraciones"
                  >Configuraciones
                  </Link>
              </li>
              <li className='px-[10px] py-[7px] border-2 border-[#fba625] rounded-2xl hover:bg-[#fba625] hover:text-white'>
                  <Link
                  to="/estadisticas"
                  >Estadisticas
                  </Link>
              </li>
              <li className='px-[10px] py-[7px] border-2 border-[#fba625] rounded-2xl hover:bg-[#fba625] hover:text-white'>
                  <Link
                  to="/logout"
                  >Cerrar sesión
                  </Link>
              </li>
          </ul>
        </header>
      <div>
        {children}
      </div>
      </div>
}