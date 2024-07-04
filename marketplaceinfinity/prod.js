const responseImg = document.querySelector('#responseImg')
const responseName = document.querySelector('#responseName')
const responseDescription = document.querySelector('#responseDescription')
const responsePrice = document.querySelector('#responsePrice')
const buy = document.querySelector('#buy')

const id = localStorage.getItem("idSelectProduct")

async function getProduct(){
    const response = await fetch (`https://fakestoreapi.com/products/${id}`)
    const data = await response.json()

    responseName.textContent = data.title
    responseDescription.textContent = data.description
    responseImg.src = data.image
    responsePrice.textContent = `R$: ${data.price.toFixed(2)}`
   


    const priceForm = data.price.toFixed(2)
    responsePrice.textContent = `R$: ${priceForm}`

}

getProduct();

buy.addEventListener("click", async()=>{
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    const data = await response.json()

    const cartList = JSON.parse(localStorage.getItem("cartList")) || []

    if(cartList.length > 0){
        let found = false
        cartList.forEach((item)=>{
            if(item.id === data.id){
                found = true
                item.quantity += 1
            }
        })
        if(!found){
            const product = {
                id: data.id,
                title: data.title,
                image: data.image,
                price: data.price,
                quantity: 1
            }
            cartList.push(product)
        }else{
            cartList.push(product)
        }
    }
    localStorage.setItem("cartList", JSON.stringify(cartList))
    alert("Item added to cart!")
})

