import { useState, useEffect } from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import { NavBar } from "../Components/NavBar/NavBar"
import { Welcome } from "../Components/Welcome/Welcome"
import { OrdersList } from "../Components/Orders/OrderList"
import { OrderDetails } from "../Components/Orders/OrderDetails"
import { NewOrderForm } from "../Components/Forms/NewOrderForm"
import { EmployeeList } from "../Components/Employees/EmployeeList"
import { SalesReport } from "../Components/SalesReports/SalesReports"
import { EditEmployeeForm } from "../Components/Forms/EditEmployeeForm"
import { NewPizzaForm } from "../Components/Forms/NewPizzaForm"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localPizzaUser = localStorage.getItem("pizza_user")
    const pizzaUserObj = JSON.parse(localPizzaUser)
    setCurrentUser(pizzaUserObj)
  },[])
 
  return (
  <Routes> 
    <Route 
      path="/"
      element={
        <>
          <NavBar />
          <Outlet />
        </>
      }
    >
        <Route index element={<Welcome />}/>
        <Route path="orders"> 
          <Route index element={<OrdersList />}/> 
          <Route path=":orderId" element={<OrderDetails/>} />
          <Route path=":orderId/addpizzaform" element={<NewPizzaForm />}/>
        </Route>
        <Route path="neworders" element={<NewOrderForm currentUser={currentUser}/>} />
        <Route path="employees">
          <Route index element={<EmployeeList />} />
          <Route path=":userId" element={<EditEmployeeForm />} />
        </Route> 
        <Route path="salesreports" element={<SalesReport />} />
        
      </Route>
  </Routes>

)
}
