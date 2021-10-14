import React, { Component } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import './Footer.css';

class Footer extends Component {
  state = {};
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <div className="footer-container">
          &copy; 2021 Spendash, developed by FictionApps 2.0. All Rights
          Reserved.
        </div>
      </Navbar>
    );
  }
}

export default Footer;
