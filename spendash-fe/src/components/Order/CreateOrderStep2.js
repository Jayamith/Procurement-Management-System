import React, { Component } from 'react';
import { Container, Col, Row, FormControl, InputGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCut, faEraser } from '@fortawesome/free-solid-svg-icons';
import ItemCard from '../Items/ItemCard';
import SelectedItems from '../Items/SelectedItems';
import OrderDataService from './OrderDataService';

class CreateOrderStep2 extends Component {
  constructor(props) {
    super(props);
    //controlled inputs, should not be null as well..[ERR-LOG 01]
    this.state = {
      orders: [],
      selected: []
    };
    this.refreshOrders = this.refreshOrders.bind(this);
    this.addSelected = this.addSelected.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
  }

  componentDidMount() {
    this.refreshOrders();
  }

  refreshOrders() {
    OrderDataService.getOrders().then((response) => {
      this.setState({ orders: response.data });
    });
  }

  addSelected(item) {
    const { selected } = this.state;
    let prevSelected = selected;
    let exist = selected.find((val) => val.id === item.id);
    if (!exist) {
      this.setState({ selected: [...prevSelected, item] });
    } else {
      return;
    }
  }

  deleteSelected(id) {
    const { selected } = this.state;

    let newSelected = selected.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });

    this.setState({ selected: newSelected });
  }

  handleChange = ({ target: input }) => {
    let service = { ...this.state.service };
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    service[input.name] = input.value;
    this.setState(
      {
        service,
        errors
      },
      () => console.log(this.state)
    );
  };

  render() {
    const { orders } = this.state;

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
        <Container style={{ marginBottom: 200 }}>
          <Row style={{ marginTop: 80 }}>
            <Col xs={5}>
              <InputGroup size="sm" style={{ marginBottom: 10 }}>
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
              {orders.map((item) => (
                <ItemCard item={item} addSelected={this.addSelected} />
              ))}
            </Col>
            <Col xs={2} />
            <Col xs={5}>
              <SelectedItems
                selected={this.state.selected}
                deleteSelected={this.deleteSelected}
              />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
export default CreateOrderStep2;
