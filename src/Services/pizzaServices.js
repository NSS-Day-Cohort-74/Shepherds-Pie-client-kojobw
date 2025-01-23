export const getAllPizzas = () => {
    return fetch(`http://localhost:8088/pizzas?_expand=size&_expand=cheese&_expand=sauce&_expand=order&_embed=pizzatoppings`).then(res => res.json())
}

export const getToppingsByPizzaId = (pizzaId) => {
    return fetch (`http://localhost:8088/pizzaToppings?pizzaId=${pizzaId}&_expand=topping`).then(res => res.json())
}
export const getPizzaById = (pizzaId) => {
    return fetch (`http://localhost:8088/pizzas/${pizzaId}?_expand=size&_expand=cheese&_expand=sauce&_expand=order`).then(res => res.json())
}

export const deletePizza = (pizzaId) => {
    return fetch (`http://localhost:8088/pizzas/${pizzaId}`, {
        method: "DELETE"
    }).then((res) => res.json())
}

export const getAllSizes = () => {
    return fetch (`http://localhost:8088/sizes`).then(res => res.json())
}
export const getAllSauces = () => {
    return fetch (`http://localhost:8088/sauces`).then(res => res.json())
}

export const getAllCheeses = () => {
    return fetch (`http://localhost:8088/cheeses`).then(res => res.json())
}

export const getAllToppings = () => {
    return fetch (`http://localhost:8088/toppings`).then(res => res.json())
}