import React, { Component } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';

import Authentication from '../../authentication/Authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from "sweetalert";
import CreditNoteDataService from "./CreditNoteDataService";

class CreditNoteDetailedView extends Component {
    constructor(props) {
        super(props);
        this.state = {

            creditnote: {
                id: this.props.match.params.id,

                comment: '',
                amount: '',
                // expect_date: new Date(),
                items: [],
                status: '',
                site: -1,
                invoiceRef: '',
            },

            loading: false
        };
        this.getDetailedCreditNote = this.getDetailedCreditNote.bind(this);
        this.submitReview = this.submitReview.bind(this);

    }

    componentDidMount() {
        this.getDetailedCreditNote();
    }

    /*async checkForReceipt() {
        const {id} = this.state
        console.log(id)
        const response = await AddOrderDataService.checkForReceipt(id)
        this.setState({receiptStatus: response.data})
    }*/

    getDetailedCreditNote() {
        const { id, creditnote } = this.state;

        if (creditnote.id != null) {
            CreditNoteDataService.getCreditNoteById(id).then((res) => {
                console.log(res, 'res');
                creditnote['id'] = res.data.id;
                creditnote['comment'] = res.data.comment;
                creditnote['amount'] = res.data.amount;
                creditnote['invoiceRef'] = res.data.invoiceRef;
                creditnote['items'] = res.data.items;
                creditnote['status'] = res.data.status;
                creditnote['site'] = res.data.site.id;

                this.setState({
                    creditnote
                });
            });
        }
    }
    formChange = (event) => {
        const {creditnote} = this.state
        creditnote[event.target.name] = event.target.value
        this.setState(
            {
                creditnote,
                error: null
            },
            () => console.log('form changed')
        );
    };

    submitReview(e) {
        e.preventDefault();
        const { creditnote } = this.state;
        let formData = new FormData();
        formData.append('id', creditnote.id);
        formData.append('status', creditnote.status);

        CreditNoteDataService.reviewCreditNote(formData)
            .then((res) => {
                setTimeout(() => {
                    this.setState({ loading: false });
                    swal({
                        title: 'Credit Note Reviewed successfully !!!',
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
    getTotalCost = () => {
        let total = 0;
        this.state.creditnote.items.map((item) => (total += item.qty * item.price));
        return total;
    };

    render() {
        const {
            id,
            site,
            status,
            amount,
            comment,
            invoiceRef,
            items
        } = this.state.creditnote;
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
                    <Row>
                        <Col md={10}>
                            <h1>{id}</h1>
                        </Col>
                        <Col>

                        </Col>
                    </Row>

                    <p style={{ marginBottom: '0px' }}>
                        <b>Invoice :</b>
                        {invoiceRef}
                    </p>
                    <p style={{ marginBottom: '0px' }}>
                        <b>Status :</b>
                        {status}
                    </p>
                    <p style={{ marginBottom: '0px' }}>
                        <b>Amount :</b>
                        {amount}
                    </p>
                    <p>
                        <b>Site:</b> {site}
                    </p>
                    <p>Comment:{comment}</p>
                    <p>
                        <b> Items</b>
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
                                        custom
                                        onChange={this.formChange}
                                        name="status"
                                        value={status}
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

export default CreditNoteDetailedView;
