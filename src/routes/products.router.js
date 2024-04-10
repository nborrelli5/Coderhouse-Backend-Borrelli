import {Router} from 'express'
import ProductManager from '../managers/ProductManager.js'

const router = Router()

const path = 'products.json'

const products = new ProductManager(path)

// GET PRODUCTS //
router.get('/', async (req,res)=> {
    const limit = req.query.limit

    const response = await products.getProducts()

    const getProducts = response.slice(0,limit)

    res.send(getProducts)
})

// GET PRODUCT BY ID //
router.get('/:pid', async (req, res) => {
    const {pid} = req.params;
    const response = await products.getProductById(pid);
    res.send(response)
})

//CREATE PRODUCT //
router.post('/',async (req, res) => {
    // const { title, description, price, thumbnail,code,stock} = req.body;
    const newProduct=req.body
    // if(!title || !price || !code || !stock) return res.send({status: 'error', error: 'Missing mandatory fields'})

    /** 
     * @param {string} title 
     * @param {string} description 
     * @param {string} code 
     * @param {number} price 
     * @param {boolean} status 
     * @param {number} stock
     * @param {string} category
     * @param {array} thumbnail 
     */

    const response = await products.addProducts(newProduct);

    res.send({ status: 'Success', payload: response })
})

// UPDATE PRODUCT //
    router.put('/:pid', async (req, res) => {
        const {pid} = req.params;
        const prodUpdate = req.body;

        const response = await products.updateProduct(pid,prodUpdate);

//     const productIndex = products.findIndex(product => product.id === parseInt(pid));
//     if( productIndex === -1 ) return res.status(404).send({status: 'error', error: 'ID NOT FOUND'});

//     products[productIndex] = { id: parseInt(pid),  ...prodUpdate }

        res.send({status: 'Success', payload: response})

})

// DELETE PRODUCT //
    router.delete('/:pid', async (req, res) => {
        const { pid } = req.params;

        const response = await products.deleteProduct(pid);

        res.send({status: 'Success', payload:response})
        // res.status(500).send("An error occurred while deleting products");
        // res.status(404).send({status: 'error', error: 'Incorrect ID, product does not exists.'})

    })
export default router