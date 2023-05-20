import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const shopSchema = new Schema({
    shopname: {
        type: String,
        required: true,
        unique: true
    },
    shop: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    image : {
        url: String,
        public_id: String
    },
    cover : {
        url: String,
        public_id: String
    },
    description: {
        type: String,
    },
    adress: {
        type: String,
    },
    schedules_1: {
        type: String,
    },
    schedules_2: {
        type: String,
    }

})

shopSchema.methods.encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password , salt);
}

shopSchema.methods.confirmPassword = function(password) {
    return bcrypt.compareSync(password , this.password);
}

export default model('Shop' , shopSchema);