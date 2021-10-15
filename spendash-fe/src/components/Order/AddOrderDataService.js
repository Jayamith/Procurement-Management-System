
import axios from 'axios';

class AddOrderDataService {

    createOrder(order) {
        return axios.post('http://localhost:8080/api/v1/order', order);
    }
    getOrderForId(Id) {
        return axios.get(`http://localhost:8080/api/v1/order/${Id}`);
    }
    updateOrder(data) {
        return axios.put(`http://localhost:8080/api/v1/order`, data);
    }
    getAllSites(){
        return axios.get(`http://localhost:8080/api/v1/site/`);
    }
    getAllSuppliers(){
        return axios.get(`http://localhost:8080/api/v1/supplier/`);
    }

    getItems() {
        return axios.get(`http://localhost:8080/api/v1/item`);
    }

    getAllSuppliers(){
        return axios.get(`http://localhost:8080/api/v1/user/role/supplier`);
    }

    getAllSites(){
        return axios.get(`http://localhost:8080/api/v1/site/`);
    }

    checkForReceipt(id) {
        return axios.get(`http://localhost:8080/api/v1/receipt/check/${id}`);
    }

    getReceiptByOrderId(id) {
        return axios.get(`http://localhost:8080/api/v1/receipt/order/${id}`);
    }

}
export default new AddOrderDataService();
