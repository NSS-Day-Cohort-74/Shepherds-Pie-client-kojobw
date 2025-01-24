export const getOrderByOrderId = (orderId) => {

    return fetch (`http://localhost:8088/orders?id=${orderId}&_expand=customer`).then(res => res.json())
}


export const getOrders = () => {
    return fetch ("http://localhost:8088/orders?_expand=customer").then((response)=>response.json())
}