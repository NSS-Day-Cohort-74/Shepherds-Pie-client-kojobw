import { useParams } from "react-router-dom"
import { useEffect, useState,} from "react"
import { getAllCheeses, getAllSauces, getAllSizes, getAllToppings, getPizzaById, getToppingsByPizzaId } from "../../Services/pizzaServices"

export const EditPizzaForm = () => {
    const [pizza, setPizza] = useState()
    const [sizes, setSizes] = useState()
    const [sauces, setSauces] = useState()
    const [cheeses, setCheeses] = useState()
    const [toppings, setToppings] = useState()
    const [currentPizzaToppings, setCurrentPizzaToppings] = useState()
    const [payload, setPayload] = useState()
    const {pizzaId} = useParams()
    
 
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
        //if event.target.id comes through matches any of the toppings in the currentPizzaToppingsArray, if it does match
        //delete from pizzacurrenttoppings ("slice out") 
        //else we need to create and add a new currentPizzaToppings object in array
        const foundTopping = currentPizzaToppings.find(currentTopping => {
            console.log({currentTopping, compareId: Number(event.target.id)});

            return currentTopping.toppingId === Number(event.target.id)
        });
        if (foundTopping){
             const newPizzaToppings = currentPizzaToppings.filter(currentTopping => {
                return currentTopping.toppingId !== foundTopping.id
             });
              console.log(newPizzaToppings)
        }
    }
    
    if (!pizza || !sizes || !sauces || !cheeses || !toppings ||! currentPizzaToppings) {return null}
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
                <button className="btn-info">Save Changes</button>
            </fieldset>
        </form>
    </>
}