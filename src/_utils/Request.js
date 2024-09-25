export default class Request {
    constructor() {
        this.addressAPI = 'localhost:5000'
        this.defaultHeaders = {
            'Content-Type': 'application/json'
        }
    }
}