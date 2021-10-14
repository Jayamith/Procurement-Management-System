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
import { faSearch, faCut, faEraser } from '@fortawesome/free-solid-svg-icons';
import OrderDataService from './OrderDataService';
import Authentication from '../../authentication/Authentication';
import SiteDataService from '../Header-Footer/SiteDataService';
import SiteSelector from '../Header-Footer/SiteSelector';

class SeniorOrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            selectedSite: '',
            sites: [],
            pendingOrders: [],
            acceptedOrders: []
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
            OrderDataService.getOrders("seniorApprovalRequired").then((response) => {
                this.setState({ pendingOrders: response.data });
            });

            OrderDataService.getOrders("approvedBySeniorStaff").then((response) => {
                this.setState({ acceptedOrders: response.data });
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

    onhandleClick2 = () => {
        return this.props.history.push('/creditNote');
    };

    onhandleClick = (id) => {
        return this.props.history.push(`/orderDetailedView/${id}`);
    };

    render() {
        const { acceptedOrders, selectedSite , pendingOrders} = this.state;
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
                <Container style={{ marginTop: 25, border: '2px solid black' }}>
                    <h3 style={{textAlign: "center", color: '#2F4F4F'}}> Pending Orders </h3>
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
                        {pendingOrders &&
                        pendingOrders
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
                                            View Order
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
                <Container style={{ marginTop: 25,marginBottom: 40, border: '2px solid black' }}>
                    <h3 style={{textAlign: "center", color: '#2F4F4F'}}> Accepted Orders </h3>
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
                        {acceptedOrders &&
                        acceptedOrders
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
                                            View Order
                                        </Button>
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
export default withRouter(SeniorOrderList);
