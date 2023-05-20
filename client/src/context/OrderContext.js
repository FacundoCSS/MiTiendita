import {useState, useContext, useEffect, createContext} from 'react';
import { getOrderRequest, getOrdersRequest, addOrderRequest, deleteOrderRequest, updateOrderRequest} from '../api/order';
import io from "socket.io-client";

var socket;

const context = createContext()

export const useOrder = ()=>{
    const newContext = useContext(context)
    return newContext
}

const OrderProvider = ({children})=>{

    const [orders, setOrders] = useState([])
    const [orderedProducts, setOrderedProducts] = useState([])
    const [price, setPrice] = useState(0)
    const [order, setOrder] = useState()

    const addProduct = async (data) => {
        setOrderedProducts([...orderedProducts, data])
        return orderedProducts
    }

    const deleteProduct = async (id)=>{
        try{
            setOrderedProducts(orderedProducts.filter((product)=> product.id !== id));
        }
        catch(error){
            Promise.reject(error)
        }
    }
    const addPrice = async (productPrice)=>{
        setPrice(price + productPrice)
    }

    useEffect(() => {
        try{
            socket = io("http://localhost:4000");

            socket.on("server:connected", (id)=>{
                console.log(id)
            })

            socket.on("server:addorder", (order)=>{
                const newOrders = [order, ...orders]
                setOrders(newOrders)
            })
    
            socket.on("server:updateorder", (order)=>{
                setOrder(order)
            })
    
        }catch(error){
            console.log(error)
        }
      }, []);

      
    const getOrder = async(id)=>{
        const res = await getOrderRequest(id)
        socket.emit("client:getorder", id);
        setOrder(res.data)
        return res.data
    }

    const getOrders = async (id)=>{
        const res = await getOrdersRequest(id)
        socket.emit("client:getorders", id);
        setOrders(res.data.orders)
        return res.data.orders
    }

    const addOrder = async (data)=>{
        try {
            const res = await addOrderRequest(data)
            socket.emit("client:addorder", res.data)
            return res.data
        } catch (error) {
            Promise.reject(error)
        }
    }

    const updateOrder = async (id, data)=>{
        try {
            const res = await updateOrderRequest(id, data)
            setOrders(orders.map((order) => order._id === id ? res.data : order));
            socket.emit("client:updateorder", res.data)
            return res.data
        } catch (error) {
            Promise.reject(error)
        }
    }

    const deleteOrder = async (id)=>{
        try{
            const res = await deleteOrderRequest(id)
            if(res.status === 204){
                setOrders(orders.filter((order)=> order._id !== id));
            }
        }
        catch(error){
            Promise.reject(error)
        }
    }


    return (
        <context.Provider value={{
            order,
            orders,
            price,
            addPrice,
            deleteProduct,
            orderedProducts,
            addProduct,
            getOrder,
            getOrders,
            addOrder,
            updateOrder,
            deleteOrder,
        }}>
            {children}
        </context.Provider>
    );
}

export default OrderProvider