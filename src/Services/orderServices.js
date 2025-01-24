export const getOrderByOrderId = (orderId) => {
    return fetch (`http://localhost:8088/orders?id=${orderId}&_expand=customer`).then(res => res.json())
}
export const deleteOrder = (orderId) => {
    return fetch (`http://localhost:8088/orders/${orderId}`, {
        method: "DELETE"
    }).then((res) => res.json())
}
