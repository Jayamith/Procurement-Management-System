import React, { Component } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';

import Authentication from '../../authentication/Authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddReceiptDataService from "./AddReceiptDataService";
import swal from "sweetalert";

class ReceiptDetailedView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receipt: {
                id: this.props.match.params.id,
                orderRef: '',
                site: '',
                siteId:'',
                acceptanceStatus: '',
                type: '',
                paymentStatus: '',
                supplier: '',
                cost: '',
                isFullDelivery: '',
                items: []
            },
            loading: false
        };
        this.getReceiptDetails = this.getReceiptDetails.bind(this);
        this.submitReview = this.submitReview.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changePaymentStatus = this.changePaymentStatus.bind(this);
    }

    componentDidMount() {
        this.getReceiptDetails();
    }

    getReceiptDetails() {
        const {  receipt } = this.state;

        if (receipt.id != null) {
            AddReceiptDataService.getReceiptById(receipt.id).then((res) => {
                console.log(res.data, 'res');
                receipt['order'] = res.data.orderRef.id;
                receipt['site'] = res.data.site.name;
                receipt['siteId'] = res.data.site.id;
                receipt['acceptanceStatus'] = res.data.acceptanceStatus;
                receipt['type'] = res.data.type;
                receipt['cost'] = res.data.cost;
                receipt['paymentStatus'] = res.data.paymentStatus;
                receipt['supplier'] = res.data.supplier.userName;
                receipt['fullDelivery'] = res.data.fullDelivery;
                receipt['items'] = res.data.items;

                this.setState({
                    receipt
                });
            });
        }
    }
    formChange = (event) => {
        const { receipt } = this.state
        receipt[event.target.name] = event.target.value
        this.setState(
            {
               receipt
            },
            () => console.log('form changed')
        );
    };

    submitReview(e) {
        e.preventDefault();
        const { receipt } = this.state;
        let formData = new FormData();
        formData.append('id', receipt.id);
        formData.append('status', receipt.acceptanceStatus);

        AddReceiptDataService.reviewReceipt(formData)
            .then((res) => {
                setTimeout(() => {
                    this.setState({ loading: false });
                    swal({
                        title: 'Reviewed successfully !!!',
                        icon: 'success',
                        button: 'Ok'
                    }).then((result) => {
                        return this.props.history.push(`/siteManager`);
                    });
                }, 1000);
            })
            .catch((err) => {
                this.setState({ loading: false });
                swal({
                    title: 'Oops!!',
                    text: 'Something went wrong!',
                    error: 'error',
                    button: 'ok',
                    icon: 'warning'
                });
            });
    }

    changeType(e) {
        e.preventDefault();
        const { receipt } = this.state;
        let formData = new FormData();
        formData.append('id', receipt.id);
        formData.append('type', receipt.type);

        AddReceiptDataService.changeType(formData)
            .then((res) => {
                setTimeout(() => {
                    this.setState({ loading: false });
                    swal({
                        title: 'Type Updated successfully !!!',
                        icon: 'success',
                        button: 'Ok'
                    }).then((result) => {
                        return this.props.history.push(`/supplierOrders`);
                    });
                }, 1000);
            })
            .catch((err) => {
                this.setState({ loading: false });
                swal({
                    title: 'Oops!!',
                    text: 'Something went wrong!',
                    error: 'error',
                    button: 'ok',
                    icon: 'warning'
                });
            });
    }

    changePaymentStatus(e) {
        e.preventDefault();
        const { receipt } = this.state;
        let formData = new FormData();
        formData.append('id', receipt.id);
        formData.append('status', receipt.paymentStatus);

        AddReceiptDataService.changePaymentMethod(formData)
            .then((res) => {
                setTimeout(() => {
                    this.setState({ loading: false });
                    swal({
                        title: 'Payment Status Updated successfully !!!',
                        icon: 'success',
                        button: 'Ok'
                    }).then((result) => {
                        return this.props.history.push(`/supplierOrders`);
                    });
                }, 1000);
            })
            .catch((err) => {
                this.setState({ loading: false });
                swal({
                    title: 'Oops!!',
                    text: 'Something went wrong!',
                    error: 'error',
                    button: 'ok',
                    icon: 'warning'
                });
            });
    }

    getTotalCost = () => {
        let total = 0;
        this.state.receipt.items.map((item) => (total += item.qty * item.price));
        return total;
    };

    render() {
        const {
            id,
            order,
            site,
            siteId,
            acceptanceStatus,
            type,
            cost,
            paymentStatus,
            supplier,
            fullDelivery,
            items
        } = this.state.receipt;
        return (
            <Container
                style={{
                    marginTop: '50px',
                    marginBottom: '50px'
                }}
            >
                <div
                    style={{
                        border: '2px solid black',
                        padding: 40
                    }}
                >
                    <Row>
                        <Col md={10}>
                            <h1> Receipt ID : {id}</h1>
                        </Col>
                        <Col>
                            <Button variant="secondary" onClick={()=>this.props.history.push(`/creditNoteList/${id}/${siteId}/${supplier}`)}>
                                View Credit Notes
                            </Button>
                        </Col>
                    </Row>
                    <h3 style={{color:'#809e71'}}>Order ID : {order}</h3>

                    <p style={{ marginTop: 40,marginBottom:'0px' }}>
                        <h5>Site ID :  <b>{site}</b></h5>
                    </p>
                    <p style={{ marginBottom: '0px' }}>
                        <h5>Acceptance Status : <b>{acceptanceStatus}</b></h5>
                    </p>
                    <p style={{ marginBottom: '20px' }}>
                        <h5>Cost (Rs) : <b>{cost}</b></h5>
                    </p>
                    <h6>Payment Status : <b>{paymentStatus}</b></h6>
                    <p style={{ marginBottom: '0px' }}>
                        <h6>Type : <b>{type}</b></h6>
                    </p>
                    <p>
                        <h6>Supplier : <b>{supplier}</b></h6>
                    </p>
                    <p style={{ marginBottom: '20px' }}>
                        <h6>Delivery Type : <b>{fullDelivery ? "Full":"Partial"}</b></h6>
                    </p>
                    <p>
                        <b>Ordered Items</b>
                    </p>
                    <Table striped bordered hover variant="dark" size="sm" style={{ width: '80%' }}>
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
                {Authentication.loggedAsSiteManager() && (
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
                                        onChange={this.formChange}
                                        name="acceptanceStatus"
                                        value={acceptanceStatus}
                                        type="text"
                                        required
                                    >
                                        <option value="">Choose...</option>
                                        <option value="accepted">Approve</option>
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
                                {/*<Col>
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
                                </Col>*/}
                                <Col>
                                    <Button
                                        className="my-1 mr-sm-2"
                                        variant="outline-dark"
                                        onClick={this.submitReview}
                                    >
                                        <FontAwesomeIcon size="sm" icon={faEdit} />
                                        &nbsp; Submit
                                    </Button>
                                    {/*<Button className="my-1 mr-sm-2" variant="outline-danger">*/}
                                    {/*    <FontAwesomeIcon size="sm" icon={faTrash} />*/}
                                    {/*    &nbsp; Delete*/}
                                    {/*</Button>*/}
                                </Col>
                            </Row>
                        </Form>
                    </div>
                )}
                {Authentication.loggedAsSupplier() && (
                    <div style={{ marginLeft: '100px', marginTop: '40px' }}>
                        <hr />
                        <p>
                            <b>Update Payment Status</b>
                        </p>
                        <Form autoComplete="off">
                            <Row>
                                <Col>
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-2"
                                        onChange={this.formChange}
                                        name="paymentStatus"
                                        value={paymentStatus}
                                        required
                                    >
                                        <option value="">Choose...</option>
                                        <option value="paid">Paid</option>
                                        <option value="half-paid">Half Paid</option>
                                        <option value="pending">Pending</option>
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
                                {/*<Col>
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
                                </Col>*/}
                                <Col>
                                    <Button
                                        className="my-1 mr-sm-2"
                                        variant="outline-dark"
                                        onClick={this.changePaymentStatus}
                                    >
                                        <FontAwesomeIcon size="sm" icon={faEdit} />
                                        &nbsp; Submit
                                    </Button>
                                    {/*<Button className="my-1 mr-sm-2" variant="outline-danger">
                                        <FontAwesomeIcon size="sm" icon={faTrash} />
                                        &nbsp; Delete
                                    </Button>*/}
                                </Col>
                            </Row>
                        </Form>
                    </div>
                )}
                {Authentication.loggedAsSupplier() && (
                    <div style={{ marginLeft: '100px', marginTop: '40px' }}>
                        <hr />
                        <p>
                            <b>Update Receipt To Invoice</b>
                        </p>
                        <Form autoComplete="off">
                            <Row>
                                <Col>
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-2"
                                        custom
                                        onChange={this.formChange}
                                        name="type"
                                        value={type}
                                        type="text"
                                        required
                                    >
                                        <option value="">Choose...</option>
                                        <option value="Invoice">Invoice</option>
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
                                    <Button className="my-1 mr-sm-2"
                                            variant="outline-dark"
                                            onClick={this.changeType}
                                    >
                                        <FontAwesomeIcon size="sm" icon={faEdit} />
                                        &nbsp; Submit
                                    </Button>
                                    {/*<Button className="my-1 mr-sm-2" variant="outline-danger">
                                        <FontAwesomeIcon size="sm" icon={faTrash} />
                                        &nbsp; Delete
                                    </Button>*/}
                                </Col>
                            </Row>
                        </Form>
                    </div>
                )}
            </Container>
        );
    }
}

export default ReceiptDetailedView;
