export const postNewOrder = async (newOrder) => {
    const postOptions =  await fetch(`http://localhost:8088/orders`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newOrder)
    })
    const data = await postOptions.json()
    return data   
    }
