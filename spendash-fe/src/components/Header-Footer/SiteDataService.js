import axios from 'axios';

class SiteDataService {
  getAllSites() {
    return axios.get(`http://localhost:8080/api/v1/site/`);
  }
}

export default new SiteDataService();
