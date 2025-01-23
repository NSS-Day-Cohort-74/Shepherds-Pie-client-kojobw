
import { Link } from "react-router-dom"
import { getEmployees } from "../../Services/employeeService"
import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./EmployeeList.css"




export const EmployeeList = () =>{
    const [ employees,setEmployees]=useState([])
   

    useEffect(()=>{
        getEmployees().then((employeesArray)=>{
            setEmployees(employeesArray)
        })

    },[employees])

    return (
    <>
        <div className="employees">
            <h2> Employees</h2>
         
           
            {employees.map((employee)=>{
                return(
                    
                    <Link to={`/employees/${employee.id}`} key={(employee.id)}>
                        <Employee employee={employee}/>
                    </Link>
                )
            })}



        </div>
    </>
    )
}