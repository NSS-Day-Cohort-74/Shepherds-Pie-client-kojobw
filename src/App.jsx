import "./App.css";
import { Routes, Route} from "react-router-dom"
import { Login } from "./Components/auth/Login"
import { Register } from "./Components/auth/Register"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"

export const App = () => {
  return (
  <Routes> 
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register />}/>

    <Route path="/*" element={
      <Authorized>
        <ApplicationViews />
      </Authorized>
    } />
  </Routes>
  )
}
