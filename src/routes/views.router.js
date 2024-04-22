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

// viewsRouter.route('/').get(async (req, res) => {
//     res.render('home', {
//       products: await req.productsManager.getProducts(),
//       title: 'Tienda | Inicio',
//       stylesheet: '/css/products.css',
//     });
//   });