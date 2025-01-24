import { useParams } from "react-router-dom";
import { PizzaList } from "./PizzaList";
import "./OrderDetails.css"
// get orders and expand with customers

import { useEffect, useState } from "react";
import { deleteOrder, getOrderByOrderId, updateOrderStatus } from "../../Services/orderServices";
import { getAllUsers } from "../../Services/userService";
import { Link } from "react-router-dom";
import { deletePizza, getPizzas } from "../../Services/pizzaServices";
import { changeStatus } from "../../Services/employeeService";

export const OrderDetails = () => {
    const { orderId } = useParams()
    const [order, setOrder] = useState([])
    const [pizza, setPizza] = useState([])
    const [available, setAvailable] = useState({})
    const [users, setUsers] = useState([])
    const [isVisible, setIsVisible] = useState(false);
    const [selectedDriverId, setSelectedDriverId] = useState(0)
    const [currentPizza, setCurrentPizzas] =useState([])
    const [hideBtn, setHideBtn] = useState(false)

    console.log(orderId)
    useEffect(() => {
        getPizzas().then(pizzaArray => {
            setPizza(pizzaArray)
        })
    }, [])

    useEffect(() => {
        getOrderByOrderId(parseInt(orderId)).then(data => {
            const orderObj = data[0]
            setOrder(orderObj)
            console.log(order)
        })
    }, [])

    useEffect(() => {
        if(order.status === "Out For Delivery"){
            setHideBtn(true)
        } else {
            setHideBtn(false)
        }
    }, [order])

    useEffect(() => {
        getAllUsers().then(userArray => {
            setUsers(userArray)
        })
        setAvailable(users)
    }, [])

    useEffect(() => {
        const availableDrivers = users.filter(user => user.isAvailable === true)
        setAvailable(availableDrivers)
    }, [users])

    const getDriver = (event) => {
        event.preventDefault()
        const findUser = users.find(user => user.id == event.target.value)
        changeStatus(findUser)
        
        const copyOrder = {...order}
        copyOrder.status = "Out For Delivery"
        updateOrderStatus(copyOrder)

        setHideBtn(true)
    }

    useEffect(() => {
        const pizzasOnOrder = pizza.filter(pizza => pizza.orderId == order.id)
        setCurrentPizzas(pizzasOnOrder)
    },[pizza])

    const cancelOrder = () => {
        deleteOrder(order.id)
        currentPizza.map((pizza) => {
            deletePizza(pizza.id)
        })
        
    }

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
                        <strong>Customer Info</strong>
                        <div className="customer-info">
                            <div><strong>Name:</strong> {order.customer?.name}</div>
                            <div><strong>Email:</strong> {order.customer?.phoneNumber}</div>
                            <div><strong>Address:</strong> {order.customer?.address}</div>
                        </div>
                    </div>
                  
                    {order.isDelivery && !hideBtn && (
                        
                        <div>
                            <button 
                            className="btn-driver"
                            onClick={() => { setIsVisible(true) }}>Available Drivers</button>
                            {isVisible && (
                                <div>
                                <select  id="drivers" onChange={getDriver}>
                                    <option value="">Prompt to select resource...</option>
                                    {available.map((user) => {
                                        return (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                        )
                                    })}
                                </select>
                                </div>
                            )}
                        </div>
                       
                    )}
                    
                    <PizzaList orderId={orderId} />
                    <div>
                    <Link to={'/orders'}><button className="btn-cancel" onClick={cancelOrder}>Cancel Order</button></Link>
                    </div>
                </>
            )}
        </div>
    )
};

