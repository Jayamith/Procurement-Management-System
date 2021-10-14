import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

class ItemCard extends Component {
  constructor(props) {
    super(props);
    //controlled inputs, should not be null as well..[ERR-LOG 01]
    this.state = {};
  }
  render() {
    const { name, price } = this.props.item;
    return (
      <Card
        style={{ marginBottom: 5, cursor: 'pointer' }}
        onClick={() => this.props.addSelected(this.props.item)}
      >
        <Card.Body>
          <Row>
            <Col md={6} xs={12}>
              <Card.Title>{name}</Card.Title>
            </Col>
            <Col md={6} xs={12}>
              <Card.Title>Rs {price}</Card.Title>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default ItemCard;
