
import axios from 'axios';

class CreditNoteDataService {

    createCreditNote(creditnote) {
        return axios.post('http://localhost:8080/api/v1/creditnote', creditnote);
    }
    getCreditNoteByReceiptId(Id) {
        return axios.get(`http://localhost:8080/api/v1/creditnote/receipt/${Id}`);
    }
    updateCreditNote(id, data) {
        return axios.put(`http://localhost:8080/api/v1/creditnote/${id}`, data);
    }
    getCreditNoteById(id) {
        return axios.get(`http://localhost:8080/api/v1/creditnote/${id}`);
    }
    reviewCreditNote(obj){
        return axios.post(`http://localhost:8080/api/v1/creditnote/status`, obj);
    }
    getAllCreditNotes() {
        return axios.get(`http://localhost:8080/api/v1/creditnote`);
    }
}
export default new CreditNoteDataService();
