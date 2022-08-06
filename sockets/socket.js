const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band')
const bands = new Bands();
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Héroes del silencio'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Da paw'));
bands.addBand(new Band('Maquina camaleon'));

console.table(bands.getBands())


io.on("connection", (client) => {
    console.log("Client connected");


    client.emit('active-bands', bands.getBands());

    client.on("disconnect", () => {
        console.log("cliente disconnected");
    });

    client.on('mensaje', (payload) => {
        console.log(payload)
        io.emit('mensajes', {admin: 'Nuevo mensaje'})
    });

    client.on('emitir-mensaje', (payload) => {
        console.log(payload)
        //emite a todos..!!
        //io.emit('nuevo-mensaje',payload)
        client.broadcast.emit('nuevo-mensaje', payload)
    });

    client.on('votos', (payload) => {
        console.log(payload)
        bands.voteBand(payload.id)
        io.emit('active-bands', bands.getBands());

    });

    client.on('save', (payload) => {
        console.log(payload)
        const newBand= new Band(payload.name);
        bands.addBand(newBand)
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete',(payload)=>{
        console.log(payload)
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    })



});