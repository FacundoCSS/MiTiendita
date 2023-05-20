import axios from 'axios'

export const getOrderRequest = async (id)=> await axios.get(`/order/${id}`)
export const getOrdersRequest = async (id)=> await axios.get(`/orders/${id}`)
export const addOrderRequest = async (order)=>{
    return await axios.post('/order', order)

}  
export const updateOrderRequest = async (id, data) => await axios.put(`/order/${id}`, data)
export const deleteOrderRequest = async (id)=> await axios.delete(`/order/${id}`)
