import { useParams } from "react-router-dom";
import { PizzaList } from "./PizzaList";

export const OrderDetails = () => {
    const { orderId } = useParams()
    
    console.log(orderId)
    return <>Order Details
        <div>
        <PizzaList orderId={orderId}/>
        </div>
        
    </>
};
