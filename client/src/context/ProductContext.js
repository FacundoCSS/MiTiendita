import {useState, useContext, createContext} from 'react';
import { getProductRequest, getProductsRequest, addProductRequest, deleteProductRequest, updateProductRequest} from '../api/product';

const context = createContext()

export const useProduct = ()=>{
    const newContext = useContext(context)
    return newContext
}

const ProductProvider = ({children})=>{

    const [products, setProducts] = useState([])

    const getProduct = async(id)=>{
        const res = await getProductRequest(id)
        return res.data
    }

    const getProducts = async (id)=>{
        const res = await getProductsRequest(id)
        return res.data.products
    }

    const addProduct = async (data)=>{
        try {
            const res = await addProductRequest(data)
            setProducts([...products, res.data])
        } catch (error) {
            Promise.reject(error)
        }
    }

    const deleteProduct = async (id)=>{
        try{
            const res = await deleteProductRequest(id)
            if(res.status === 204){
                setProducts(products.filter((product)=> product._id !== id));
            }
        }
        catch(error){
            Promise.reject(error)
        }
    }


    const updateProduct = async(id, data)=>{
        try {
            const res = await updateProductRequest(id, data)
            setProducts(products.map((product) => product._id === id ? res.data : product));
        } catch (error) {
            Promise.reject(error)
        }
    }


    return (
        <context.Provider value={{
            getProduct,
            getProducts,
            addProduct,
            deleteProduct,
            updateProduct,
        }}>
            {children}
        </context.Provider>
    );
}

export default ProductProvider