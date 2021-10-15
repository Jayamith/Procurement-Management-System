import axios from 'axios';

class paymentDataService {
    getPayment(data) {
        return axios.get(`http://localhost:8080/api/v1/payment`, data);
    }

    getPaymentById(id) {
        return axios.get(`http://localhost:8080/api/v1/payment/${id}`);
    }

    createPaymentByInvoice() {
        return axios.get(`http://localhost:8080/api/v1/payment/invoice`);
    }

    createPayment(data) {
        return axios.post(`http://localhost:8080/api/v1/payment`, data);
    }

}

export default new paymentDataService();