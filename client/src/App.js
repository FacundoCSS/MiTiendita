import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { PublicRoute } from './components/PublicRoute'
import {Toaster} from 'react-hot-toast'

import Home from './pages/Home.js'
import Shop from './pages/Shop.js'
import Signup from './pages/Signup.js';
import Signin from './pages/Signin.js';
import MyProfile from './pages/MyProfile.js'
import Logout from './pages/Logout.js'
import OrderStatus from './pages/OrderStatus.js'

import AuthProvider from './context/AuthContext';
import ProductProvider from './context/ProductContext';
import ShopProvider from './context/ShopsContext';
import OrderProvider from './context/OrderContext';
import Order from './pages/Order';

function App() {
  return (
    <div className='h-full overflow-x-hidden'>
      <div className='flex w-full min-h-screen'>
        <AuthProvider>
          <ProductProvider>
            <ShopProvider>
              <OrderProvider>
                <Routes>
                  <Route path='/:name' element={<Shop/>} />
                  <Route path='/:id/status' element={<OrderStatus/>} />
                  <Route path='/:name/order' element={<Order/>} />
                  <Route path='/' element={<Home/>}/>
                  <Route path="/signin" element={
                    <PublicRoute>
                      <Signin/>
                    /</PublicRoute>
                  }/>
                  <Route path="/signup" element={
                    <PublicRoute>
                      <Signup/>
                    </PublicRoute>
                  }/>
                  <Route path="/shop/:id" element={<Shop/>}/>
                  <Route 
                  path='/myprofile' 
                  element={
                    <PrivateRoute>
                      <MyProfile/>
                    </PrivateRoute>
                    }
                  />
                  <Route 
                  path='/logout' 
                  element={
                    <PrivateRoute>
                      <Logout/>
                    </PrivateRoute>
                    }
                  />
                </Routes>
                <Toaster/>
              </OrderProvider>
            </ShopProvider>
          </ProductProvider>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
