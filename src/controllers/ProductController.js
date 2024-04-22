import fs from 'fs';

export default class ProductManager{   
    
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
    getProducts = async () => {
        try {
            return await this.readFile()
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).send("An error occurred while fetching products");
        }
    }
    
//GET PRODUCT BY ID//                        
    getProductById = async (pid) => {
        try {
            const productsDb = await this.readFile()
            const product = productsDb.find(prod=>prod.id===parseInt(pid))
    
            if(!product) 
                return 'Incorrect ID, product does not exists.';
    
            return product
    
        } catch (error) {
            console.error("Error fetching products by ID:", error);
            res.status(500).send("An error occurred while fetching products by ID");
        }
    }

//ADD PRODUCTS//
    addProducts = async (product) => {
        try{
            const productsDb = await this.readFile()

            const duplicatedCode = productsDb.some((prod) => prod.code === product.code)
            if (duplicatedCode) {
                console.log('Code already exists');
                return 'Code already exists'
            }

            if (productsDb.length===0) {
                product.id = 1
            }else{
                product.id = productsDb[productsDb.length -1].id + 1
            }

            const addProduct={id:product.id,...product}

            productsDb.push(addProduct)
            await fs.promises.writeFile(this.path,JSON.stringify(productsDb,null, '\t'),'utf-8')
            return `Product with ID:${product.id} was successfully created`

        }catch(error){
            console.error("Error adding products:", error);
            // res.status(500).send("An error occurred while adding products");
        };
    }


//UPDATE PRODUCT//
    updateProduct = async (pid,product) => {
        try {
            const productsDb = await this.readFile()
            const productIndex = productsDb.findIndex(prod=>prod.id===parseInt(pid))
            
            if(productIndex===-1){ 
                console.log('Incorrect ID, product does not exists.');
                return 'Incorrect ID, product does not exists.';
            }
            
            productsDb[productIndex]={id:parseInt(pid),...product}
            
            await fs.promises.writeFile(this.path,JSON.stringify(productsDb,null, '\t'),'utf-8')
            
            return `Product with ID:${pid} was successfully UPDATED`

        } catch (error) {
            console.error("Error fetching products:", error);
            // res.status(500).send("An error occurred while fetching products");
        }
    }


//DELETE PRODUCT//  
    deleteProduct = async (pid) => {
        try {
            const productsDb = await this.readFile()
            const productIndex = productsDb.findIndex(prod=>prod.id===parseInt(pid))

            if(productIndex===parseInt(-1)){   
                console.log('Incorrect ID, product does not exists.');
                return 'Incorrect ID, product does not exists.';
            }

            productsDb.splice(productIndex,1)

            await fs.promises.writeFile(this.path,JSON.stringify(productsDb,null, '\t'),'utf-8')
            console.log(`Product with ID:${pid} successfully DELETED`);
            return `Product with ID:${pid} successfully DELETED`
            
        } catch (error) {
            console.error("Error deleting products:", error);            
        }
    }
}