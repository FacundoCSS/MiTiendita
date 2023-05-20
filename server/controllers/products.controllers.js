import {uploadProductImage, deleteImage} from '../libs/cloudinary.js'
import fse from 'fs-extra';
import Product from '../models/Product.js';

export const getProduct = async ( req , res ) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product) return res.sendStatus(404)
        return res.json(product)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getProducts = async ( req , res ) => {
    try {
        const shopId = req.params.id;
        const products = await (await Product.find({"created_by": shopId})).reverse();
    
    
        return res.json({
            status: true,
            products
        })
    
    } catch (error) {
        console.log(error)
    }
}

export const addProduct = async ( req , res ) => {
    console.log(req.body)
    try {
        let image;
    
        if(req.files?.image){
            const result = await uploadProductImage(req.files.image.tempFilePath)        
            await fse.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        
        const {name, price, description} = req.body
    
        const newProduct = new Product({
            name, 
            price, 
            description,
            image,
            created_by: req.shopId
        })
    
        newProduct.save()
        console.log(newProduct)
        res.json({
            status: true,
            message: "Tweeted successfully",
            newProduct
        })
    
     } catch (error) {
        console.log(error)
     }
}

export const updateProduct = async ( req , res ) => {
    let image;
    
    if(req.files?.image){
        const result = await uploadProductImage(req.files.image.tempFilePath)        
        await fse.remove(req.files.image.tempFilePath)
        image = {
            url: result.secure_url,
            public_id: result.public_id
        }
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {image : image}, {new: true})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    if(req?.body){
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
            res.json(updatedProduct)

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}

export const deleteProduct = async ( req , res ) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.sendStatus(404);
        res.sendStatus(204);
    }catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
      }
}