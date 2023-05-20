import axios from 'axios'

export const getShopRequest = async (id)=> await axios.get(`/shop/${id}`)
export const getShopByNameRequest = async (id)=> await axios.get(`/${id}`)
export const updateShopRequest = async (id, shop)=>{
    const res = await axios.put(`/shop/${id}`, shop,{
        headers: {
            "Content-Type": "multipart/form-data"
        }})
    return res.data
}
export const deleteShopRequest = async (id)=> await axios.delete(`/shop/${id}`)
