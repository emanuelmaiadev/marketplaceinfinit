const catalog = document.querySelector('#catalog')
const qtycart = document.querySelector('#qtycart')

const cartList = JSON.parse(localStorage.getItem('cardList')) || []
qtycart.textContent = cartList.length

async function getAllItems(){
    const response = await fetch ('https://fakestoreapi.com/products')
    const data = await response.json();

    data.forEach((product)=>{
        product.quantity = 1
        const newElement = document.createElement('div')
        newElement.id = product.id
        newElement.classList.add('card')

        newElement.addEventListener("click", (e)=>{
            if(e.target.id !== 'buyButton'){
                window.location.href = "./prod.html"
                localStorage.setItem('idSelectProduct', e.target.parentElement.id)
                newElement.classList.add('clicked')
            }
        })
        
        const prodName = document.createElement('h3')
        prodName.textContent = product.title

        const image = document.createElement('img')
        image.src = product.image

        const price = document.createElement('p')
        price.textContent = "R$: " + product.price

        const btn = document.createElement('button')
        btn.textContent = "Buy"
        btn.id = "buyButton"

        btn.addEventListener("click", ()=>{
            const cartList = JSON.parse(localStorage.getItem("cartList")) || []

            let found = false
            cartList.forEach((item)=>{
                if (item.id === product.id){
                    found = true
                    item.quantity +=1
                }
            })
            if (!found){
                cartList.push(product);
            }

            localStorage.setItem('cartList', JSON.stringify(cartList))
            qtycart.textContent = cartList.length
            alert("Added item")
        })
        newElement.append(prodName, image, price, btn)
        catalog.append(newElement)
    })
}

getAllItems();