import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    adress:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone_number:{
        type: String,
        required: true
    },
    shop_id:{
        type: String, 
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    products: {
        type: Array,
        required: true,
    },
    prepared: {
        type: Boolean,
        default: false 
    },
    completed: {
        type: Boolean,
        default: false 
    }
})

export default mongoose.model('Order', orderSchema)