import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  FormControl,
  InputGroup,
  Table,
  Button,
  Row,
  Col, Container
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faCut, faEraser, faEye, faPenSquare} from '@fortawesome/free-solid-svg-icons';
import OrderDataService from './OrderDataService';
import Authentication from '../../authentication/Authentication';
import SiteDataService from '../Header-Footer/SiteDataService';
import SiteSelector from '../Header-Footer/SiteSelector';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      selectedSite: '',
      sites: [],
      acceptedOrders: [],
    };
    this.refreshOrders = this.refreshOrders.bind(this);
  }

  componentDidMount() {
    this.refreshOrders();
  }

  handleChange = ({ target: input }) => {
    this.setState({
      [input.name]: input.value
    });
  };

  refreshOrders() {
    let formData = new FormData();
    formData.append('status', 'pending');

    if(Authentication.loggedAsSenior()){
      OrderDataService.getOrders( "seniorApprovalRequired" ).then((response) => {
        this.setState({ orders: response.data });
      });
      OrderDataService.getOrders( "approvedBySeniorStaff" ).then((response) => {
        this.setState({ acceptedOrders: response.data });
      });
    }

    if(Authentication.loggedAsProcurement()){
      OrderDataService.getOrders("pending").then((response) => {
        this.setState({ orders: response.data });
      });
    }
    if(Authentication.loggedAsSiteManager()) {
      OrderDataService.getAllOrders().then((response) => {
        this.setState({orders: response.data});
      });
    }
    console.log(this.state.orders);
  }
  handleNavCreate = () => {
    return this.props.history.push(`/createOrder`);
  };

  handleClick = (id) => {
    return this.props.history.push(`/orderDetailedView/${id}`);
  };

  onUpClick = (id) => {
    return this.props.history.push(`/createOrder/${id}`);
  };

  onhandleClick = (id) => {
    return this.props.history.push(`/orderDetailedView/${id}`);
  };

  render() {
    const { orders, selectedSite , acceptedOrders} = this.state;
    const searchBox = {
      width: '250px',
      fontWeight: 'bold',
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: 'none',
      borderColor: '#000'
    };

    const customBadge = (text) => {
      let color = text === 'pending' ? '#FDD017' : ((text === 'approvedBySupplier') ? '#3DF970':
          ((text === 'seniorApprovalRequired') ? '#EE9A4D' : ((text === 'approvedByProcurementStaff') ? '#03C04A':
              ((text === 'approvedBySeniorStaff') ? '#B0FC38' :('#F9423D') ))));
      return (
        <span style={{ backgroundColor: color, borderRadius: 4 }}>{text}</span>
      );
    };

    return (
      <React.Fragment>
        <Container style={{ marginTop: 25, border: '2px solid black' }}>
            <SiteSelector
                handleChange={this.handleChange}
                selectedSite={selectedSite}
            />
              {Authentication.loggedAsSiteManager() &&
              <Button
                  variant="secondary"
                  style={{ marginBottom: 35 }}
                  onClick={this.handleNavCreate}
              >
                + Create New Order
              </Button>
              }

        <InputGroup size="sm" style={{ marginBottom: 40, width: '40%' }}>
          <FontAwesomeIcon
            style={{ marginTop: '8px', marginRight: 10 }}
            icon={faSearch}
          />
          <FormControl
            style={searchBox}
            autoComplete="off"
            placeholder="Search for Orders..."
            name="search"
            value={this.state.search}
            className=""
          />
          &nbsp;
        </InputGroup>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Supplier</th>
              <th>Site</th>
              <th>Cost</th>
              <th>Expected Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders
                .filter(
                  (item) =>
                    selectedSite === item.site.name || selectedSite === ''
                )
                .map((order, id) => (
                  <tr key={id}>
                    <td>{order.id}</td>
                    <td>{order.supplier.name}</td>
                    <td>{order.site.name}</td>
                    <td>{order.cost}</td>
                    <td>{order.date}</td>
                    <td>{customBadge(order.status)}</td>
                    <td>
                          <Button
                            variant="secondary"
                            onClick={() => this.onhandleClick(order.id)}
                          >
                            <FontAwesomeIcon size="sm" icon={faEye} />
                            &nbsp; View
                          </Button>
                      {order.status !== 'approvedBySupplier' &&
                        <Button
                            style={{marginLeft: 20}}
                            variant="warning"
                            onClick={() => this.onUpClick(order.id)}
                        >
                          <FontAwesomeIcon size="sm" icon={faPenSquare} />
                          &nbsp; Update
                        </Button>
                      }
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
        </Container>
      </React.Fragment>
    );
  }
}
export default withRouter(OrderList);
