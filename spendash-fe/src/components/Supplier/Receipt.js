import React, { Component } from 'react';
import {
  Form,
  Container,
  Button,
  Modal,
  Spinner,
  Col,
  Row, Card
} from 'react-bootstrap';
import swal from 'sweetalert';
import Joi from 'joi-browser';

import InputField from '../../asset/commons/InputField';
import AddReceiptDataService from './AddReceiptDataService';
import ItemCard from '../Items/ItemCard';
import Authentication from "../../authentication/Authentication";
import SelectedItems from "../Items/SelectedItems";

class CreateReceipt extends Component {
  constructor(props) {
    super(props);
    //controlled inputs, should not be null as well..[ERR-LOG 01]
    this.state = {
      receipt: {
        id: this.props.match.params.id,
        order: this.props.match.params.id,
        site: 3,
        acceptanceStatus: 'pending',
        acceptedBy: 'user',
        type: 'Good Receipt',
        paymentStatus: 'pending',
        supplier: Authentication.loggedUserId(),
        cost: '',
        isFullDelivery: ''
      },
      items: [],
      availableItems: [],
      selectedItems: [],
      loading: false,
      buttonError: '',
      errors: {}
    };
    this.createReceipt = this.createReceipt.bind(this);
    //this.getReceiptById = this.getReceiptById.bind(this);
    this.updateReceipt = this.updateReceipt.bind(this);
    this.validate = this.validate.bind(this);
    this.getOrderDetails = this.getOrderDetails.bind(this);
    this.getAllItemsBySupplier = this.getAllItemsBySupplier.bind(this);
    this.addSelected = this.addSelected.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);

  }

  componentDidMount() {
    //this.getReceiptById();
    this.getOrderDetails();
    this.getAllItemsBySupplier();
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

  getTotalCost = () => {
    localStorage.removeItem('cost')
    let total = 0;
    this.state.selectedItems.map((item) => (total += item.qty * item.price));
    localStorage.setItem('cost',total)
    return total;
  };

  getAllItemsBySupplier() {
    const { supplier } = this.state.receipt;
    AddReceiptDataService.getItemsBySupplier(supplier).then((res) => {
      this.setState({
        availableItems: res.data.map((item) => {return {...item, qty:1}})
      });
    });
  }

  getOrderDetails() {
    const { id, order } = this.state.receipt;
      AddReceiptDataService.getOrderDetailsByID(order).then((res) => {
        console.log("items",res.data.items)
        this.setState({
          items: res.data.items
        });
      });
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

  handleChange = ({ target: input }) => {
    let receipt = { ...this.state.receipt };
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    receipt[input.name] = input.value;
    this.setState(
      {
        receipt,
        errors
      },
      () => console.log(this.state)
    );
  };

  // Joi.ref('password')
  //Joi@13.4 Schema [Validation Library]
  Schema = {
    id: Joi,
    order: Joi,
    site: Joi,
    acceptanceStatus: Joi.string().required().label('Status'),
    type: Joi.string().required().label('Type'),
    paymentStatus: Joi.string()
      .required()
      .label('Payment'),
    cost: Joi.string().required().label('Cost'),
    isFullDelivery: Joi.required()
  };

  validate() {
    const abortEarly = { abortEarly: false }; //1st Error priority disabled
    const { error } = Joi.validate(this.state.order, this.Schema, abortEarly);
    if (!error) return null; //if no result error return null
    const errors = {};
    for (let item of error.details) {
      //traversing in Joi error
      errors[item.path[0]] = item.message; //target input is given priority or first object [0]
    }
    return errors;
  }

  validateField({ name, value }) {
    const miniReceipt = { [name]: value }; //Computed operators used [ES6]
    const miniSchema = { [name]: this.Schema[name] }; //Extracted property from Schema
    const { error } = Joi.validate(miniReceipt, miniSchema);
    return error ? error.details[0].message : null;
  }

  createReceipt(event) {
    event.preventDefault();
    const { receipt } = this.state;
    this.setState({ loading: true });
    //Object was used, Code 400 err, [ERR-LOG-02]
    // It uses the same format a form would use if the encoding type were set to "multipart/form-data".
    let formData = new FormData();
    formData.append('order', receipt.order);
    formData.append('site', receipt.site);
    formData.append('acceptanceStatus', receipt.acceptanceStatus);
    formData.append('type', receipt.type);
    formData.append('paymentStatus', receipt.paymentStatus);
    formData.append('cost', receipt.cost);
    formData.append('isFullDelivery', receipt.isFullDelivery);
    formData.append('acceptedBy', receipt.acceptedBy);
    formData.append('supplier', receipt.supplier);
    formData.append('items', JSON.stringify(this.state.selectedItems) );

    AddReceiptDataService.createReceipt(formData)
      .then((res) => {
        setTimeout(() => {
          this.setState({ loading: false });
          swal({
            title: 'Receipt Created successfully !!!',
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
          text: 'Something went wrong,please try again later.',
          error: 'error',
          button: 'ok',
          icon: 'error'
        });
      });
  }

 /* getReceiptById() {
    const { receipt } = this.state;

    if (receipt.id != null) {
      AddReceiptDataService.getReceiptForId(receipt.id).then((res) => {
        receipt['orderI'] = res.data.order;
        receipt['site'] = res.data.site;
        receipt['acceptanceStatus'] = res.data.acceptanceStatus;
        receipt['type'] = res.data.type;
        receipt['paymentStatus'] = res.data.paymentStatus;
        receipt['cost'] = res.data.cost;
        receipt['isFullDelivery'] = res.data.isFullDelivery;
        receipt['acceptedBy'] = res.data.acceptedBy;
        receipt['supplier'] = res.data.supplier;
        this.setState(
          {
            receipt
          },
          () => {}
        );
      });
    }
  }
*/
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

  updateReceipt(event) {
    event.preventDefault();
    const { receipt } = this.state;

    this.setState({ loading: true });
    //Object was used, Code 400 err, [ERR-LOG-02]
    // It uses the same format a form would use if the encoding type were set to "multipart/form-data".
    let formData = new FormData();
    formData.append('order', receipt.order);
    formData.append('site', receipt.site);
    formData.append('type', receipt.type);
    formData.append('acceptanceStatus', receipt.acceptanceStatus);
    formData.append('paymentStatus', receipt.paymentStatus);
    formData.append('cost', receipt.cost);
    formData.append('isFullDelivery', receipt.isFullDelivery);
    formData.append('acceptedBy', receipt.acceptedBy);
    formData.append('supplier', receipt.supplier);

    AddReceiptDataService.updateReceipt(receipt.id, formData)
      .then((res) => {
        setTimeout(() => {
          this.setState({ loading: false });
          swal({
            title: 'Order updated successfully !!!',
            icon: 'success',
            button: 'Ok'
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
          icon: 'error'
        });
      });
  }

  displayError = (msg) => {
    this.setState({
      buttonError: msg
    });
  };

  render() {
    const { errors, receipt, buttonError, items, availableItems} = this.state; //properties
    const {
      order,
      site,
      type,
      acceptanceStatus,
      paymentStatus,
      cost,
      isFullDelivery,
      acceptedBy,
      supplier
    } = receipt;

    const { createReceipt } = this; //methods
    return (
      <div>
        <Container
          style={{
            marginTop: '30px',
            marginBottom: '30px',
            border: '1px solid black'
          }}
        >
          <Form autoComplete="off" onSubmit={createReceipt}>
            {/* 1st Row starts */}
            <div
              style={{
                fontWeight: 600,
                fontSize: '25px',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              NEW RECEIPT
            </div>
            <Row
              style={{ marginTop: '20px' }}
              className="justify-content-md-center"
            >
              <Col>
                <InputField
                  FormLabel="Order ID"
                  name="order"
                  value={order}
                  handleChange={this.handleChange}
                  type="text"
                  placeholder="Order ID"
                  trap={true}
                  error={errors.order}
                />
              </Col>
              <Col>
                <InputField
                  FormLabel="Site ID"
                  name="site"
                  value={site}
                  handleChange={this.handleChange}
                  type="text"
                  placeholder="Site ID"
                  trap={true}
                  error={errors.site}
                />
              </Col>
            </Row>
            <Row
              style={{ marginTop: '10px' }}
              className="justify-content-md-center"
            >
              <Col>
                <Form.Label>Type</Form.Label>
                <Form.Control
                    disabled={true}
                  onChange={this.handleChange}
                  name="type"
                  value={type}
                  type="text"
                  as="select"
                  className="paperregistration-form-input"
                >
                  <option value="Goods Receipt">Goods Receipt</option>
                </Form.Control>
                <Form.Text className="text-muted"> Select Type </Form.Text>
              </Col>
              <Col>
                <Form.Label>Acceptance Status</Form.Label>
                <Form.Control
                    disabled={true}
                  onChange={this.handleChange}
                  name="acceptanceStatus"
                  value={acceptanceStatus}
                  type="text"
                  as="select"
                  className="paperregistration-form-input"
                >
                  {/*<option value="">- Select -</option>
                  <option value="Accepted">Accepted</option>*/}
                  <option value="pending">Pending</option>
                  {/*<option value="Declined">Declined</option>*/}
                </Form.Control>
                <Form.Text className="text-muted"> Select Status </Form.Text>
              </Col>
            </Row>
            <Row
              style={{ marginTop: '10px' }}
              className="justify-content-md-center"
            >
              <Col>
                <InputField
                  FormLabel="Total Amount"
                  name="cost"
                  value={cost}
                  handleChange={this.handleChange}
                  FormText="Total Cost Of Order"
                  type="number"
                  placeholder="Total Cost Of Order"
                  trap={false}
                  error={errors.cost}
                />
              </Col>
              <Col>
                <Form.Label>Payment Status</Form.Label>
                <Form.Control
                    disabled={true}
                  onChange={this.handleChange}
                  name="paymentStatus"
                  value={paymentStatus}
                  type="text"
                  as="select"
                  className="paperregistration-form-input"
                >
                  {/*<option value="">- Select -</option>
                  <option value="Paid">Paid</option>*/}
                  <option value="pending">Not Paid</option>
                </Form.Control>
                <Form.Text className="text-muted">
                  {' '}
                  Select Payment Status{' '}
                </Form.Text>
              </Col>
            </Row>
            <Row
              style={{ marginTop: '10px' }}
              className="justify-content-md-center"
            >
              <Col>
                <Form.Label>Full Order Delivery</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  name="isFullDelivery"
                  value={isFullDelivery}
                  type="text"
                  as="select"
                  className="paperregistration-form-input"
                >
                  <option value="">- Select -</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Form.Control>
                <Form.Text className="text-muted">
                  {' '}
                  Select Order Delivery Status{' '}
                </Form.Text>
              </Col>
              <Col xs={6} md={6}>
                <InputField
                  FormLabel="Accepted By"
                  name="acceptedBy"
                  value={acceptedBy}
                  handleChange={this.handleChange}
                  FormText="Accepted User"
                  type="text"
                  placeholder="Accepted User"
                  trap={true}
                  error={errors.acceptedBy}
                />
              </Col>
            </Row>
            <Row>
              <Col md="auto">
                <div
                  style={{
                    marginBottom: '20px',
                    textAlign: 'center',
                    height: '300px',
                    padding:10,

                  }}
                >
                  <Card>
                    <Card.Header >
                      <h6>Ordered Items</h6>
                    </Card.Header>
                  {items.map((item,index) => (
                     <div style={{margin:10}}>
                       <Card key={index} >
                         <Container>
                           <Row direction="row" >
                             <Col>
                               {item.name}
                             </Col>
                             <Col>
                               {item.qty}
                             </Col>
                           </Row>
                         </Container>
                       </Card>
                     </div>
                  ))}
                  </Card>
                </div>
              </Col >
              <Col md={3}>
                <div style={{marginTop: 10}}>
                  <Card>
                    <Card.Header >
                      <h6>Available Items</h6>
                    </Card.Header>
                    <div
                        style={{
                          marginBottom: '20px',
                          textAlign: 'center',
                          padding:10,
                        }}
                    >
                      {availableItems.map((item) => (
                          <ItemCard item={item} addSelected={this.addSelected} />
                      ))}
                    </div>
                  </Card>
                </div>
              </Col>
              <Col md={6}>
                <div
                  style={{
                    marginBottom: '20px',
                    textAlign: 'center',
                    height: '300px',
                    padding:10,
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
            <Button
              style={{  marginBottom: 8 }}
              variant="secondary"
              onClick={this.createReceipt}
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
export default CreateReceipt;
