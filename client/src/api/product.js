import axios from 'axios'

export const getProductRequest = async (id)=> await axios.get(`/product/${id}`)
export const getProductsRequest = async (id)=> await axios.get(`/products/${id}`)
export const addProductRequest = async (product)=>{
    const form = new FormData()
    for (let key in product){
        form.append(key, product[key])}
    return await axios.post('/new', form,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}  
export const updateProductRequest = async (id, product)=>await axios.put(`/product/${id}`, product,{
    headers: {
        "Content-Type": "multipart/form-data"
    }
})
export const deleteProductRequest = async (id)=> await axios.delete(`/product/${id}`)

