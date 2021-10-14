import axios from 'axios';

class AthenticationDataService {
  login(data) {
    // let basicAuthHeader = 'Basic ' + window.btoa(email + ":" + password);
    return axios.post(`http://localhost:8080/api/v1/user/login`, data);
  }
}

export default new AthenticationDataService();
