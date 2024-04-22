import express from 'express'
import productsRouter   from './routes/products.router.js'
import cartRouter       from './routes/cart.router.js'
import viewsRouter      from './routes/views.router.js'
import { __dirname } from './utils.js'
import {uploader} from './multer.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import { productSocket } from './utils/productSocket.js'

const app = express()
const PORT = process.env.PORT || 8080
// LISTENER //
const httpServer = app.listen(8080, error => {
    if(error) console.log(error)

    console.log('Listening port:8080')
})

const io = new Server(httpServer)

        //LLAMAR A MANAGER
        // function chatSocket(io){
        //     return (req,res,next)=>{
        //         req.io=io
        //         next()
        //     }

        //     chatSocket(io)}

// MIDDLEWARE //
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))


app.set('views', __dirname+'/views')
app.set('view engine', 'hbs')

app.use('/', viewsRouter)
app.use('/api/products',productsRouter)
app.use('/api/carts',cartRouter)

//MW products//
app.use(productSocket(io))
// UPLOADER //
app.use('/upload-file', uploader.single('myFile') ,(req, res) => {
    if (!req.file) {
        return res.send('ERROR uploading file')        
    }

    res.send('file uploaded')
})
// MIDDLEWARE ERRORS//
app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
})  
        
            //toda esta parte se debe convertir a POST
            let products = []
        
            io.on('connection',socket =>{
                console.log('Client Connected');

                socket.on('newProduct',data=>{
                    products.push(data)
                    io.emit('newItem', products)
                })
            })       