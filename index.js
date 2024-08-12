const express = require ("express");
const modeloUsuario = require("./backend/models/user.model");
const productos = require("./backend/models/productos");
const clientes = require("./backend/models/clientes");

require("dotenv").config();
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

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
    let actualizacion = await modeloUsuario.findOneUpdate({_id:req.params.ref},usuarioEditado);
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




app.get("/productos/", async (req, res) => {
    const consulta = await productos.find({});
    res.send(consulta)
    
})






app.get("/clientes", async (req, res) => {
    const consulta = await clientes.find({});
    res.send(consulta)
    
})

const emailService = require("./backend/utils/emails.service");
app.get('/enviarcorreo',  async (req, res) => {
    await emailService.sendEmail(
        'fv29961125@gmail.com',
        "Confirmación de Registro",
        "Bienvenido a la tienda en línea más top de todo el mundo",
    );
    })


app.listen(process.env.PORT)

