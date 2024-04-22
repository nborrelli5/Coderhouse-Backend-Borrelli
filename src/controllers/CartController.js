import fs from 'fs';

export default class CartManager{  

    constructor(path){
        this.path=path;        
    }

//READ FILE//
    readFile = async () => {
        try{
            const dataJSON  = await fs.promises.readFile(this.path,'utf-8');
            return JSON.parse(dataJSON);
            
        }catch(error){
            return [];
        }
    }

//GET PRODUCTS//            
    getCarts = async () => {
        try {
            return await this.readFile()
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).send("An error occurred while fetching products");
        }
    }

//GET PRODUCT BY ID//                        
    getCartById = async (cid) => {
        try {
            const cartsDb = await this.readFile()
            const cart = cartsDb.find(c=>c.id===parseInt(cid))

            if(!cart) 
                return 'Incorrect ID, cart does not exists.';

            return cart

        } catch (error) {
            console.error("Error fetching cart by ID:", error);
            res.status(500).send("An error occurred while fetching cart by ID");
        }
    }

    //CREATE CART//
    addCart = async (cart) => {
        try{
            const cartsDb = await this.readFile()

            if (cartsDb.length===0) {
                cart.id = 1
            }else{
                cart.id = cartsDb[cartsDb.length -1].id + 1
            }

            const addCart={id:cart.id,...cart}

            cartsDb.push(addCart)
            await fs.promises.writeFile(this.path,JSON.stringify(cartsDb,null, '\t'),'utf-8')
            console.log(`Cart with ID:${cart.id} was successfully created`);
            return cartsDb[cart.id-1]

        }catch(error){
            console.error("Error creating new cart:", error);
            res.status(500).send("An error occurred while adding products");
        };    
    }    
    
    // ADD TO CART //
    addToCart = async (cid,pid) => {
        try {       
            const cartsDb = await this.readFile()    
            const cartIndex = cartsDb.findIndex(c=>c.id===parseInt(cid))
            if(cartIndex===-1){ 
                console.log('Incorrect ID, cart does not exists.');
                return 'Incorrect ID, cart does not exists.';
            }
            
            const existingProduct = cartsDb[cartIndex].products.some((prod) => prod.productId ===parseInt(pid))
            const productIndex = cartsDb.findIndex(p=>p.id===parseInt(pid))
            console.log(productIndex);

                if (existingProduct) {

                    cartsDb[cartIndex].products[productIndex]={...cartsDb[cartIndex].products[productIndex],quantity:cartsDb[cartIndex].products[productIndex].quantity+=1}                
                
                }else{

                const addProduct = {productId:parseInt(pid), quantity:1}
                cartsDb[cartIndex].products.push(addProduct)
            }
        
            await fs.promises.writeFile(this.path,JSON.stringify(cartsDb,null, '\t'),'utf-8')
            
            console.log(`Product ID:${pid} was successfully added Cart ID:${cid}`);
            return cartsDb[cartIndex].products[productIndex]

        }catch(error){
            console.error("Error adding products to cart:", error);
            res.status(500).send("An error occurred while adding products");
        };    
    }    
}
