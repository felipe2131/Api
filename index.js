const express = require ("express");
const modeloUsuario = require("./backend/models/user.model");
const productos = require("./backend/models/productos");
const clientes = require("./backend/models/clientes");

require("dotenv").config();
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());





//usuario-------------------------------------------------------------------------------------------------
app.get("/conectar", async (req, res) => {
    const consulta = await modeloUsuario.find({});
    res.send(consulta)
    
})

app.post("/crear", async (req, res) => {
    const nuevoUsuario ={
        correo: req.body.correo,
        pass: req.body.password,
        rol: req.body.rol,
        habilitado: true,
    }
    let Insercion = await modeloUsuario.create(nuevoUsuario);
    if(Insercion)
        res.status(200).send("Insercion exitosa")
    else
        res.status(404).send("Insercion fallida")
})


app.put("/editar/:ref", async (req, res) => {
    const usuarioEditado ={
        correo: req.body.correo,
        pass: req.body.password,
        rol: req.body.rol,
        habilitado: true,
    }
    let actualizacion = await modeloUsuario.findOneAndUpdate({_id:req.params.ref},usuarioEditado);
    if(actualizacion)
        res.status(200).send("Actualizacion exitosa")
    else
        res.status(404).send("Actualizacion fallida")
    })
    
app.delete("/borrar/:ref", async (req, res) => {
    let borrar = await modeloUsuario.findOneAndDelete({_id:req.params.ref});
    if(borrar)
        res.status(200).send("Borrado exitoso")
    else
        res.status(404).send("Borrado fallido") 
    });
//usuario-------------------------------------------------------------------------------------------------



//productos-----------------------------------------------------------------------------------------------
app.get("/productos/", async (req, res) => {
    const consulta = await productos.find({});
    res.send(consulta)
    
})
app.post("/crearproducto", async (req, res) => {
    const nuevoProducto ={
        referencia: req.body.referencia,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        imagen: req.body.imagen,
        stock: req.body.stock,
        habilitado: true,
    }
    let Insercion = await productos.create(nuevoProducto);
    if(Insercion)
        res.status(200).send("Insercion exitosa")
    else
        res.status(404).send("Insercion fallida")
})


app.put("/editarproducto/:ref", async (req, res) => {
    const productoEditado ={
        referencia: req.body.referencia,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        imagen: req.body.imagen,
        stock: req.body.stock,
        habilitado: true,
    }
    let actualizacion = await productos.findOneAndUpdate({_id:req.params.ref},productoEditado);
    if(actualizacion)
        res.status(200).send("Actualizacion exitosa")
    else
        res.status(404).send("Actualizacion fallida")
    })
    
app.delete("/borrarproducto/:ref", async (req, res) => {
    let borrar = await productos.findOneAndDelete({_id:req.params.ref});
    if(borrar)
        res.status(200).send("Borrado exitoso")
    else
        res.status(404).send("Borrado fallido") 
    });
//productos-------------------------------------------------------------------------------------------------




//clientes--------------------------------------------------------------------------------------------------
app.get("/clientes/", async (req, res) => {
    const consulta = await clientes.find({});
    res.send(consulta)
    
})
app.post("/crearcliente", async (req, res) => {
    const nuevoCliente ={
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        habilitado: true,
        usuario: req.body.usuario
    }
    let Insercion = await productos.create(nuevoCliente);
    if(Insercion)
        res.status(200).send("Insercion exitosa")
    else
        res.status(404).send("Insercion fallida")
})


app.put("/editarcliente/:ref", async (req, res) => {
    const clienteEditado ={
        referencia: req.body.referencia,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        imagen: req.body.imagen,
        stock: req.body.stock,
        habilitado: true,
    }
    let actualizacion = await productos.findOneAndUpdate({_id:req.params.ref},clienteEditado);
    if(actualizacion)
        res.status(200).send("Actualizacion exitosa")
    else
        res.status(404).send("Actualizacion fallida")
    })
    
app.delete("/borrarcliente/:ref", async (req, res) => {
    let borrar = await clientes.findOneAndDelete({_id:req.params.ref});
    if(borrar)
        res.status(200).send("Borrado exitoso")
    else
        res.status(404).send("Borrado fallido") 
    });
//clientes------------------------------------------------------------------------------------------------








//correo -----------------------------------------------------------------------------------------
const emailService = require("./backend/utils/emails.service");
app.get('/enviarcorreo',  async (req, res) => {
    await emailService.sendEmail(
        'fv29961125@gmail.com',
        "Confirmación de Registro",
        "Bienvenido a la tienda en línea más top de todo el mundo",
    );
    })


app.listen(process.env.PORT)

