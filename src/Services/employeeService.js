import { ssrModuleExportsKey } from "vite/runtime"

export const getEmployees = () => {
    return fetch ("http://localhost:8088/users?_expand=role").then((response)=>response.json())
}

export const getUserAndTheirRole=(userId)=>{
    return fetch (`http://localhost:8088/users?id=${userId}`).then((res)=>res.json())
}

export const getRoleArray=()=>{
    return fetch("http://localhost:8088/roles").then((res)=>res.json())
}

export const updateProfile=(user)=>{
    return fetch (`http://localhost:8088/users/${user.id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)  

    }
    )
}