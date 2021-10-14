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
import CreditNoteDataService from "./CreditNoteDataService";


class CreditNoteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            site : this.props.match.params.site,
            supplier : this.props.match.params.supplier,
            userId: Authentication.loggedUserId(),
            creditnotes: [],
        };
        this.getCreditNotes = this.getCreditNotes.bind(this);
    }

    componentDidMount() {
        this.getCreditNotes();
    }

     getCreditNotes =  () => {
     CreditNoteDataService.getAllCreditNotes().then((res)=>{
         this.setState({creditnotes: res.data})
     })
    }

    handleCreditNoteCreate = () => {
        const {id,site,supplier} = this.state
        return this.props.history.push(`/creditNote/${id}/${site}/${supplier}`);
    };

    render() {
        const { creditnotes } = this.state;
        const searchBox = {
            width: '250px',
            fontWeight: 'bold',
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            borderColor: '#000'
        };

        const customBadge = (text) => {
            let color = text === 'pending' ? '#F9423D' : '#3DF970';
            return (
                <span style={{ backgroundColor: color, borderRadius: 4 }}>{text}</span>
            );
        };

        return (
            <React.Fragment>
                <Container style={{ marginTop: 25, border: '2px solid black' }}>
                    <h2 style={{textAlign: "center", color: '#2F4F4F'}}> Credit Notes </h2>
                    <InputGroup size="sm" style={{ padding: 20,marginBottom: 20, width: '40%' }}>
                        <FontAwesomeIcon
                            style={{ marginTop: '8px', marginRight: 10 }}
                            icon={faSearch}
                        />
                        <FormControl
                            style={searchBox}
                            autoComplete="off"
                            placeholder="Search for Credit Notes..."
                            name="search"
                            value={this.state.search}
                            className=""
                        />
                        &nbsp;
                    </InputGroup>
                    <Button
                        variant="secondary"
                        style={{ marginBottom: 35 }}
                        onClick={this.handleCreditNoteCreate}
                    >
                        + Create New Credit Note
                    </Button>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>Credit Note ID</th>
                            <th>Site</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th> Actions </th>
                        </tr>
                        </thead>
                        <tbody>
                        {creditnotes && creditnotes
                            .map((creditnote, index) => (
                                <tr key={index}>
                                    <td>{creditnote.id}</td>
                                    <td>{creditnote.site.id}</td>
                                    <td>{customBadge(creditnote.status)}</td>
                                    <td>{creditnote.amount}</td>
                                    <td>
                                        <Button variant="secondary" onClick={()=>this.props.history.push(`/creditNoteDetailedView`)}>
                                            View Credit Note
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
export default withRouter(CreditNoteList);
