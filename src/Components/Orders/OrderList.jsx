
import { Link } from "react-router-dom"

import { useEffect, useState } from "react"
import { Order } from "./Order"
import "./OrderList.css"
import { getOrders } from "../../Services/orderServices"




export const OrdersList = () =>{
    const [ orders,setOrders]=useState([])
    const [ sortedOrders, setSortedOrders]=useState([])
    const [selectedDate, setSelectedDate]=useState("") //set as a string to capture date string from input event
    const [filteredOrders, setFilteredOrders] = useState([])

    useEffect(()=>{
        getOrders().then((ordersArray)=>{
            setOrders(ordersArray)
        })

    },[])
    //creating a copy of array when sorting the copy instead of original array
    useEffect(()=>{
        const sorted=[...orders].sort((a,b)=>new Date(b.dateTime)-new Date(a.dateTime));// Sort the orders by dateTime (newest first)
        setSortedOrders(sorted)
    },[orders])

    useEffect(() => {
        if (!selectedDate || !sortedOrders){
            //defaults to sortedOrders if no date is selected. 
            setFilteredOrders(sortedOrders)
            return
        }
        const foundOrders = orders.filter(order => {
            const orderDate = new Date(order.dateTime)
            const filterDate = new Date(selectedDate) //creates the entry in UTC not local time.
            //Normalizes the order dates for comparison (want to look at apples to apples)
            orderDate.setHours(0,0,0,0)
            //adjust filterDate to local midnight
            filterDate.setHours(filterDate.getHours() + filterDate.getTimezoneOffset() / 60,0,0,0)
    
            //Only return orders that have the same year, month, day
            return (
                orderDate.getFullYear() === filterDate.getFullYear() &&
                orderDate.getMonth() === filterDate.getMonth() &&
                orderDate.getDate() === filterDate.getDate()
            )
        }
        )
        setFilteredOrders(foundOrders)
    },[orders, selectedDate])


    const handleDateChange = (event) => {
        const inputDate = (event.target.value)
        setSelectedDate(inputDate)
    }
    
    const handleShowAllOrders = (event) => {
        event.preventDefault()
        setFilteredOrders(sortedOrders)
    }


    return (
    <>
        <div className="orders">
            <h2> Orders</h2>
            <div>
                <label htmlFor="date">Filter by Selecting a Date:</label>
                <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
                <button className="btn-container btn-primary" onClick={handleShowAllOrders}>View All Orders</button>
            </div>

            {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                    <Link to={`/orders/${order.id}`} key={order.id}>
                        <Order order={order} />
                    </Link>
                ))
            ) : (
                <p>No orders found for the selected date.</p>
            )}



        </div>
    </>
    )
}