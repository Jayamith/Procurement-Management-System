import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    FormControl,
    InputGroup,
    Table,
    Button,
    Row,
    Col
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCut, faEraser } from '@fortawesome/free-solid-svg-icons';
import PaymentDataService from './PaymentDataService';

class PaymentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payments: []
        };
        this.refreshPayments = this.refreshPayments.bind(this);
    }


    componentDidMount() {
        this.refreshPayments();
    }

    // handleChange = ({ target: input }) => {
    //   this.setState({
    //     [input.name]: input.value
    //   });
    // };

    refreshPayments() {
        PaymentDataService.getPayment().then((response) => {
            this.setState({ payments: response.data });
        });
    }
    handleNewPayment = () => {
        return this.props.history.push(`/payment`);
    };

    render() {
        const { payments, selectedSite } = this.state;
        const searchBox = {
            width: '250px',
            fontWeight: 'bold',
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            borderColor: '#000'
        };

        const customBadge = (text) => {
            let color = text === 'Pending' ? '#F9423D' : '#3DF970';
            return (
                <span style={{ backgroundColor: color, borderRadius: 4 }}>{text}</span>
            );
        };

        return (
            <React.Fragment>
                {/* <SiteSelector
          handleChange={this.handleChange}
          selectedSite={selectedSite}
        /> */}
                <div style={{marginTop: 60}}>
                    <Button
                        variant="secondary"
                        style={{ marginBottom: 35 }}
                        onClick={this.handleNewPayment}
                    >
                        + Create New Payment
                    </Button>
                </div>
                <InputGroup size="sm" style={{ marginBottom: 40, width: '40%' }}>
                    <FontAwesomeIcon
                        style={{ marginTop: '8px', marginRight: 10 }}
                        icon={faSearch}
                    />
                    <FormControl
                        style={searchBox}
                        autoComplete="off"
                        placeholder="start typing..."
                        name="search"
                        value={this.state.search}
                        className=""
                    />
                    &nbsp;
                </InputGroup>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Invoice</th>
                        <th>Payment method</th>
                        <th>Amount</th>
                        <th>Site</th>
                    </tr>
                    </thead>
                     <tbody>
                     {payments &&
                     payments
                .map((payment, id) => (
                  <tr key={id}>
                    <td>{payment.id}</td>
                    <td>{payment.invoice}</td>
                    <td>{payment.method}</td>
                    <td>{payment.amount}</td>
                      <td>{payment.site.id}</td>
                    <td>
                          <Button
                            variant="secondary"
                            //onClick={() => this.onhandleClick(order.id)}
                          >
                            View Payment
                          </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
                </Table>
            </React.Fragment>
        );
    }
}
export default withRouter(PaymentList);