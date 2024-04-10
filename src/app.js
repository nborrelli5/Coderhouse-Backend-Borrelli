import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import { __dirname } from './utils.js'

const app = express()

// MIDDLEWARE //
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))

app.use('/api/products',productsRouter)
app.use('/api/carts',cartRouter)

// MIDDLEWARE ERRORS//
app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
})

// LISTENER //
app.listen(8080, error => {
    if(error) console.log(error)

    console.log('Listening port:8080')
})