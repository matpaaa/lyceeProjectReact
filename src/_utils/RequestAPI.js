import { createContext, useState } from "react";
import Request from "./Request";

const ContextAPI = createContext()

class RequestAPI extends Request {
    constructor(setImageDatabase, setError) {
        super()
        this._setImageDatabase = setImageDatabase
        this._setError = setError
    }

    async getImages() {
        return new Promise((resolve, reject) => {
            fetch(`http://${this.addressAPI}/get/images`, {
                method: 'GET',
                credentials: 'include',
                headers: this.defaultHeaders
            })
            .then(response => response.json())
            .then(json => this._setImageDatabase(json))
            .catch(_ => this._setError({
                visible: true,
                status: 'Critical',
                message: 'Error getting images'
            }))
        })
    }

    async sendImage(formData) {
        return new Promise((resolve, reject) => {
            fetch(`http://${this.addressAPI}/post/images`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            .then(response => response.json())
            .then(data => this._setImageDatabase(data))
            .catch(_ => this._setError({
                visible: true,
                status: 'Critical',
                message: 'Error pushing image'
            }))
        })
    }

    async deleteImage(name) {
        return new Promise(_ => {
            fetch(`http://${this.addressAPI}/delete/image/${name}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            .then(response => response.json())
            .then(data => this._setImageDatabase(data))
            .catch(_ => this._setError({
                visible: true,
                status: 'Critical',
                message: 'Error deleting image'
            }))
        })
    }

    async renameImage(actualName, newName) {
        return new Promise((resolve, reject) => {
            fetch(`http://${this.addressAPI}/put/new-name`, {
                method: 'PUT',
                credentials: 'include',
                headers: this.defaultHeaders,
                body: JSON.stringify({
                    actualName,
                    newName
                })
            })
            .then(response => response.json())
            .then(data => this._setImageDatabase(data))
            .catch(_ => this._setError({
                visible: true,
                status: 'Ordinary',
                message: 'Error updating image name'
            }))
        })
    }

    async printImage(name) {
        return new Promise((resolve, reject) => {
            fetch(`http://${this.addressAPI}/put/print`, {
                method: 'PUT',
                credentials: 'include',
                headers: this.defaultHeaders,
                body: JSON.stringify({
                    name,
                })
            })
            .then(response => resolve(response.status))
            .catch(_ => this._setError({
                visible: true,
                status: 'Ordinary',
                message: 'Error updating image name'
            }))
        })
    }
}

const ContextProvider = ({ children })  => {

    const [imageDatabase, setImageDatabase] = useState(null)
    const [error, setError] = useState(null)

    const requestAPI = new RequestAPI(setImageDatabase, setError)

    return (
        <ContextAPI.Provider value={{requestAPI, imageDatabase, error}}>
            {children}
        </ContextAPI.Provider>
    )
}

export default ContextProvider
export { ContextAPI }