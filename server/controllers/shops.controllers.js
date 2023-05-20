import Shop from "../models/Shop.js"
import Product from "../models/Product.js"
import jwt from "jsonwebtoken";
import {uploadCover, uploadImage, deleteImage} from '../libs/cloudinary.js'
import fse from 'fs-extra';

import dotenv from "dotenv";
dotenv.config()

export const signup = async ( req , res ) => {
   try {
        const {shopname, shop, email, phone_number, password} = req.body;

        const shopNameExist = await Shop.findOne({ shopname: shopname });
        if(shopNameExist) return res.status(500).json({auth: false,message: "This username is already used"})

        const EmailExist = await Shop.findOne({ email: email });
        if(EmailExist) return res.status(500).json({auth: false,message: "This email is already used"})

        const phoneNumberExist = await Shop.findOne({ phone_number: phone_number });
        if(phoneNumberExist) return res.status(500).json({auth: false,message: "This phone number is already used"})



        const newShop = new Shop({
            shopname, 
            shop, 
            email, 
            phone_number, 
            password
        });
        
        newShop.password = await newShop.encryptPassword(password)

        const token = await jwt.sign({ id: newShop._id }, process.env.secret, {
            expiresIn: 60 * 60 * 24 * 365, // expires in 1 year
        });

        await newShop.save()

        return res.json({
            satus: true,
            shop: newShop,
            token,
            message: "Shop registered succesfully"
        })
   } catch (error) {
        return res.status(500).json({message: error.message})
   }
}

export const signin = async ( req , res ) => {
    try {
        const {email, password} = req.body;

        const shop = await Shop.findOne({email: email});
        if(!shop){
            return res.status(500).json({
                auth: false,
                message: "This shop doesn't exist"
            })
        }

        const autenticate = await shop.confirmPassword(password);
        if(!autenticate){
            return  res.status(500).json({
                auth: false,
                message: 'Shop or password incorrect'
            })
        }

        const token = await jwt.sign({ id: shop._id }, process.env.secret, {
            expiresIn: 60 * 60 * 24 * 365, // expires in 1 year
        });
        
        if(!token)  {
            return res.status(500).json({
                auth: false,
                message: 'There was a problem, try it again'
            })
        }

        return res.json({
            auth: true,
            shop,
            token
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const logout = async ( req , res ) => {
    res.status(200).send({ auth: false, token: null, shop: null });
  };

export const updateShop = async ( req , res ) => {
    let image;
    let cover;
    
    if(req.files?.image){
        const result =await uploadImage(req.files.image.tempFilePath)        
        await fse.remove(req.files.image.tempFilePath)
        image = {
            url: result.secure_url,
            public_id: result.public_id
        }
        try {
        const updatedShop = await Shop.findByIdAndUpdate(req.params.id, {image : image}, {new: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
    }

    if(req.files?.cover){
        const result = await uploadCover(req.files.cover.tempFilePath)        
        await fse.remove(req.files.cover.tempFilePath)
        cover = {
            url: result.secure_url,
            public_id: result.public_id
        }
        try {
        const updatedShop = await Shop.findByIdAndUpdate(req.params.id, {cover : cover}, {new: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
    }

    try {
        const updatedShop = await Shop.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(updatedShop)

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const deleteShop = async ( req , res ) => {
    try{
        const shop = await Shop.findByIdAndDelete(req.params.id);

        if (!shop) return res.sendStatus(404);
        
        const products = await Product.find({created_by: req.params.id})
        for (product of products){
            if (product && product.image.public_id) {
                await deleteImage(product.image.public_id);
              }
        }
        

        await Product.deleteMany({created_by: req.params.id})
        res.sendStatus(204);

    }catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
      }
}

export const getShop = async ( req , res ) => {
    try {
        const shop = await Shop.findById(req.params.id)
        if(!shop) return res.sendStatus(404)
        return res.json(shop)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getShopByName = async ( req, res ) => {
    try {
        const shop = await Shop.find({ "shopname" : req.params.name })
        if(!shop) return res.sendStatus(404)
        return res.json(shop)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}