import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Container,
    Col,
    Row,
    FormControl,
    InputGroup,
    Table,
    Badge,
    Button
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCut, faEraser } from '@fortawesome/free-solid-svg-icons';
import Authentication from "../../authentication/Authentication";
import AddReceiptDataService from "./AddReceiptDataService";

class RejectedOrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:Authentication.loggedUserName(),
            rejectedOrders: [],
        };
        this.getOrderBySupplier = this.getOrderBySupplier.bind(this);
    }
    componentDidMount() {
        this.getOrderBySupplier();
    }

    handleClick = (id) => {
        return this.props.history.push(`/createReceipt/${id}`);
    };

    onhandleClick = (id) => {
        return this.props.history.push(`/supplierOrderView/${id}`);
    };

    getOrderBySupplier = async () => {
        const {id} = this.state
        let response = await AddReceiptDataService.getOrdersBySupplier('rejected',id)
        this.setState({rejectedOrders: response.data});
    }

    render() {
        const { rejectedOrders} = this.state;
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
                ((text === 'seniorApprovalRequired') ? '#3DED97' : ((text === 'checkedByProcStaff') ? '#03C04A':
                    ((text === 'approvedBySeniorStaff') ? '#B0FC38' :('#F9423D') ))));
            return (
                <span style={{ backgroundColor: color, borderRadius: 4 }}>{text}</span>
            );
        };

        return (
            <React.Fragment>
                <Container style={{ marginTop: 25 , border: '2px solid black'}}>
                    {/*<Button
                        variant="secondary"
                        style={{ marginBottom: 35 }}
                        onClick={this.handleClick}
                    >
                        + Create New Order
                    </Button>*/}
                    <h2 style={{textAlign: "center", color: '#2F4F4F'}}> Rejected Orders </h2>
                    <InputGroup size="sm" style={{
                        padding: 20,
                        marginBottom: 40,
                        width: '40%' }}>
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
                            <th>Site</th>
                            <th>Cost</th>
                            <th>Expected Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rejectedOrders.map((order) => (
                            <tr>
                                <td>{order.id}</td>
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
                                    {/*<Button
                                        variant="outline-success"
                                        style={{marginLeft:6}}
                                        onClick={() => this.handleClick(order.id)}
                                    >
                                        Create Receipt
                                    </Button>*/}
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
export default withRouter(RejectedOrderList);
