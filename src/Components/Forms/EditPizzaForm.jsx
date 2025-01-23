import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState,} from "react"
import { createPizzaToppingEntry, deletePizzaToppingsByPizzaId, getAllCheeses, getAllSauces, getAllSizes, getAllToppings, getPizzaById, getToppingsByPizzaId, updatePizzaByPizzaId } from "../../Services/pizzaServices"

export const EditPizzaForm = () => {
    const [pizza, setPizza] = useState()
    const [sizes, setSizes] = useState()
    const [sauces, setSauces] = useState()
    const [cheeses, setCheeses] = useState()
    const [toppings, setToppings] = useState()
    const [currentPizzaToppings, setCurrentPizzaToppings] = useState()
    const {pizzaId} = useParams()
    const navigate = useNavigate()
    
 
    const getAndSetPizza = () => {
        getPizzaById(Number(pizzaId)).then(pizzaData => {
            setPizza(pizzaData)
        })
        getAllSizes().then(sizesArray => {
            setSizes(sizesArray)
        })
        getAllSauces().then(saucesArray => {
            setSauces(saucesArray)
        })
        getAllCheeses().then(cheeseArray => {
            setCheeses(cheeseArray)
        })
        getAllToppings().then(toppingsArray => {
            setToppings(toppingsArray)
        })
        getToppingsByPizzaId(Number(pizzaId)).then(toppingsArray => {
            setCurrentPizzaToppings(toppingsArray)
        })
    }
    
    useEffect(() => {
        getAndSetPizza()
    },[])

    const handleToppingChange = (event) => {
        const foundTopping = currentPizzaToppings.find(currentPizzaTopping => {
            return currentPizzaTopping.toppingId === Number(event.target.id)
        })
        if(foundTopping){
            console.log(foundTopping)
            const newCurrentToppings = currentPizzaToppings.filter(currentPizzaTopping => {
                return currentPizzaTopping.toppingId !== foundTopping.toppingId
            })
            setCurrentPizzaToppings(newCurrentToppings)
        }else{
            const newTopping = {
                pizzaId: pizza.id,
                toppingId: Number(event.target.id)
            }
            const newCurrentToppings = [...currentPizzaToppings,newTopping]
            setCurrentPizzaToppings(newCurrentToppings)
        }
        
    }

    const handleSave = (event) => {
        event.preventDefault()
        const updatedPizza = {
            id: pizza.id,
            sizeId: pizza.sizeId,
            cheeseId: pizza.cheeseId,
            sauceId:  pizza.sauceId,
            orderId: pizza.orderId
        }
        updatePizzaByPizzaId(updatedPizza)
        deletePizzaToppingsByPizzaId(pizza)
        createPizzaToppingEntry(currentPizzaToppings)
        navigate(`/orders/${pizza.order.id}`)
        
    }
    
    if (!pizza || !sizes || !sauces || !cheeses || !toppings ||!currentPizzaToppings) {return null}
    const updatedCost = () => {
        let totalCost = 0
        const sizeCost = sizes.find(size => size.id === pizza.sizeId)
        if (sizeCost) {
            totalCost = sizeCost.cost + (currentPizzaToppings.length*.5)
        }
        return totalCost
    } 

    return <>
        <form className="form">
            <h2>Edit Pizza for Order #{pizza.order.id}</h2>
            <fieldset>
                <div className="form-group">
                    <label>Size:</label>
                    <select id="sizes" defaultValue={pizza.size.id} 
                        onChange={(event) => {
                            const copy ={...pizza}
                            copy.sizeId = Number(event.target.value)
                            setPizza(copy)
                    }}>
                        {sizes.map(size => {
                            return (<option value={size.id} key={size.id}>{size.size}</option>)
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                        <label>Sauces:</label>
                        <select id="sauces" defaultValue={pizza.sauce.id} 
                            onChange={(event) => {
                                const copy ={...pizza}
                                copy.sauceId = Number(event.target.value)
                                setPizza(copy)
                        }}>
                            {sauces.map(sauce => {
                                return (<option value={sauce.id} key={sauce.id}>{sauce.name}</option>)
                            })}
                        </select>
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                        <label>Cheeses:</label>
                        <select id="cheeses" defaultValue={pizza.cheese.id} 
                            onChange={(event) => {
                                const copy ={...pizza}
                                copy.cheeseId = Number(event.target.value)
                                setPizza(copy)
                        }}>
                            {cheeses.map(cheese => {
                                return (<option value={cheese.id} key={cheese.id}>{cheese.name}</option>)
                            })}
                        </select>
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                        <label>Toppings:</label>
                        {toppings.map(topping => {
                           return( <div key={topping.id}>
                                <input
                                type="checkbox"
                                id={topping.id}
                                defaultChecked={currentPizzaToppings.find(currentTopping => 
                                     currentTopping.toppingId === topping.id
                                )}
                                onChange={handleToppingChange}
                            />{topping.name}
                            </div>)
                        })}
                    </div>
            </fieldset>
            <fieldset>
                <div>Updated Cost: ${updatedCost()}</div>
            </fieldset>
            <fieldset>
                <button className="btn-info" onClick={handleSave}>Save Changes</button>
            </fieldset>
        </form>
    </>
}