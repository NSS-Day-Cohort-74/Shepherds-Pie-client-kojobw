import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar=()=>{
    const navigate=useNavigate()
    return <ul className="navbar">
        <li className="navbar-item">
            <Link to="/orders">Orders</Link>
        </li>
        <li className="navbar-item">
             <Link to="/neworders">New Orders</Link>
        </li>
        <li className="navbar-item">
             <Link to="/employees">Employees</Link>
        </li>
        <li className="navbar-item">
             <Link to="/salesreports">Sales Reports</Link> 
        </li>
        
        {localStorage.getItem("pizza_user") ? (
        <li className="navbar-item navbar-logout">
            <Link
                className="navbar-link"
                 to=""
                 onClick={() => {
                 localStorage.removeItem("pizza_user")
                 navigate("/", { replace: true })
                 }}
            >
            Logout
            </Link>
        </li>
        ) : (
            ""
        )}

    </ul>
}