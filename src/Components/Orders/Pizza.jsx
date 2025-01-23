import { useState, useEffect } from "react"
import { getToppingsByPizzaId, getPizzaById, deletePizza } from "../../Services/pizzaServices"
import { useNavigate } from "react-router-dom"



export const Pizza = ({pizzaObj, getAndSetAllPizzas}) => {
    const [toppings, setAllToppings] = useState()
    const [pizza, setPizza] = useState() 
    const navigate = useNavigate()
    
    console.log(pizzaObj.id)
  
    const getAndSetToppings = () => {
        getToppingsByPizzaId(pizzaObj.id).then((toppingsArray) => {
            setAllToppings(toppingsArray)
        })
        getPizzaById(pizzaObj.id).then((pizza) => {
            setPizza(pizza)
        })
    }

    useEffect(() => {
        if(pizzaObj?.id)
        getAndSetToppings()
    },[])

    const handlePizzaDelete = (event) => {
        event.preventDefault()
        deletePizza(pizzaObj.id).then(() => {
            getAndSetAllPizzas()
        })
    }

    const handleEditPizza = (event) => {
        event.preventDefault()
        navigate(`editpizzaform/${pizzaObj.id}`)
    }
    
    if(!pizza){return null}
    let totalPizzaCost = pizza.size.cost + toppings.length*.5
    
    
    if(!toppings) {return null}
    return <>
        <section className="pizza">
            <div className="pizza-info">
                A {pizzaObj.size.size} Pizza with {pizzaObj.sauce.name} Sauce, {pizzaObj.cheese.name}, {
                    toppings.map((topping,index) => topping.topping.name).join(", ")
                }.
            </div>
            <div className="pizza-info">
                <h4>Total Cost: {totalPizzaCost} </h4>
            </div>
            <footer className="btn-container">
                <button className="btn-warning" onClick={handlePizzaDelete}>Remove</button>
                <button className="btn-secondary" onClick={handleEditPizza}>Edit Pizza</button>
            </footer>
        </section>
    </>
    
}