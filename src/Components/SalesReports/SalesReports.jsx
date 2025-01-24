import { useEffect, useState } from "react";
import { getOrders } from "../../Services/orderServices";
import {
  getAllPizzas,
  getAllPizzaToppings,
  getAllSizes,
} from "../../Services/pizzaServices";

export const SalesReport = () => {
  const [orders, setOrders] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [pizzaToppings, setPizzaToppings] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    getOrders().then((ordersArray) => {
      setOrders(ordersArray);
    });
  }, []);

  useEffect(() => {
    getAllPizzas().then((pizzasArray) => {
      setPizzas(pizzasArray);
    });
  }, []);

  useEffect(() => {
    getAllPizzaToppings().then((pizzaToppingsArray) => {
      setPizzaToppings(pizzaToppingsArray);
    });
  }, []);

  useEffect(() => {
    getAllSizes().then((sizesArray) => {
      setSizes(sizesArray);
    });
  }, []);

  const calculateTotalSales = () => {
    let totalSales = 0;

    // Iterate through orders to calculate sales for each pizza
    pizzas.forEach((pizza) => {
      // Get the size cost
      const pizzaSize = sizes.find((size) => size.id === pizza.sizeId);
      let pizzaCost = pizzaSize ? pizzaSize.cost : 0;

      // Get the pizza toppings cost
      const pizzaToppingIds = pizzaToppings.filter(
        (pizzaTopping) => pizzaTopping.pizzaId === pizza.id
      );
      let toppingsCost = pizzaToppingIds.length * 0.5;

      // Check if the order is a delivery (we would need to link the orderId from pizzas to orders)
      const order = orders.find((order) => order.id === pizza.orderId);
      if (order && order.isDelivery) {
        pizzaCost += 5;
      }

      // Calculate the total for this pizza and add to the total sales
      totalSales += pizzaCost + toppingsCost;
    });
    return totalSales;
  };

  return (
    <>
      <section>
        <h1> Sales Report</h1>
        <div>Total Orders: {orders.length}</div>
        <div>Total in Sales: ${calculateTotalSales().toFixed(2)}</div>{/*.toFixed(2) on it will convert it to "56.78", rounding it to two decimal places*/}
        <div>
          Average Order Value: $
          {(calculateTotalSales() / orders.length).toFixed(2)}{" "}
        </div>
      </section>
      <section>
        <h1> Most popular:</h1>
        <div>Pizza Size:  Order count:</div>
        <div>Cheese Type:  Order count:</div>
        <div>Sauce Type:  Order count:</div>
       
        
      </section>
    </>
  );
};

//Total in Sales: iterate through pizza.size.cost and total it + pizzaTopping.length*.50 + if(isDelivery add $5)
//does sales include delivery fee or is it just pizza?
//day-by-day sales breakdown Not sure how this should look. Leave up to group.
