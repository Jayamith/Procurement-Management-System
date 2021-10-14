import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    FormControl,
    InputGroup,
    Table,
    Button,
    Row,
    Col,
    Container
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCut, faEraser } from '@fortawesome/free-solid-svg-icons';
import AddReceiptDataService from "./AddReceiptDataService";
import Authentication from "../../authentication/Authentication";


class ViewAllItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplierId: Authentication.loggedUserId(),
            items: [],
        };
        this.getItems = this.getItems.bind(this);

    }

    componentDidMount() {
        this.getItems();
    }

    async getItems() {
        const response = await AddReceiptDataService.getItemsBySupplier(this.state.supplierId)
        this.setState({items:response.data})
    }

    render() {
        const { items } = this.state;
        const searchBox = {
            width: '250px',
            fontWeight: 'bold',
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            borderColor: '#000'
        };


        return (
            <React.Fragment>
                <Container style={{ marginTop: 25, border: '2px solid black' }}>
                    <h2 style={{textAlign: "center", color: '#2F4F4F'}}> Available Items </h2>
                <InputGroup size="sm" style={{ padding: 20, marginBottom: 40, width: '40%' }}>
                    <FontAwesomeIcon
                        style={{ marginTop: '8px', marginRight: 10 }}
                        icon={faSearch}
                    />
                    <FormControl
                        style={searchBox}
                        autoComplete="off"
                        placeholder="Search for Items..."
                        name="search"
                        value={this.state.search}
                        className=""
                    />
                    &nbsp;
                </InputGroup>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items && items
                        .map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.qty}</td>
                                <td>{item.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </Container>
            </React.Fragment>
        );
    }
}
export default withRouter(ViewAllItems);
