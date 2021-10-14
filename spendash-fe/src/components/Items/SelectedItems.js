import React, { Component } from 'react';
import {
  Form,
  Container,
  Button,
  Modal,
  Spinner,
  Col,
  Row,
  ListGroup,
  FormControl,
  Card,
  InputGroup,
  Table
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle ,faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import ItemCard from '../Items/ItemCard';

class SelectedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { selectedItems, deleteSelected } = this.props;
    return (
      <React.Fragment>
        <Card>
          <Card.Header >
            <h6>Selected Items</h6>
          </Card.Header>

         <div style={{}}>
           <Table striped bordered hover size="sm" >
             <thead>
             <tr>
               <th>Item Name</th>
               <th>Item Quantity</th>
               <th>Price</th>
               <th>Action</th>
             </tr>
             </thead>
             <tbody>
             {selectedItems && selectedItems
                 .map((item, index) => (
                     <tr key={index}>
                       <td>{item.name}</td>
                       <td>  <Row direction="row">
                         <Col item xs={3}>
                           <FontAwesomeIcon
                             style={{ cursor: 'pointer' }}
                             icon={faMinusCircle}

                             onClick={item.qty !== 0 && (() => this.props.onRemove(item))}
                         />
                         </Col>
                         <Col item xs={4}>{item.qty}</Col>
                         <Col item xs={3}>
                           <FontAwesomeIcon
                             style={{ cursor: 'pointer' }}
                             icon={faPlusCircle}
                             onClick={()=> this.props.onAdd(item)}
                         /></Col>
                       </Row></td>
                       <td>{item.price}</td>
                       <td>
                         <FontAwesomeIcon
                           style={{ cursor: 'pointer' }}
                           icon={faTimes}
                           onClick={() => deleteSelected(item.id)}
                       /></td>
                     </tr>
                 ))}
             <tr style={{ backgroundColor: 'grey', color: 'white' }}>
               <td colSpan="3"></td>
               <td>
                 <b>Total Cost : {this.props.totalCost()} </b>
               </td>
             </tr>
             </tbody>
           </Table>
         </div>
        </Card>
      </React.Fragment>
    );
  }
}
export default SelectedItems;
