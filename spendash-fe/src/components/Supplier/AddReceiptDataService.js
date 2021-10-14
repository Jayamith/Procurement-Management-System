
import axios from 'axios';

class AddReceiptDataService {

    createReceipt(receipt) {
        return axios.post('http://localhost:8080/api/v1/receipt', receipt);
    }
    getReceiptById(Id) {
        return axios.get(`http://localhost:8080/api/v1/receipt/${Id}`);
    }
    updateReceipt(id, data) {
        return axios.put(`http://localhost:8080/api/v1/receipt/${id}`, data);
    }
    getOrdersBySupplier(status,supplier) {
        return axios.get(`http://localhost:8080/api/v1/order?status=${status}&supplier=${supplier}`);
    }
    getOrderDetailsByID(id) {
        return axios.get(`http://localhost:8080/api/v1/order/${id}`);
    }
    getItemsBySupplier(id) {
        return axios.get(`http://localhost:8080/api/v1/item/supplier/${id}`);
    }
    reviewReceipt(obj) {
        return axios.post(`http://localhost:8080/api/v1/receipt/accept`,obj);
    }
    changeType(obj) {
        return axios.post(`http://localhost:8080/api/v1/receipt/type`, obj);
    }
    changePaymentMethod(obj) {
        return axios.post(`http://localhost:8080/api/v1/receipt/payment`, obj);
    }
}
export default new AddReceiptDataService();
