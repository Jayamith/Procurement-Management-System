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
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Authentication from "../../authentication/Authentication";
import AddOrderDataService from "../Order/AddOrderDataService";

class ReceiptList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            userId: Authentication.loggedUserId(),
            receipts: [],
        };
        this.getReceipts = this.getReceipts.bind(this);

    }

    componentDidMount() {
        this.getReceipts();
    }

    async getReceipts() {
        const {id}= this.state
        const response = await AddOrderDataService.getReceiptByOrderId(id)
        this.setState({receipts:response.data})
        console.log(response.data)
    }

    render() {
        const { receipts } = this.state;
        const searchBox = {
            width: '250px',
            fontWeight: 'bold',
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            borderColor: '#000'
        };

        const customBadge = (text) => {
            let color = text === 'pending' ? '#FDD017' : ((text === 'paid') ? '#3DF970':
                ((text === 'half-paid') ? '#3DED97':((text === 'accepted') ? '#B0FC38' :('#F9423D'))));
            return (
                <span style={{ backgroundColor: color, borderRadius: 4 }}>{text}</span>
            );
        };

        return (
            <React.Fragment>
                <Container style={{ marginTop: 25, border: '2px solid black' , height: 500 }}>
                    <h2 style={{textAlign: "center", color: '#2F4F4F'}}> Receipts </h2>
                <InputGroup size="sm" style={{ marginBottom: 40, width: '40%', padding: 20 }}>
                    <FontAwesomeIcon
                        style={{ marginTop: '8px', marginRight: 10 }}
                        icon={faSearch}
                    />
                    <FormControl
                        style={searchBox}
                        autoComplete="off"
                        placeholder="Search for Receipts..."
                        name="search"
                        value={this.state.search}
                        className=""
                    />
                    &nbsp;
                </InputGroup>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Receipt ID</th>
                        <th>Date</th>
                        <th>Acceptance Status</th>
                        <th>Payment Status</th>
                        <th>Delivery Type</th>
                        <th>Type</th>
                        <th> Actions </th>
                    </tr>
                    </thead>
                    <tbody>
                    {receipts && receipts
                        .map((receipt, index) => (
                            <tr key={index}>
                                <td>{receipt.id}</td>
                                <td>{receipt.date}</td>
                                <td>{customBadge(receipt.acceptanceStatus)}</td>
                                <td>{customBadge(receipt.paymentStatus)}</td>
                                <td>{receipt.fullDelivery ? "Full":"Partial"}</td>
                                <td>{receipt.type}</td>
                                <td>
                                    <Button variant="secondary" onClick={()=>this.props.history.push(`/receiptDetailedView/${receipt.id}`)}>
                                        View Receipt
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
export default withRouter(ReceiptList);
