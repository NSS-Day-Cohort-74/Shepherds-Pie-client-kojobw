
import { Link } from "react-router-dom"
import { getOrders } from "../../Services/employeeService"
import { useEffect, useState } from "react"
import { Order } from "./Order"
import "./OrderList.css"




export const OrdersList = () =>{
    const [ orders,setOrders]=useState([])
    const [ sortedOrders, setSortedOrders]=useState([])
    const [selectedDate, setSelectedDate]=useState(null)

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