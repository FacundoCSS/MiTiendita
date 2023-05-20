import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwtDecode from 'jwt-decode';

function handleResponse({ shop, token }) {
  localStorage.setItem('token', token);
  setAuthToken(token);
  return { shop, token };
}

const getToken = ()=> {
    return localStorage.getItem('token');
}

const getShop = async (id)=>{

  try {
    const res = await axios.get(`/shop/${id}`)
    return res.data

  } catch (error) {
    console.log(error)
    return Promise.reject(error);
  } 

}

const loadShopRequest = async ()=>{
  const token = getToken()

  if (!token) {
    return Promise.resolve({ shop: null });
  }
  
  setAuthToken(token);

  const decoded = jwtDecode(token);

  const res = await getShop(decoded.id)
  return res

}

const registerShopRequest = async (shopData)=>{
  const form = new FormData()

  try {
      for (let key in shopData){
        form.append(key, shopData[key])}

      const res = await axios.post('/signup', form,{
        headers: {
            "Content-Type": "multipart/form-data"
          }
      })
      console.log(form)
      console.log(res.data)
      return handleResponse(res.data)
      

  } catch (error) {
    return Promise.reject(error);
  }

}

const loginShopRequest = async (shopData)=>{
  const form = new FormData()

  try {
      for (let key in shopData){
        form.append(key, shopData[key])}
      const res = await axios.post('/signin', form,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
      })
      return handleResponse(res.data)

  } catch (error) {
    return Promise.reject(error);
  }


}

const logoutRequest = async()=>{
  try {
    const res = await axios.post('/logout',{
      headers: {
          "Content-Type": "multipart/form-data"
      }
    })
    console.log(res.data)
    return handleResponse(res.data)

  } catch (error) {
    console.log(error)
    return Promise.reject(error);
  }
}

export {getToken, loadShopRequest, registerShopRequest, loginShopRequest, logoutRequest, getShop}