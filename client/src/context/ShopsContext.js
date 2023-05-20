import {useState, useContext, createContext} from 'react';
import { getShopRequest, deleteShopRequest, updateShopRequest, getShopByNameRequest} from '../api/shop';

const context = createContext()

export const useShop = ()=>{
    const newContext = useContext(context)
    return newContext
}

const ShopProvider = ({children})=>{

    const [shop, setShop] = useState([])

    const getShop = async(id)=>{
        const res = await getShopRequest(id)
        return res.data
    }

    const getShopByName = async (id) => {
        const res = await getShopByNameRequest(id)
        return res.data[0]
    }

    const deleteShop = async (id)=>{
        try{
            const res = await deleteShopRequest(id)
            if(res.status === 204){
                setShop(shop.filter((shop)=> shop._id !== id));
            }
        }
        catch(error){
            Promise.reject(error)
        }
    }


    const updateShop = async(id, data)=>{
        try {
            const res = await updateShopRequest(id, data)
            setShop(shop.map((shop) => shop._id === id ? res.data : shop));
        } catch (error) {
            Promise.reject(error)
        }
    }


    return (
        <context.Provider value={{
            getShop,
            getShopByName,
            deleteShop,
            updateShop,
        }}>
            {children}
        </context.Provider>
    );
}

export default ShopProvider