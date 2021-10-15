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
import Authentication from "../../authentication/Authentication";
import AddOrderDataService from "../Order/AddOrderDataService";
import {searchFilter} from "../../utils/searchFilter";


class ViewAllSuppliers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: Authentication.loggedUserId(),
            suppliers: [],
            filterName:''
        };
        this.getSuppliers = this.getSuppliers.bind(this);

    }

    componentDidMount() {
        this.getSuppliers();
    }

    async getSuppliers() {
        const response = await AddOrderDataService.getAllSuppliers()
        this.setState({suppliers:response.data})
    }

    handleChange = ({ target: input }) => {
        this.setState({
            [input.name]: input.value
        });
    };

    render() {
        const { suppliers } = this.state;
        const searchBox = {
            width: '250px',
            fontWeight: 'bold',
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            borderColor: '#000'
        };

        const filtereredData = searchFilter(
            suppliers,
            this.state.filterName,
            'name'
        )

        return (
            <React.Fragment>
                <Container style={{ marginTop: 25, border: '2px solid black' }}>
                    <h2 style={{textAlign: "center", color: '#2F4F4F'}}> Suppliers </h2>
                <InputGroup size="sm" style={{ padding:20, marginBottom: 40, width: '40%' }}>
                    <FontAwesomeIcon
                        style={{ marginTop: '8px', marginRight: 10 }}
                        icon={faSearch}
                    />
                    <FormControl
                        style={searchBox}
                        autoComplete="off"
                        placeholder="Search for Suppliers..."
                        onChange={this.handleChange}
                        name="filterName"
                        value={this.state.filterName}
                        className=""
                    />
                    &nbsp;
                </InputGroup>
                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                    <tr>
                        <th>Supplier Name</th>
                        <th>Address</th>
                        <th>Contact</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtereredData && filtereredData
                        .map((supplier, index) => (
                            <tr key={index}>
                                <td>{supplier.name}</td>
                                <td>{supplier.address}</td>
                                <td>{supplier.contact}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </Container>
            </React.Fragment>
        );
    }
}
export default withRouter(ViewAllSuppliers);
