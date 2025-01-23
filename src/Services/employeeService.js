export const getEmployees = () => {
    return fetch ("http://localhost:8088/users?_expand=role").then((response)=>response.json())
}