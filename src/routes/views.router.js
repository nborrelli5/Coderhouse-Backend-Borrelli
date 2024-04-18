import { Router } from 'express'
import productsRouter from './products.router.js'

const router = Router()

// console.log(productsRouter);

router.get('/', (req, res)=>{
    res.render('home',{
        styles: 'homeStyles.css' 
    })
})
export default router