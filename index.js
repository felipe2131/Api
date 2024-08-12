const express = require ("express");
const modeloUsuario = require("./backend/models/user.model");
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
    

app.listen(process.env.PORT)

