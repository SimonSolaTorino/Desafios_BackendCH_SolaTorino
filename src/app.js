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
    return response.send('mi base de datos para el curso de BACKEND de Coder House')
})

app.get('/products/:pid', (request, response)=>{
    const {pid} = request.params
    const pid_casteado = parseInt(pid, 10)
    if(!isNaN(pid)){
        const producto_selec = control_productos.getProductById(pid_casteado)
        if(producto_selec == 'ERROR 404: Product not found.'){
            return response.send('404 not found')
        }else{
            return response.send(producto_selec)
        }
    }else{
        return response.send('ERROR 400: Bad Request.')
    }

    

})


app.get('/products',(request, response)=>{
    const limit = request.query.limit

    if(!limit){
        return response.send('ERROR 404: Not Found.')
    }else{
        if(isNaN(limit) || (limit> DB.length || limit<1)){
            return response.send("ERROR 400: Bad request.")
        }else{
            const limit_casteado = parseInt(limit, 10)
            const productos_mostrados = limit_casteado ? DB.slice(0, limit_casteado) : DB
            return response.send(productos_mostrados)
        }
    }
})