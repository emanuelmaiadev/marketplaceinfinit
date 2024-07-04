const cartList = JSON.parse(localStorage.getItem("cartList")) || []
const cart = document.querySelector('#cart')
const total = document.querySelector('#total')

let totalPrice = 0

cartList.forEach((product)=>{
    const newElement = document.createElement("div")
    newElement.classList.add("cartItem")
    newElement.id = product.id
    newElement.addEventListener("click", (e)=>{
        if(e.target.id !== "buy"){
            window.location.href = "./prod.html"
            localStorage.setItem("idSelectProduct", e.target.parentElement.id)
        }
    })
    const name = document.createElement('h2')
    name.textContent = product.title

    const image = document.createElement('img')
    image.src  = product.image
    image.width = 100

    const price = document.createElement('p')
    price.textContent = "R$: " + product.price

    const quantity = document.createElement('p')
    quantity.textContent = "items: " + product.quantity

    totalPrice += product.price * product.quantity

    newElement.append(image, name, quantity, price)

    cart.append(newElement)
})

total.textContent = totalPrice.toFixed(2)

const endShop = document.querySelector("#endShop")
endShop.addEventListener("click", ()=>{
    alert("Order completed sucessfully! Thanks for shopping with us.")
    localStorage.clear()
    window.location.href = "./index.html"
})