
import { Link } from "react-router-dom"

import { useEffect, useState } from "react"
import { Order } from "./Order"
import "./OrderList.css"
import { getOrders } from "../../Services/orderServices"




export const OrdersList = () =>{
    const [ orders,setOrders]=useState([])
    const [ sortedOrders, setSortedOrders]=useState([])
    const [selectedDate, setSelectedDate]=useState(() => {
        const today = new Date()
        return today.toISOString().split("T")[0]
    }) //set as a string to capture date string from input event
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



    return (
    <>
        <div className="orders">
            <h2> Orders</h2>
         
           
            {sortedOrders.map((order)=>{
                return(
                    
                    <Link to={`/orders/${order.id}`} key={(order.id)}>
                        <Order order={order}/>
                    </Link>
                )
            })}



        </div>
    </>
    )
}