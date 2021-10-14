import React, { Component } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';

import Authentication from '../../authentication/Authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import PaymentDataService from './PaymentDataService';

class OrderDetailedView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            payment: {
                id: -1,
                paidBy: '',
                invoice: '',
                method: '',
                amount: '',
                site: '',

            },
            loading: false
        };
        this.getDetailedPayment = this.getDetailePayment.bind(this);
        // this.submitBtnClicked = this.submitBtnClicked.bind(this);
        // this.deleteBtnClicked = this.deleteBtnClicked.bind(this);
    }

    componentDidMount() {
        this.getDetailedPayment();
    }

    getDetailedPayment() {
        const { id, payment } = this.state;

        if (payment.id != null) {
            PaymentDataService.getPaymentById(id).then((res) => {
                console.log(res, 'res');
                payment['id'] = res.data.id;
                payment['paidBy'] = res.data.paidBy;
                payment['invoice'] = res.data.invoice;
                payment['method'] = res.data.method;
                payment['amount'] = res.data.amount;
                payment['site'] = res.data.site;


                this.setState({
                    order
                });
            });
        }
    }
    formChange = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value,
                error: null
            },
            () => console.log('form changed')
        );
    };

    getTotalCost = () => {
        let total = 0;
        this.state.order.items.map((item) => (total += item.qty * item.price));
        return total;
    };

    render() {
        const {
            id,
            lastModifiedBy,
            site_id,
            Status,
            supplier,
            comment,
            expect_date,
            items
        } = this.state.order;
        return (
            <Container
                style={{
                    marginTop: '50px',
                    marginBottom: '50px'
                }}
            >
                <div
                    style={{
                        border: '1px solid black',
                        padding: 40
                    }}
                >
                    <h1>{id}</h1>
                    <p>Lastly Modified By:{lastModifiedBy}</p>

                    <p style={{ marginBottom: '0px' }}>
                        <b>Site ID :</b>
                        {site_id}
                    </p>
                    <p style={{ marginBottom: '0px' }}>
                        <b>Status :</b>
                        {Status}
                    </p>
                    <p style={{ marginBottom: '0px' }}>
                        <b>type :</b> Requistion
                    </p>
                    <p>
                        <b>Supplier:</b> {supplier}
                    </p>
                    <p>Comment:{comment}</p>
                    <p>Expected Delivery Date : {expect_date}</p>

                    <p>
                        <b>Ordered Items</b>
                    </p>
                    <Table striped bordered hover size="sm" style={{ width: '80%' }}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.qty}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))}

                        <tr style={{ backgroundColor: 'grey', color: 'white' }}>
                            <td colSpan="3"></td>
                            <td>
                                <b>Total Cost : {this.getTotalCost()} </b>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
                {Authentication.loggedAsSenior && (
                    <div style={{ marginLeft: '100px', marginTop: '40px' }}>
                        <hr />
                        <p>
                            <b>Submit Your Review</b>
                        </p>
                        <Form autoComplete="off">
                            <Row>
                                <Col>
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-2"
                                        custom
                                        onChange={this.formChange}
                                        name="status"
                                        // value={this.state.status}
                                        required
                                    >
                                        <option value="">Choose...</option>
                                        <option value="approved">Approve</option>
                                        <option value="rejected">Reject</option>
                                    </Form.Control>
                                    {/* <p style={{ margin: '5px 0px' }}>
                    {this.state.status === 'pending' && (
                      <Badge variant="warning">{this.state.status}</Badge>
                    )}
                    {this.state.status === 'approved' && (
                      <Badge variant="success">{this.state.status}</Badge>
                    )}
                    {this.state.status === 'rejected' && (
                      <Badge variant="danger">{this.state.status}</Badge>
                    )}
                  </p> */}
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Control
                                            className="my-1 mr-sm-2"
                                            onChange={this.formChange}
                                            name="comment"
                                            // value={this.state.comment}
                                            placeholder="your comment"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Button className="my-1 mr-sm-2" variant="outline-dark">
                                        <FontAwesomeIcon size="sm" icon={faEdit} />
                                        &nbsp; Submit
                                    </Button>
                                    <Button className="my-1 mr-sm-2" variant="outline-danger">
                                        <FontAwesomeIcon size="sm" icon={faTrash} />
                                        &nbsp; Delete
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                )}
            </Container>
        );
    }
}

export default PayemntDetailedView;