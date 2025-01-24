import React, { useState, useEffect } from "react";
import { postNewOrder } from "../../Services/orderServices";
import { postNewCustomer } from "../../Services/customerService";
import { getCustomerByPhoneNumber } from "../../Services/customerService";
import { useNavigate } from "react-router-dom"

export const NewOrderForm = () => {
    const [customerName, setCustomerName] = useState("");
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
    const [customerAddress, setCustomerAddress] = useState("")
    const [isDelivery, setIsDelivery] = useState(false)
    const navigate = useNavigate()
  
  
    const handleOnSave = (event) => {
      event.preventDefault()

      const customerObject = {
          name: customerName,
          phoneNumber: customerPhoneNumber,
          address: customerAddress
        
      }
      if(customerName && customerPhoneNumber){
        postNewCustomer(customerObject)
        .then(() => getCustomerByPhoneNumber(customerObject.phoneNumber))
        .then((data) => {
          const orderObject = { 
              tipLeft: false,
              dateTime: new Date(),
              status: "Pending",
              customerId: data[0].id,
              isDelivery: isDelivery
          }
          return postNewOrder(orderObject)
        })
        .then((newOrderData) => {
          console.log(newOrderData)
          navigate(`/orders/${newOrderData.id}`)
        })
      }else{
        window.alert ("Please complete form.")
      }
      
    }

  return (
    <>
      <form>
        <h2>Create New Order</h2>
        <fieldset>
          <label>Customer Name:</label>
          <input
            type="text"
            placeholder="Please Enter First and Last Name"
            value={customerName}
            onChange={(event) => {
              setCustomerName(event.target.value);
            }}
          />
        </fieldset>
        <fieldset>
          <label>Customer Phone:</label>
          <input
            type="text"
            placeholder="Please Enter 10 digit Phone Number"
            value={customerPhoneNumber}
            onChange={(event) => {
              setCustomerPhoneNumber(event.target.value);
            }}
          />
        </fieldset>
        <fieldset>
        <label>Customer Address:</label>
          <input
            type="text"
            placeholder="Please Enter Address including Zip Code"
            value={customerAddress}
            onChange={(event) => {
              setCustomerAddress(event.target.value)
            }}
          />
        </fieldset>
        <fieldset>
          <label>Delivery?</label>
          <input 
            type="checkbox"
            onChange={(event) => {
              setIsDelivery(event.target.checked)
            }}
          />
        </fieldset>
        <fieldset>
          <button className="btn-primary" onClick={handleOnSave}>Create New Order</button>          
        </fieldset>
                
                  
        
              
      </form>
    </>
  );
};