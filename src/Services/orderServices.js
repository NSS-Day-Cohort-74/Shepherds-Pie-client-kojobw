
export const postNewOrder = async (newOrder) => {
    const postOptions =  await fetch(`http://localhost:8088/orders`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newOrder)
    })
    const data = await postOptions.json()
    return data   
    }

export const getOrderByOrderId = (orderId) => {

    return fetch (`http://localhost:8088/orders?id=${orderId}&_expand=customer`).then(res => res.json())
}
export const deleteOrder = (orderId) => {
    return fetch (`http://localhost:8088/orders/${orderId}`, {
        method: "DELETE"
    }).then((res) => res.json())
}



export const getOrders = () => {
    return fetch ("http://localhost:8088/orders?_expand=customer").then((response)=>response.json())
}


export const getOrdersAndTheirPizzas = () => {
    return fetch ("http://localhost:8088/orders?_expand=").then((response)=>response.json())
}

