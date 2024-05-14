const customersLIst = document.querySelector('.customers-list')
const foodsSelect = document.querySelector("#foodsSelect")
const orderList = document.querySelector('.orders-list')
const userAdd = document.querySelector('#userAdd')
const usernameInput = document.querySelector('#usernameInput')
const telephoneInput = document.querySelector('#telephoneInput')
const clientId = document.querySelector("#clientId")
const customerName = document.querySelector('.cutomer-name')
const foodsForm = document.querySelector('#foodsForm')
const foodsCount = document.querySelector("#foodsCount")
const orderCount = document.querySelector(".order-count")
const orderName = document.querySelector(".order-name")

function renderUsers() {
    customersLIst.innerHTML = null
    for (const user of users) {
        const li = document.createElement('li')
        const span = document.createElement('span')
        const a = document.createElement('a')
        li.classList.add('customer-item')
        span.classList.add('customer-name')
        a.classList.add('customer-phone')
        a.setAttribute('href', "tel:+" + user.contact)
        span.textContent = user.userName
        a.textContent = user.contact
        li.append(span, a)
        customersLIst.append(li)
        li.addEventListener('click', () => {
            renderOrders(user.userId)
        })
    }
}


function renderFoods() {
    for (const food of foods) {
        // console.log(food)
        const [option] = createElement('option')
        option.textContent = food.foodName
        option.value = food.foodId
        foodsSelect.append(option)
    }
}

function renderOrders(userId) {
    orderList.innerHTML = null
    for (const order of orders) {

        if (!(order.userId == userId)) continue

        const food = foods.find(el => el.foodId == order.foodId)

        const [elLi, elImg, elDiv, elName, elCount] = createElement('li', 'img', 'div', 'span', 'span')
        elLi.classList.add("order-item")
        elName.classList.add('order-name')
        elCount.classList.add("order-count")

        elName.textContent = food.foodName
        elCount.textContent = order.count
        elImg.setAttribute('src', `./img/${food.foodImg}`)

        elDiv.append(elName, elCount)
        elLi.append(elImg, elDiv)
        orderList.append(elLi)
    }
}


userAdd.addEventListener('submit', (event) => {
    event.preventDefault()

    const userName = usernameInput.value.trim()
    const contact = telephoneInput.value.trim()
    console.log(userName)
    console.log(contact)

    if (!userName || userName.length > 30) {
        return alert('Ismni to\'g\'ri kiriting')
    }

    if (!(/998(9[0123456789]|3[3]|7[1]|8[8])[0-9]{7}$/).test(contact)) {
        return alert("Nomerni togri kirit")
    }

    const newUser = {
        userId: users.length ? users[users.length - 1].userId + 1 : 1,
        userName: userName,
        contact: contact
    }

    users.push(newUser)
    userName.textContent = null
    contact.textContent = null
    return renderUsers()
})


renderUsers()


function addOrder(event){
    event.preventDefault()
    const foodId = foodsSelect.value.trim()
    const count = clientId.value.trim()
    const userId = clientId.textContent

    let oreder = orders.find(el => el.foodId == foodId && el.userId == userId)
    if(
        !count ||
        +count > 10 ||
        !userId
    ){
        alert("Notogri zakaz berildi!")
        return
    }

    if(oreder){
        order.count = +count + +order.count
    }else{
        order ={
            foodId,
            userId,
            count
        }

        orders.push(order)
    }
}

