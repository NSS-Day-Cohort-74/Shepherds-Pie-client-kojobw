import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState,} from "react"
import { createPizza, createPizzaToppingEntry, getAllCheeses, getAllSauces, getAllSizes, getAllToppings } from "../../Services/pizzaServices"

export const NewPizzaForm = () => {
    const [pizza, setPizza] = useState()
    const [sizes, setSizes] = useState()
    const [sauces, setSauces] = useState()
    const [cheeses, setCheeses] = useState()
    const [toppings, setToppings] = useState()
    const [selectedToppings, setSelectedToppings] = useState([])
    const [hasChanged, setHasChanged] = useState(false)
    const {orderId} = useParams()
    const navigate = useNavigate()

    const getAndSetOptions = () => {
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
        const pizzaObj = {
            sizeId: 0,
            cheeseId: 0,
            sauceId: 0,
            orderId: Number(orderId)
        }
        setPizza(pizzaObj)
    }
    useEffect(() => {
        getAndSetOptions()
    },[])

    const handleToppingChange = (event) => {
        const foundTopping = selectedToppings.find(selectedTopping => {
            return selectedTopping.toppingId === Number(event.target.id)
        })
        if(foundTopping){
            console.log(foundTopping)
            const newCurrentTopping = selectedToppings.filter(selectedTopping => {
                return selectedTopping.toppingId !== foundTopping.toppingId
            })
            setSelectedToppings(newCurrentTopping)
        }else{
            const newTopping ={
                toppingId:Number(event.target.id)
            }
            const addedToppings = [...selectedToppings, newTopping]
            setSelectedToppings(addedToppings)
        }
       
    }

    const handleSave =(event) => {
        event.preventDefault()
        if (selectedToppings && selectedToppings.length > 0){
            createPizzaToppingEntry(selectedToppings)
        }
        if (!pizza.sizeId || !pizza.cheeseId || !pizza.sauceId){
            window.alert("Please ensure that a size, cheese and sauce are selected.")
        }else{
            const newPizza = {
                sizeId: pizza.sizeId,
                cheeseId: pizza.cheeseId,
                sauceId:  pizza.sauceId,
                orderId: pizza.orderId
            }
            createPizza(newPizza)
            navigate(`/orders/${orderId}`) 
        }       
    }
 
    
    if (!sizes || !sauces || !cheeses || !toppings) {return null}
    const updatedCost = () => {
        let totalCost = 0
        const sizeCost = sizes.find(size => size.id === pizza.sizeId)
        if (sizeCost) {
            totalCost = sizeCost.cost + (selectedToppings.length*.5)
        }
        return totalCost
    } 
    const formatCurrency = (amount, locale = 'en-US', currency = 'USD') =>
        new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(amount)

    return <>
        <form>
            <h2>New Pizza for Order #{orderId}</h2>
            <fieldset>
                <div className="form-group">
                    <label>Size:</label>
                    <select id="sizes" 
                        onChange={(event) => {
                            const copy ={...pizza}
                            copy.sizeId = Number(event.target.value)
                            setPizza(copy)
                    }}>
                        <option value="">Please Select Size</option>
                        {sizes.map(size => {
                            return (<option value={size.id} key={size.id}>{size.size}</option>)
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                        <label>Sauces:</label>
                        <select id="sauces" 
                            onChange={(event) => {
                                const copy ={...pizza}
                                copy.sauceId = Number(event.target.value)
                                setPizza(copy)
                        }}>
                            <option value="">Please Select Sauce</option>
                            {sauces.map(sauce => {
                                return (<option value={sauce.id} key={sauce.id}>{sauce.name}</option>)
                            })}
                        </select>
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                        <label>Cheeses:</label>
                        <select id="cheeses" 
                            onChange={(event) => {
                                const copy ={...pizza}
                                copy.cheeseId = Number(event.target.value)
                                setPizza(copy)
                        }}>
                            <option value="">Please Select Cheese</option>
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
                                onChange={handleToppingChange}
                            />{topping.name}
                            </div>)
                        })}
                    </div>
            </fieldset>
            <fieldset>
                <div>Updated Cost: {formatCurrency(updatedCost())}</div>
            </fieldset>
            <fieldset>
                <button className="btn-info" onClick={handleSave}>Add Pizza</button>
            </fieldset>
        </form>
    </>
}

