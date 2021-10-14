import axios from 'axios';

class OrderDataService {
  getOrders(status) {
    return axios.get(`http://localhost:8080/api/v1/order?status=${status}`);
  }

  getAllOrders() {
    return axios.get(`http://localhost:8080/api/v1/order`);
  }

  getOrderById(id) {
    return axios.get(`http://localhost:8080//api/v1/order/${id}`);
  }

  reviewOrder(obj) {
    return axios.post(`http://localhost:8080/api/v1/order/status`, obj);
  }
}

export default new OrderDataService();
