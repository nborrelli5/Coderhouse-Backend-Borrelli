// const socket = io()
// let product

// Swal.fire({
//     title:'Creating New Product',
//     text:'Insert Title of the Product',
//     input:'text',
//     inputValidator: value => {
//         return !value
//     },
//     allowOutsideClick:false
// })
// .then(result => {
//     product = result.value
// })

//     let description = document.querySelector ('#description')
//     description.addEventListener('keyup', evt => {
//     if (evt.key === 'Enter'){
//         if(description.value.trim().length > 0){
//             socket.emit('description',{product, description:description.value})
//             description.value=''
//         }
//     }
// })

//     socket.on('newItem', data => {
//     let log = document.getElementById('items')

//     let products = ''
//     data.forEach(product => {
//         products += `<li>Product:${product.product}<br> Description: ${product.description}</li><br>`
//     })
//     log.innerHTML = products
//     })
