
export const postNewCustomer = async (newCustomerObj) => {
    const postOptions = await fetch("http://localhost:8088/customers",{
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCustomerObj)
    })
    const data = await postOptions.json()
    return data
}


export const getCustomerByPhoneNumber = (customerPhoneNumber) => {
    return fetch(`http://localhost:8088/customers?phoneNumber=${customerPhoneNumber}`).then(res=>res.json())
}