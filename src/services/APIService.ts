import { ContactType } from "@/types/ContactType"

const url = 'http://localhost:3001/contacts'

export default class APIService{
    static async createContact(data: ContactType){
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText)
                return response.json()
            })            
            .then(data => data)
    }

    static async getContacts(){
        return fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText)
                return response.json()
            })            
            .then(data => data)
    }

    static async updateContact(data: ContactType){
        const options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch(`${url}/${data.id}`, options)
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText)
                return response.json()
            })
            .then(data => data)
    }

    static async deleteContact(id: number){
        const options = {
            method: 'DELETE',
        }
        return fetch(`${url}/${id}`, options)
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText)
                return response.json()
            })
            .then(() => { return {message: "success"}})
    }
}