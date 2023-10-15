import ProductManager from "./ProductManager.js";
import express from  'express';

/*INSTANCIO LA CLASE */
const control_productos = new ProductManager('./DB/DB.json')
/*CARGO LA  DB*/
control_productos.addProduct("F!NE BEAUTY", "Sabor tropical fruits", 10.99, "imagen_beauty.jpg", "FNBT01", 100)
control_productos.addProduct("F!NE POWER", "Sabor red fruits", 19.99, "imagen_power.jpg", "FNPW02", 50)
control_productos.addProduct("F!NE SMOOTH", "Sabor blueberrys", 14.99, "imagen_smooth.jpg", "FNSM03", 75)
control_productos.addProduct("F!NE PEAK", "Sabor tropical cream", 14.99, "imagen_peak.jpg", "FNPK04", 25)
/*TRAIGO LA DB */
const DB = control_productos.getProducts()
/*CREAMOS EL SERVIDOR */
const app = express()

app.listen(8080, ()=>{console.log("escuchando....")})

app.get('/',(request, response)=>{
    return response.send('hola mundo')
})




app.get('/products',(request, response)=>{
    const limit = parseInt(request.query.limit, 10)

    if(!limit){
        return response.send(DB)
    }else{
        if(isNaN(limit) || (limit> DB.length || limit<1)){
            return response.send("ERROR: El limite de productos no es correcto")
        }else{
            const productos_mostrados = limit ? DB.slice(0, limit) : DB
            return response.send(productos_mostrados)
        }
    }
})