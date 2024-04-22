const socket = io()
let product

let submitButton=document.getElementById("submitButton");

submitButton.onclick = () => {
    socket.emit('newProduct',{title:title.value,description:description.value,
            code:code.value,price:price.value,stock:stock.value,category:category.value,
                    thumbnails:thumbnails.value})
}
socket.on('newItem', data => {
    let log = document.getElementById('items')
    let products=''
    data.forEach(product => {
        products += `<div class="card">
                        <li>Title:${product.title}</li><br>
                        <li>Description: ${product.description}</li><br>
                        <li>Code:${product.code}</li><br>
                        <li>Price:${product.price}</li><br>
                        <li>Stock:${product.stock}</li><br>
                        <li>Category:${product.category}</li>
                        <br><li>Thumbnails:${product.thumbnails}</li><br>
                    </div>`
        })
        log.innerHTML = products
    })
