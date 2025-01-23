import { useParams } from "react-router-dom"

export const NewPizzaForm = () => {
    const {orderId} = useParams()

    return <>New Pizza for Order #{orderId}</>
}