import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import {
    Form,
    Container,
    Button,
    Modal,
    Spinner,
    Col,
    Row,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import swal from 'sweetalert';
import Joi from 'joi-browser';
import PaymentDataService from './PaymentDataService';
import AddOrderDataService from "../Order/AddOrderDataService";

export class CreatePayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payment: {
                method: '',
                invoice: '',
                amount: '',
                paidBy: '',
                selectedSite:''
            },
            sites: [],
            loading: false
        }
        this.createPayment = this.createPayment.bind(this);
    }

    componentDidMount() {
        this.getSites();
    }
    getSites() {
        AddOrderDataService.getAllSites().then((response) => {
            this.setState({ sites: response.data }, () => {
                console.log('Sites', this.state.sites);
            });
        });
    }

    createPayment(event) {
        event.preventDefault();
        const { payment } = this.state;

        this.setState({ loading: true });

        let formData = new FormData();
        formData.append('invoice', payment.invoice);
        formData.append('amount', payment.amount);
        formData.append('paidBy', payment.paidBy);
        formData.append('method', 'test');
        formData.append('site', payment.selectedSite);

        PaymentDataService.createPayment(formData)
            .then((res) => {
                setTimeout(() => {
                    this.setState({ loading: false });
                    swal({
                        title: 'Payment Created successfully !!!',
                        icon: 'success',
                        button: 'Ok'
                    }).then((result) => {
                        return this.props.history.push(`/payments`);
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
                    icon: 'error'
                });
            });
    }

    Schema = {
        id: Joi,
        method: Joi.string().required().label('Method'),
        selectedSite: Joi.string().required().label('Site'),
        invoice: Joi.string()
            .required()
            .label('Invoice ID'),
        amount: Joi.string().required().label('Amount'),
        paidBy: Joi.string().required().label('Paid By'),

    };

    validate() {
        const abortEarly = { abortEarly: false }; //1st Error priority disabled
        const { error } = Joi.validate(this.state.payment, this.Schema, abortEarly);
        if (!error) return null; //if no result error return null
        const errors = {};
        for (let item of error.details) {
            //traversing in Joi error
            errors[item.path[0]] = item.message; //target input is given priority or first object [0]
        }
        return errors;
    }

    validateField({ name, value }) {
        const miniPayment = { [name]: value }; //Computed operators used [ES6]
        const miniSchema = { [name]: this.Schema[name] }; //Extracted property from Schema
        const { error } = Joi.validate(miniPayment, miniSchema);
        return error ? error.details[0].message : null;
    }

    handleChange = ({ target: input }) => {
        let payment = { ...this.state.payment };
        const errors = { ...this.state.errors };
        const errorMessage = this.validateField(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        payment[input.name] = input.value;

        this.setState(
            {
                payment,
                errors
            },
            () => console.log(this.state)
        );
    };
        render() {
            const { payment } = this.state;
            const {
                method,
                invoice,
                amount,
                paidBy,
                selectedSite
            } = payment;
        return (
            <div>
                <Container
                    style={{
                        marginTop: '100px',
                        marginBottom: '30px',
                        border: '1px solid black'
                    }}
                >
                    <Form autoComplete="off" onSubmit={CreatePayment}>
                        <div
                            style={{
                                padding: '10px',
                                fontWeight: 600,
                                fontSize: '25px',
                                marginBottom: '20px',
                                textAlign: 'center'
                            }}
                        >
                            ADD PAYMENT DETAILS
                        </div>

                        <Form.Group controlId="paidBy" className="payment-form-group">
                            <Form.Label>Paid By</Form.Label>
                            <Form.Control onChange={this.handleChange}
                                          name="paidBy"
                                          value={paidBy}
                                          type="text"
                                          placeholder="paidBy"  />
                        </Form.Group>

                        <Form.Group controlId="invoice" className="payment-form-group">
                            <Form.Label>Invoice ID</Form.Label>
                            <Form.Control
                                onChange={this.handleChange}
                                name="invoice"
                                value={invoice}
                                type="invoice"
                                placeholder="invoice"
                                className="payment-form-input" />
                        </Form.Group>


                        <Form.Group controlId="method" className="payment-form-group">
                            <Form.Label>Payment Method</Form.Label>
                            <Form.Control
                                onChange={this.handleChange}
                                name="method"
                                value={method}
                                type="text"
                                as="select"
                                className="paperregistration-form-input"
                            >
                                <option value="">- Select -</option>
                                <option value="Credit">Credit</option>
                                <option value="Debit">Debit</option>
                                <option value="Cash">Cash</option>
                            </Form.Control>
                        </Form.Group>

                        <Row classname="payment-form-row" >
                            <Col>
                                <Form.Group controlId="amount" className="payment-form-group">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="amount" value={amount} type="number" placeholder="20000" className="payment-form-input"/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="site" className="payment-form-group">
                                    <Form.Label>Site</Form.Label>
                                    <Form.Control
                                        onChange={this.handleChange}
                                        name="selectedSite"
                                        value={selectedSite}
                                        type="text"
                                        as="select"
                                        className="payment-form-input"
                                    >
                                        <option value="">- Select -</option>
                                        {this.state.sites &&
                                        this.state.sites.map((site) => (
                                            <option key={site.id} value={site.id}>{site.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button
                            variant="secondary"
                            className="userregistration-button"
                            style={{marginBottom: '10px'}}
                            onClick={this.createPayment}
                        >
                            Submit
                        </Button>
                        {this.state.error && <p className="userregistration-error">{this.state.error}</p>}
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
        )
    }
}



export default CreatePayment;