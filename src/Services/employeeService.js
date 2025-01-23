export const getOrders = () => {
    return fetch ("http://localhost:8088/orders?_expand=customer").then((response)=>response.json())
}