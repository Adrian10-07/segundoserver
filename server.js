
const express = require("express")
const app = express()
const routes = require("./src/routes/long.js")

app.use("/short",routes)







app.listen(3000,()=>{
    console.log("escuchando en el puerto 3000");
})
