import "./OrderList.css"

export const Order=({order})=>{
    return(
        <div className="order">
            <h2>Order #{order.id}</h2>
            <div className="order-info">Customer Name: {order.customer.name}</div>
            <div className="order-info"> Order Status: {order.status}</div>

        </div>
    )
}