import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        url: String,
        public_id: String
    },
    description: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    available: {
        type: Boolean,
        default: true
    },
    filter: {
        type: String
    }
})

export default mongoose.model('Product', productSchema)