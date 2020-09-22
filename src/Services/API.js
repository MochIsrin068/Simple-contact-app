
const BASE_URL = "https://simple-contact-crud.herokuapp.com"

export default class API {
    
    static getContact = () => {
        return this.fetch(`${BASE_URL}/contact`)
    }
    
    static getDetailContact = (contactID) => {
        return this.fetch(`${BASE_URL}/contact/${contactID}`)
    }
    
    static addContact = (parameters = {}) => {
        const body = {
            firstName: parameters.firstName,
            lastName: parameters.lastName,
            age: parameters.age,
            photo: parameters.photo
        }

        return this.fetch(`${BASE_URL}/contact`, {method : "POST", body : JSON.stringify(body)})
    }


    static updateContact = (contactID, parameters = {}) => {
        const body = {
            firstName: parameters.firstName,
            lastName: parameters.lastName,
            age : parameters.age,
            photo: parameters.photo
        }

        return this.fetch(`${BASE_URL}/contact/${contactID}`, {method : "PUT", body : JSON.stringify(body)})
    }


    
    static deleteContact = (contactID) => {
        return this.fetch(`${BASE_URL}/contact/${contactID}`, {method : "DELETE"})
    }

    static fetch = (url, config = {}) => {
        return fetch(url, config).then(response => {
            if(response.status === 200){
                return response.json()
            }
        })
    }
}