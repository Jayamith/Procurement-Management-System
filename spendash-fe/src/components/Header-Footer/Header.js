import React, { Component } from 'react';
import { Image, Nav, Navbar, Container } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import logo from '../../asset/logo.jpg';
import Authentication from "../../authentication/Authentication";

class Header extends Component {
  state = {};
  render() {
    return (
      <Navbar bg="secondary" expand="lg">
        <Container>
          <Navbar.Brand> <h3>Spendash</h3></Navbar.Brand>
          <Navbar.Brand href="#home">
            <img
              width="60px"
              height="60px"
              style={{ backgroundColor: '#808080', marginRight: '15px'}}
              src={logo}
              rounded
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {Authentication.loggedAsSupplier() && <NavLink className="nav-link header-item" to="/supplierDashBoard">DashBoard</NavLink>}
              {Authentication.loggedAsSupplier() && <NavLink className="nav-link header-item" to="/supplierOrders">Orders</NavLink>}
              {Authentication.loggedAsSiteManager()  && <NavLink className="nav-link header-item" to="/orderList">Orders</NavLink>}
              {Authentication.loggedAsSiteManager()  && <NavLink className="nav-link header-item" to="/payments">Payments</NavLink>}
              {Authentication.loggedAsProcurement()  && <NavLink className="nav-link header-item" to="/orderList">Orders</NavLink>}
              {Authentication.loggedAsSupplier() && <NavLink className="nav-link header-item" to="/supplierAllItems">Items</NavLink>}
              {Authentication.loggedAsSiteManager()  && <NavLink className="nav-link header-item" to="/allSuppliers">Suppliers</NavLink>}
              {Authentication.loggedAsProcurement()  && <NavLink className="nav-link header-item" to="/allSuppliers">Suppliers</NavLink>}
              {Authentication.isUserLoggedIn() && <NavLink className="nav-link header-item" onClick={() => Authentication.logout()} to="/">Logout</NavLink>}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default withRouter(Header);
