import {useState, useEffect} from "react"
import { getAllPizzas, getAllPizzaToppings } from "../../Services/pizzaServices"
import { Pizza } from "./Pizza"
import "./pizza.css"
import { useNavigate } from "react-router-dom"

export const PizzaList = ({orderId}) => {
    const [allPizzas, setAllPizzas] = useState([])
    const [allToppings, setAllToppings] = useState([])
    const [filteredPizzas, setFilteredPizzas] = useState([])
    const [totalCost, setTotalCost] = useState()
    const navigate = useNavigate()

    const getAndSetAllPizzas = async () => {
        // getAllPizzas().then((pizzasArray) => {
        //     setAllPizzas(pizzasArray)
        // })
        // getAllToppings().then((toppingsArray) => {
        //             setAllToppings(toppingsArray)
        //         })
        const toppingsArray = await getAllPizzaToppings();
        setAllToppings(toppingsArray);
        const pizzasArray = await getAllPizzas();
        setAllPizzas(pizzasArray);


    }
    
    useEffect(() => {
        getAndSetAllPizzas()
    },[])

    useEffect(() => {
        const foundPizzas = allPizzas.filter((pizza) => pizza.order.id === Number(orderId))
        setFilteredPizzas(foundPizzas)

        const foundPizzaCostArray = foundPizzas.map(pizza => pizza.size.cost)
        const foundPizzaToppingsArray = allToppings.filter((topping) => {
            const toppingIsOnPizzaInOrder = foundPizzas.find(pizza => pizza.id === topping.pizzaId)
            return toppingIsOnPizzaInOrder 
        })

        const totalCost = foundPizzaCostArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0 ) + (foundPizzaToppingsArray.length*.5)
        const formatCurrency = (amount, locale = 'en-US', currency = 'USD') =>
            new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currency,
            }).format(amount)

        setTotalCost(formatCurrency(totalCost))

    },[allPizzas])
   
    

    const handleAddNewPizza = (event) => {
        navigate(`addpizzaform`)
    } 

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
             <div>
                <h3>Total Order Cost: {totalCost}</h3>
            </div>
            </article>
           
            <div>
                <button className="btn-info" onClick={handleAddNewPizza}>Add Pizza to Order</button>
            </div>
        
        </div>
    </>
}