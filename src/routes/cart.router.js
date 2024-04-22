import {Router} from 'express'
import CartManager from '../controllers/CartController.js'

const router = Router()

const path = 'carts.json'

const carts = new CartManager(path)

// GET PRODUCTS //
router.get('/', async (req,res)=> {
    const limit = req.query.limit
    
    const response = await carts.getCarts()
    
    const getCarts = response.slice(0,limit)
    
    res.send(getCarts)
})

// GET PRODUCT BY ID //
router.get('/:cid', async (req, res) => {
    const {cid} = req.params;
    const response = await carts.getCartById(cid);
    res.send(response)
})

//CREATE CART //
router.post('/',async (req, res) => {
    // const { title, description, price, thumbnail,code,stock} = req.body;
    const newCart=req.body
    // if(!title || !price || !code || !stock) return res.send({status: 'error', error: 'Missing mandatory fields'})

    /** 
     * @param {array} products 
     */

    const response = await carts.addCart(newCart);

    res.send({ status: 'Success', payload: response })
})

// ADD TO CART //
    router.post('/:cid/product/:pid',async (req, res) => {
        const {cid,pid} = req.params;

    /** 
     * @param {number} product
     * @param {number} quantity
     */

    const response = await carts.addToCart(cid,pid);

    res.send({ status: 'Success', payload: response })
})


export default router;