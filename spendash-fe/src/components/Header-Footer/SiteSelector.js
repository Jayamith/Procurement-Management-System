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
  InputGroup
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCut, faEraser } from '@fortawesome/free-solid-svg-icons';
import SiteDataService from './SiteDataService';
import Authentication from '../../authentication/Authentication';

class SiteSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sites: [],
      selectedSite: -1
    };
  }

  componentDidMount() {
    this.getAllSites();
  }

  getAllSites = async () => {
    const response = await SiteDataService.getAllSites();
    this.setState({ sites: response.data });
  };

  setSites = () => {
    if (this.state.selectedSite !== -1) {
      Authentication.setSite(this.state.selectedSite);
    }
  };
  render() {
    return (
      <React.Fragment>
        <Row style={{ marginTop: 20, marginBottom: 40 }}>
          <Col xs={3}>
            <Form.Label>Site</Form.Label>
            <Form.Control
              onChange={this.props.handleChange}
              name="selectedSite"
              value={this.props.selectedSite}
              type="text"
              as="select"
              className="paperregistration-form-input"
            >
              <option value="">- Select -</option>
              {this.state.sites &&
                this.state.sites.map((site) => (
                  <option key={site.id} value={site.name}>
                    {site.name}
                  </option>
                ))}
            </Form.Control>
            <Form.Text className="text-muted"> Select Site </Form.Text>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
export default SiteSelector;
