import { useState, useEffect } from "react"
import { getToppingsByPizzaId, getPizzaById, deletePizza } from "../../Services/pizzaServices"


export const Pizza = ({pizzaObj, getAndSetAllPizzas}) => {
    const [toppings, setAllToppings] = useState()
    const [pizza, setPizza] = useState() 
    
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
        deletePizza(pizzaObj.id).then(() => {
            getAndSetAllPizzas()
        })
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
                <button className="btn-secondary">Edit Pizza</button>
            </footer>
        </section>
    </>
    
}