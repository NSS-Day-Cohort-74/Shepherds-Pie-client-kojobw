import {useState, useEffect} from "react"
import { getAllPizzas } from "../../Services/pizzaServices"
import { Pizza } from "./Pizza"
import "./pizza.css"
import { useNavigate } from "react-router-dom"

export const PizzaList = ({orderId}) => {
    const [allPizzas, setAllPizzas] = useState([])
    const [filteredPizzas, setFilteredPizzas] = useState()
    const navigate = useNavigate()

    const getAndSetAllPizzas = () => {
        getAllPizzas().then((pizzasArray) => {
            setAllPizzas(pizzasArray)
        })
    }
    
    useEffect(() => {
        getAndSetAllPizzas()
    },[])

    console.log(allPizzas)
    console.log(orderId)

    useEffect(() => {
        const foundPizzas = allPizzas.filter((pizza) => pizza.order.id === Number(orderId))
        setFilteredPizzas(foundPizzas)
    },[allPizzas])

    const handleAddNewPizza = (event) => {
        navigate(`addpizzaform`)
    } 

    console.log(filteredPizzas)

    if(!filteredPizzas){return null}
    return <>
        <div className="pizzas-container">
            <h2>Pizza List:</h2>
            <article className="pizzas">
            {
                filteredPizzas.map(pizzaObj => {
                    return (
                        <Pizza pizzaObj={pizzaObj} key={pizzaObj.id} getAndSetAllPizzas={() => getAndSetAllPizzas()}/>
                    )
                })
            }
            </article>
            <div>
                <button className="btn-info" onClick={handleAddNewPizza}>Add Pizza to Order</button>
            </div>
        
        </div>
        


    </>
}