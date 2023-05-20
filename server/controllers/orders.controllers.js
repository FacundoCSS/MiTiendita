import Order from "../models/Order.js";


export const getOrder = async ( req, res ) => {
    try {
        const order = await Order.findById(req.params.id)
        if(!order) return res.sendStatus(404)
        return res.json(order)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getOrders = async ( req, res ) => {
    try {
        const orderId = req.params.id;
        const orders = await (await Order.find({"shop_id": orderId})).reverse();

        return res.json({
            status: true,
            orders
        })
    
    } catch (error) {
        console.log(error)
    }
}

export const addOrder = async ( req , res ) => {
    try {
        const {name, surname, adress, email, phone_number, products, shop_id} = req.body

        const newOrder = new Order({
            adress,
            name,
            surname,
            email, 
            phone_number, 
            products,
            shop_id,
        })
    
        newOrder.save()

        res.json({
            order: newOrder,
            message: "Orden realizada con exito"
        })

     } catch (error) {
        res.status(500).json({message: error.message})
     }
}


export const updateOrder = async ( req, res ) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(updatedOrder)

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const cancelOrder= async ( req , res ) => {
    try{
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.sendStatus(404);
        res.sendStatus(204);
    }catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
      }
}