import React, { Component } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';

import Authentication from '../../authentication/Authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faEye, faTrash} from '@fortawesome/free-solid-svg-icons';
import OrderDataService from './OrderDataService';
import AddOrderDataService from "./AddOrderDataService";
import AddReceiptDataService from "../Supplier/AddReceiptDataService";
import swal from "sweetalert";

class OrderDetailedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      order: {
        id: -1,
        comment: '',
        cost: '',
        // expect_date: new Date(),
        items: [],
        status: '',
        site_id: -1,
        supplier: '',
        lastModifiedBy: '',
        deliveryAddress: ''
      },
      receiptStatus:false,
      loading: false
    };
    this.getDetailedOrder = this.getDetailedOrder.bind(this);
    this.checkForReceipt = this.checkForReceipt.bind(this);
    this.submitReview = this.submitReview.bind(this);
    // this.submitBtnClicked = this.submitBtnClicked.bind(this);
    // this.deleteBtnClicked = this.deleteBtnClicked.bind(this);
  }

  componentDidMount() {
    this.checkForReceipt();
    this.getDetailedOrder();
  }

  async checkForReceipt() {
    const {id} = this.state
    console.log(id)
    const response = await AddOrderDataService.checkForReceipt(id)
    this.setState({receiptStatus: response.data})
  }

  getDetailedOrder() {
    const { id, order } = this.state;

    if (order.id != null) {
      OrderDataService.getOrderById(id).then((res) => {
        console.log(res, 'res');
        order['id'] = res.data.id;
        order['comment'] = res.data.comment;
        order['cost'] = res.data.cost;
        order['expect_date'] = res.data.expectedDate;
        order['items'] = res.data.items;
        order['status'] = res.data.status;
        order['site_id'] = res.data.site.id;
        order['deliveryAddress'] = res.data.site.address;
        order['supplier'] = res.data.supplier.name;
        order['lastModifiedBy'] = res.data.lastModifiedBy.name;

        this.setState({
          order
        });
      });
    }
  }
  formChange = (event) => {
    const {order} = this.state
    order[event.target.name] = event.target.value
    this.setState(
      {
      order,
        error: null
      },
      () => console.log('form changed')
    );
  };

  submitReview(e) {
    e.preventDefault();
    const { order } = this.state;
    let formData = new FormData();
    formData.append('id', order.id);
    formData.append('status', order.status);

    {Authentication.loggedAsSenior() && (
    OrderDataService.reviewOrder(formData)
        .then((res) => {
          setTimeout(() => {
            this.setState({ loading: false });
            swal({
              title: 'Order Reviewed successfully !!!',
              icon: 'success',
              button: 'Ok'
            }).then((result) => {
              return this.props.history.push(`/seniorOrderList`);
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
        })
    )}

    {Authentication.loggedAsProcurement() && (
        OrderDataService.reviewOrder(formData)
            .then((res) => {
              setTimeout(() => {
                this.setState({ loading: false });
                swal({
                  title: 'Order Reviewed successfully !!!',
                  icon: 'success',
                  button: 'Ok'
                }).then((result) => {
                  return this.props.history.push(`/procOrderList`);
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
            })
    )}
  }

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
      status,
      supplier,
      comment,
      cost,
      expect_date,
      items,
      deliveryAddress
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
            border: '2px solid black',
            padding: 40
          }}
        >
          <Row>
            <Col md={10}>
              <h1>Order ID : {id}</h1>
            </Col>
            <Col>
              {this.state.receiptStatus &&
              <Button variant="secondary"
                      className="my-1 mr-sm-2"
                      onClick={()=>this.props.history.push(`/receiptList/${id}`)}>
                <FontAwesomeIcon size="sm" icon={faEye} />
                &nbsp; View Receipts
              </Button>
              }
            </Col>
          </Row>

          <p style={{marginTop: 20, marginBottom: '0px' }}>
            <h5>Site ID :  <b>{site_id}</b></h5>
          </p>
          <p style={{ marginBottom: '0px' }}>
            <h5>Status :  <b>{status}</b></h5>
          </p>
          <p>
            <h5>Supplier :  <b>{supplier}</b></h5>
          </p>
          <p style={{ marginBottom: '20px', marginTop: '20px', color: '#528AAE' }}>
            <h5> * Delivery Address :  <b>{deliveryAddress}</b></h5>
          </p>
          <p style={{ marginBottom: '20px', marginTop: '20px', color: '#DC143C' }}>
            <h5> * Expected Delivery Date : <b>{expect_date}</b></h5>
          </p>
          <p style={{ marginBottom: '20px', marginTop: '20px' }}>
            <h6>Comment :  <b>{comment}</b></h6>
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

          <h6>Lastly Modified By : {lastModifiedBy}</h6>
        </div>
        {Authentication.loggedAsSenior() && (
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
        {Authentication.loggedAsProcurement() && (
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
                      {cost < 100000 && (
                          <option value="approved">Approve</option>
                      )}
                      <option value="rejected">Reject</option>
                      <option value="seniorApprovalRequired">Senior Approval Required</option>
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
                    <Button className="my-1 mr-sm-2"
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

export default OrderDetailedView;
