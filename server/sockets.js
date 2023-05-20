
export default (io) => {
    io.on("connection", (socket) => {
        // console.log("nuevo socket connectado:", socket.id);

        // socket.on("client:setup", async ()=>{
        //     console.log("conectado")
        //     socket.emit("server:connected");
        // })

        socket.on("client:getorders", async (id)=>{
            socket.join(id);
            socket.emit("server:connected", id);
        })

        socket.on("client:addorder", async (data) => {
            socket.in(data.order.shop_id).emit("server:addorder", data.order)
        });

        socket.on("client:getorder", async(id)=>{
            socket.join(id);
            socket.emit("server:connected", id);
        })

        socket.on("client:updateorder", async (order)=>{
            socket.in(order._id).emit("server:updateorder", order)
        })
    })
    
}


