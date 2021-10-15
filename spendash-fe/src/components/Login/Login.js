import React, { Component } from 'react';
import { Form, Container, Button, Modal, Spinner } from 'react-bootstrap';
import AuthenticationDataService from '../../authentication/AthenticationDataService';
import Authentication from '../../authentication/Authentication';
import './Login.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null,
      loading: false
    };

    this.loginClicked = this.loginClicked.bind(this);
    this.errorOccured = this.errorOccured.bind(this);
  }

  errorOccured(msg) {
    this.setState({ error: msg });
  }

  loginClicked(event) {
    event.preventDefault();

    if (this.state.username === '') {
      this.errorOccured('UserName cannot be empty');
      return;
    } else if (this.state.password === '') {
      this.errorOccured('Password cannot be empty');
      return;
    }

    this.setState({ loading: true }, () => console.log(''));
    let formData = new FormData();
    formData.append('userName', this.state.username);
    formData.append('password', this.state.password);

    AuthenticationDataService.login(formData)
      .then((response) => {
        this.setState({ loading: false });
        if (
          response.data != null &&
          response.data.password === this.state.password
        ) {
          Authentication.successfulLogin(response.data);
          if (Authentication.loggedAsSiteManager()) {
            this.props.history.push('/siteOrders');
          } else if (Authentication.loggedAsSupplier()) {
            this.props.history.push('/supplierDashBoard');
          } else if (Authentication.loggedAsSenior()) {
            this.props.history.push('/seniorOrderList');
          } else if (Authentication.loggedAsProcurement()){
            this.props.history.push('/procOrderList');
          } else {
            this.errorOccured('Invalid UserName or Password');
          }
        } else {
          this.setState({ loading: false });
          swal({
            title: 'Oops!',
            text: 'Invalid password.',
            icon: 'error',
            button: 'Ok'
          });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        swal({
          title: 'Oops!',
          text: "Looks like you don't have an account.",
          icon: 'error',
          button: 'Ok'
        });
      });
  }

  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
        error: null
      },
      () => console.log(this.state)
    );
  };

  render() {
    return (
      <div style={{marginTop: 40}}>
        <div className="login-title">LOGIN</div>

        <Container className="login-container">
          <Form autoComplete="off" onSubmit={this.loginClicked}>
            <Form.Group controlId="email" className="login-form-group">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                name="username"
                value={this.state.username}
                type="username"
                placeholder="username"
                className="login-form-input"
              />
              <Form.Text className="text-muted">UserName</Form.Text>
            </Form.Group>
            <Form.Group controlId="password" className="login-form-group">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                name="password"
                value={this.state.password}
                type="password"
                placeholder="password"
                className="login-form-input"
              />
            </Form.Group>
            <Button type="submit" variant="dark" className="login-button">
              Login
            </Button>
            <br />
            {this.state.error && (
              <p className="login-error">{this.state.error}</p>
            )}
            <Link
              style={{
                textDecoration: 'none',
                fontSize: '14px',
                marginTop: '0px'
              }}
              to="/register"
            >
              Don't have an account?
            </Link>
          </Form>
        </Container>

        <Modal
          centered
          size="sm"
          show={this.state.loading}
          onHide={() => console.log('please wait...')}
        >
          <Modal.Header>
            <Modal.Title>
              <Spinner animation="border" /> Please wait...
            </Modal.Title>
          </Modal.Header>
        </Modal>
      </div>
    );
  }
}

export default Login;
