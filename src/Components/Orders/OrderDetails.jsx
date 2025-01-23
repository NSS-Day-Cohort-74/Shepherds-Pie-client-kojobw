
import { useParams } from "react-router-dom";
import { PizzaList } from "./PizzaList";

// get orders and expand with customers

import { useEffect, useState } from "react";
import { getOrderByOrderId } from "../../Services/orderServices";

export const OrderDetails = () => {
    const { orderId } = useParams()
    const [order, setOrder] = useState({})
    console.log(orderId)
    useEffect(() => {
        getOrderByOrderId(parseInt(orderId)).then(data => {
            const orderObj = data[0]
            setOrder(orderObj)
            console.log(order)
        })
        
    }, [])


    return (
        <div className="order-info">
            {order && (
                <>
                    <div className="info-item">
                        <strong>Order ID:</strong>
                        <span>{order.id}</span>
                    </div>
                    <div className="info-item">
                        <strong>Date & Time Created:</strong>
                        <span>{order.dateTime}</span>
                    </div>
                    <div className="info-item">
                        <strong>Customer Info:</strong>
                        <div className="customer-info">
                            <div><strong>Name:</strong> {order.customer?.name}</div>
                            <div><strong>Email:</strong> {order.customer?.phoneNumber}</div>
                            <div><strong>Address:</strong> {order.customer?.address}</div>
                        </div>
                    </div>
                    <div className="info-item">
                        <strong>Price:</strong>
                        <span>{order.price}</span> {/* Assuming `price` is the field you want to display */}
                    </div>
                    <PizzaList orderId={orderId}/>
                </>
            )}
        </div>
    )
};
