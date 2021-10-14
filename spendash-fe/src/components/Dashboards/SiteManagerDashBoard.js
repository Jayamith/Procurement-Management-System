import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Button, Col, Container, Row, Card} from 'react-bootstrap';

import Authentication from "../../authentication/Authentication";

class SiteManagerDashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:Authentication.loggedUserName(),
            orders: [],
            approvedOrders: [],
        };
    }

    handleItemCreate = () => {
        return this.props.history.push(`/createOrder`);
    };
    viewAccepted = () => {
        return this.props.history.push(`/acceptedOrders`);
    };
    viewReceived = () => {
        return this.props.history.push(`/supplierOrders`);
    };
    viewItems = () => {
        return this.props.history.push(`/supplierAllItems`);
    };
    viewRejected = () => {
        return this.props.history.push(`/rejectedOrders`);
    }

    render() {
        return (
            <React.Fragment>
                <div className="card"  style={{
                    marginTop: 20,
                    border: '2px solid black',
                    paddingTop: 20,
                    paddingBottom: 80,
                    backgroundColor: '#D3D3D3'
                }}>
                    <h2 style={{textAlign:"center", marginBottom: 40}}>Site Manager DashBoard</h2>
                    <Row>
                        <div style={{marginLeft: 30}}>
                            <Col md={4}>
                                <div className="card " style={{width: 300}}>
                                    <div className="card-header white">
                                        <h5 className="font-weight-bold mb-0" style={{textAlign: "center"}}>
                                            Create New Order
                                        </h5>
                                        <Button
                                            style={{marginLeft: 100, marginTop: 40, marginBottom: 20}}
                                            variant="info"
                                            onClick={this.viewAccepted}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </div>
                        <Col md={4}>
                            <div className="card " style={{width: 300, marginLeft:25}}>
                                <div className="card-header white">
                                    <h5 className="font-weight-bold mb-0" style={{textAlign: "center"}}>
                                        Received Orders
                                    </h5>
                                    <Button
                                        style={{marginLeft: 100, marginTop: 40, marginBottom: 20}}
                                        variant="info"
                                        onClick={this.viewReceived}
                                    >
                                        View
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="card " style={{width: 300}}>
                                <div className="card-header white">
                                    <h5 className="font-weight-bold mb-0" style={{textAlign: "center"}}>
                                        Rejected Orders
                                    </h5>
                                    <Button
                                        style={{marginLeft: 100, marginTop: 40, marginBottom: 20}}
                                        variant="info"
                                        onClick={this.viewRejected}
                                    >
                                        View
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div style={{marginTop: 20}}>
                        <Row>
                            <div style={{marginLeft: 230}}>
                                <Col md={6}>
                                    <div className="card " style={{width: 300}}>
                                        <div className="card-header white">
                                            <h5 className="font-weight-bold mb-0" style={{textAlign: "center"}}>
                                                Add Items
                                            </h5>
                                            <Button
                                                style={{marginLeft: 100, marginTop: 40, marginBottom: 20}}
                                                variant="info"
                                                onClick={this.handleItemCreate}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </div>
                            <Col md={6}>
                                <div className="card " style={{width: 300}}>
                                    <div className="card-header white">
                                        <h5 className="font-weight-bold mb-0" style={{textAlign: "center"}}>
                                            View Items
                                        </h5>
                                        <Button
                                            style={{marginLeft: 100, marginTop: 40, marginBottom: 20}}
                                            variant="info"
                                            onClick={this.viewItems}
                                        >
                                            View
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default withRouter(SiteManagerDashBoard);

