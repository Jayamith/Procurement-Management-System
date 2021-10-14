import React, { Component } from 'react';
import {
    Form,
    Container,
    Button,
    Modal,
    Spinner,
    Col,
    Row, Card, InputGroup, FormControl,
} from 'react-bootstrap';
import swal from 'sweetalert';
import Joi from 'joi-browser';

import InputField from '../../asset/commons/InputField';
import TextArea from "../../asset/commons/TextArea";
import CreditNoteDataService from "./CreditNoteDataService";
import AddReceiptDataService from "../Supplier/AddReceiptDataService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import ItemCard from "../Items/ItemCard";
import SelectedItems from "../Items/SelectedItems";

class CreateCreditNote extends Component {
    constructor(props) {
        super(props);
        //controlled inputs, should not be null as well..[ERR-LOG 01]
        this.state = {
            id:this.props.match.params.id,
            siteId: this.props.match.params.site,
            supplier: this.props.match.params.supplier,
            creditnote: {
                id: this.props.match.params.id,
                invoiceID: '',
                siteID: this.props.match.params.site,
                status: '',
                comment:'',
                amount: '',
            },
            selectedItems:[],
            availableItems:[],
            items:[],
            loading: false,
            buttonError: '',
            errors: {},
        };
        this.createCreditNote = this.createCreditNote.bind(this);
        this.getCreditNoteById = this.getCreditNoteById.bind(this);
        this.updateCreditNote = this.updateCreditNote.bind(this);
        this.validate = this.validate.bind(this);
        this.getAllItemsBySupplier = this.getAllItemsBySupplier.bind(this);
        this.addSelected = this.addSelected.bind(this);
        this.deleteSelected = this.deleteSelected.bind(this);

    }

    componentDidMount() {
        this.getCreditNoteById();
        this.getAllItemsBySupplier()
    }

    onAdd = (item) => {

        const {selectedItems}= this.state
        const exist = selectedItems.find(x => x.id === item.id)
        if (exist) {
            this.setState({selectedItems: selectedItems.map(x => x.id === item.id ? { ...exist, qty: exist.qty + 1 } : x)})
        } else {
            this.setState({selectedItems : [...selectedItems,{item,qty:1}]})
        }
    }

    onRemove = (item) => {

        const {selectedItems}= this.state
        const exist = selectedItems.find(x => x.id === item.id)
        if (exist.qty === 1) {
            const newCart = selectedItems.filter((x) => x.id !== item.id)
            this.setState({selectedItems: newCart})

        } else {
            this.setState({selectedItems: selectedItems.map(x => x.id === item.id ? { ...exist, qty: exist.qty - 1 } : x)})
        }
    }

    deleteSelected(id) {
        const { selectedItems } = this.state;

        let newSelected = selectedItems.filter((item) => {
            if (item.id !== id) {
                return item;
            }
        });

        this.setState({ selectedItems: newSelected });
    }

    addSelected (item) {
        const { selectedItems } = this.state;
        let prevSelected = selectedItems;
        console.log(item);
        let exist = selectedItems.find((val) => val.id === item.id);
        if (!exist) {
            this.setState({ selectedItems: [...prevSelected, item] });
        } else {
            return;
        }
    }

    handleChange = ({ target: input }) => {
        let creditnote = { ...this.state.creditnote };
        const errors = { ...this.state.errors };
        const errorMessage = this.validateField(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        creditnote[input.name] = input.value;
        this.setState(
            {
                creditnote,
                errors,
            },
            () => console.log(this.state)
        );
    };

    // Joi.ref('password')
    //Joi@13.4 Schema [Validation Library]
    Schema = {
        id: Joi,
        invoiceID: Joi,
        siteID: Joi,
        status: Joi.string().required().label('Status Should Be Updated'),
        comment: Joi.string().required(),
        amount: Joi.string().required().label('Total Amount Should Be Added'),
    };

    validate() {
        const abortEarly = { abortEarly: false }; //1st Error priority disabled
        const { error } = Joi.validate(this.state.creditnote, this.Schema, abortEarly);
        if (!error) return null; //if no result error return null
        const errors = {};
        for (let item of error.details) {
            //traversing in Joi error
            errors[item.path[0]] = item.message; //target input is given priority or first object [0]
        }
        return errors;
    }

    getAllItemsBySupplier() {
        const { supplier } = this.state;
        AddReceiptDataService.getItemsBySupplier(supplier).then((res) => {
            this.setState({
                availableItems: res.data.map((item) => {return {...item, qty:1}})
            });
        });
    }

    validateField({ name, value }) {
        const miniCreditNote = { [name]: value }; //Computed operators used [ES6]
        const miniSchema = { [name]: this.Schema[name] }; //Extracted property from Schema
        const { error } = Joi.validate(miniCreditNote, miniSchema);
        return error ? error.details[0].message : null;
    }

    createCreditNote(event) {
        event.preventDefault();
        const { creditnote,id } = this.state;
        this.setState({ loading: true });
        //Object was used, Code 400 err, [ERR-LOG-02]
        // It uses the same format a form would use if the encoding type were set to "multipart/form-data".
        let formData = new FormData();
        formData.append('invoiceRef', id);
        formData.append('site', creditnote.siteID);
        formData.append('status', creditnote.status);
        formData.append('comment', creditnote.comment);
        formData.append('amount', creditnote.amount);
        formData.append("items",JSON.stringify(this.state.selectedItems))

        CreditNoteDataService.createCreditNote(formData)
            .then((res) => {
                setTimeout(() => {
                    this.setState({ loading: false });
                    swal({
                        title: 'Credit Note Added successfully !!!',
                        icon: 'success',
                        button: 'Ok',
                    }).then((result) => {
                        return this.props.history.push(`/step2`);
                    });
                }, 1000);
            })
            .catch((err) => {
                this.setState({ loading: false });
                swal({
                    title: 'Oops!!',
                    text: 'Something went wrong,please try again later.',
                    error: 'error',
                    button: 'ok',
                    icon: 'error',
                });
            });
    }

    getCreditNoteById() {
        const { creditnote } = this.state;

        if (creditnote.id != null) {
            CreditNoteDataService.getCreditNoteById(creditnote.id)
                .then((res) => {
                    creditnote['invoiceID'] = res.data.invoiceID;
                    creditnote['siteID'] = res.data.siteID;
                    creditnote['status'] = res.data.status;
                    creditnote['comment'] = res.data.comment;
                    creditnote['amount'] = res.data.amount;

                    this.setState(
                        {
                            creditnote
                        },
                        () => {}
                    );
                });
        }
    }

    updateCreditNote(event) {
        event.preventDefault();
        const { creditnote } = this.state;

        this.setState({ loading: true });
        //Object was used, Code 400 err, [ERR-LOG-02]
        // It uses the same format a form would use if the encoding type were set to "multipart/form-data".
        let formData = new FormData();
        formData.append('invoiceID', creditnote.invoiceID);
        formData.append('siteID', creditnote.siteID);
        formData.append('status', creditnote.status);
        formData.append('comment', creditnote.comment);
        formData.append('amount', creditnote.amount);

        CreditNoteDataService.updateCreditNote(creditnote.id, formData)
            .then((res) => {
                setTimeout(() => {
                    this.setState({ loading: false });
                    swal({
                        title: 'Credit Note updated successfully !!!',
                        icon: 'success',
                        button: 'Ok',
                    }).then((result) => {
                        return this.props.history.push(`/step2`);
                    });
                }, 1000);
            })
            .catch((err) => {
                this.setState({ loading: false });
                swal({
                    title: 'Oops!!',
                    text: 'Something went wrong,please try again later.',
                    error: 'error',
                    button: 'ok',
                    icon: 'error',
                });
            });
    }

    /*getReceiptDetails() {
        const {supplier} = this.state;
           AddReceiptDataService.getItemsBySupplier(supplier).then((res) => {
                this.setState({
                   deliveryItems:res.data.item
                });
            });

    }*/

    getTotalCost = () => {
        localStorage.removeItem('cost')
        let total = 0;
        this.state.selectedItems.map((item) => (total += item.qty * item.price));
        localStorage.setItem('cost',total)
        return total;
    };

    displayError = (msg) => {
        this.setState({
            buttonError: msg,
        });
    };

    render() {
        const { errors, creditnote, buttonError ,id,siteId,items, availableItems} = this.state; //properties
        const {
            status,
            comment,
            amount,
        } = creditnote;

        const { createCreditNote } = this; //methods

        let newItems =
            items &&
            items.filter((item) => {
                return this.state.order.selectedSupplier === item.supplier.userName;
            });

        const searchBox = {
            width: '250px',
            fontWeight: 'bold',
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            borderColor: '#000',
            margin: '10px'
        };

        return (
            <div>
                <Container style={{
                    marginTop: '30px',
                    marginBottom: '30px',
                    border: '1px solid black',
                }}>
                    <Form autoComplete="off" onSubmit={createCreditNote}>
                        <div
                            style={{
                                fontWeight: 600,
                                fontSize: '25px',
                                marginBottom: '20px',
                                textAlign:'center',
                            }}
                        >
                            NEW CREDIT NOTE
                        </div>
                        <Row style={{ marginTop: '20px'}} className="justify-content-md-center">
                            <Col>
                                <InputField
                                    FormLabel="Invoice ID"
                                    name="invoiceID"
                                    value={id}
                                    handleChange={this.handleChange}
                                    type="text"
                                    placeholder="Invoice ID"
                                    trap={true}
                                    error={errors.invoiceID}
                                />
                            </Col>
                            <Col>
                                <InputField
                                    FormLabel="Site ID"
                                    name="siteID"
                                    value={siteId}
                                    handleChange={this.handleChange}
                                    type="text"
                                    placeholder="Site ID"
                                    trap={true}
                                    error={errors.siteID}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '10px'}} className="justify-content-md-center">
                            <Col>
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    onChange={this.handleChange}
                                    name="status"
                                    value={status}
                                    type="text"
                                    as="select"
                                    className="paperregistration-form-input"
                                >
                                    <option value="">- Select -</option>
                                    <option value="Fully Received">Fully Received</option>
                                    <option value="Partially Received">Partially Received</option>

                                </Form.Control>
                                <Form.Text className="text-muted"> Select Status </Form.Text>
                            </Col>
                            <Col>
                                <InputField
                                    FormLabel="Total Amount"
                                    name="amount"
                                    value={amount}
                                    handleChange={this.handleChange}
                                    FormText="Total Cost Of Order"
                                    type="number"
                                    placeholder="Total Cost Of Order"
                                    trap={false}
                                    error={errors.amount}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '5px' ,margin:2}} >
                         <Col xs={6}>
                             <div style={{marginTop: 30}}>
                                 <Card>
                                     <Card.Header >
                                         <h6>Available Items</h6>
                                     </Card.Header>
                                     <div
                                         style={{
                                             marginBottom: '20px',
                                             textAlign: 'center',
                                             padding: 12
                                         }}
                                     >
                                         <InputGroup size="sm" style={{ marginBottom: 10 }}>
                                             <FontAwesomeIcon
                                                 style={{ margin: '20px' }}
                                                 icon={faSearch}
                                             />
                                             <FormControl
                                                 style={searchBox}
                                                 autoComplete="off"
                                                 placeholder="start typing..."
                                                 name="search"
                                                 value={this.state.search}
                                                 className=""
                                             />
                                             &nbsp;
                                         </InputGroup>
                                         {availableItems &&
                                         availableItems.map((item) => (
                                             <ItemCard item={item} addSelected={this.addSelected} />
                                         ))}
                                     </div>
                                 </Card>
                             </div>
                         </Col>
                         <Col>
                             <div
                                 style={{
                                     marginTop: '30px',
                                     marginBottom: '20px',
                                     textAlign: 'center',
                                     height: '200px'
                                 }}
                             >
                                 <SelectedItems
                                     selectedItems={this.state.selectedItems}
                                     deleteSelected={this.deleteSelected}
                                     onAdd={this.onAdd}
                                     onRemove={this.onRemove}
                                     totalCost={()=>this.getTotalCost()}
                                 />
                             </div>
                         </Col>
                        </Row>
                          <Row>
                              <Col>
                                  <div style={{marginLeft:20,marginBottom:10}}>
                                      <TextArea
                                          FormLabel="Comments"
                                          name="comment"
                                          value={comment}
                                          handleChange={this.handleChange}
                                          FormText="Describe here"
                                          type="text"
                                          placeholder="Description about the items and related things..."
                                          error={errors.comment}
                                          trap={false}
                                      />
                                  </div>
                              </Col>

                          </Row>
                        <Button
                            style={{ display:'block', marginBottom:8, marginLeft:20}}
                            variant="secondary"
                            onClick={this.createCreditNote}
                        >
                            Submit
                        </Button>
                        {buttonError && (
                            <p className="paperregistration-error">{buttonError}</p>
                        )}
                    </Form>
                </Container>
                {/* Modal or Loading */}
                <Modal
                    centered
                    size="sm"
                    show={this.state.loading}
                    onHide={() => console.log('please wait...')}
                >
                    <Modal.Header>
                        <Modal.Title>
                            <Spinner animation="border" /> Please wait...
                        </Modal.Title>
                    </Modal.Header>
                </Modal>
            </div>
        );
    }
}
export default CreateCreditNote;
