
const {io}=require('../index');


io.on("connection", (client) => {
    console.log("Client connected");
  
    client.on("disconnect", () => {
      console.log("cliente disconnected");
    });
  
    client.on('mensaje',(payload)=>{
      console.log(payload)
      io.emit('mensajes',{admin:'Nuevo mensaje'})
    });
  
  
  });