import React, { Component } from 'react';
import { Col, Row } from 'antd';

import ContactModal from './Contact.modal';
import * as Styles from './Styles';


class Footer extends Component {
  state = {
    contactModalVisible: false,
  }

  showContactModal = (e) => {
    e.preventDefault();
    this.setState({ contactModalVisible: true });
  }

  render() {
    const { contactModalVisible } = this.state;
    return (
      <React.Fragment>
        <Row style={{
          backgroundColor: Styles.colors[0],
          borderTop: `1px solid ${Styles.colors[5]}`,
        }}
        >
          <Col
            span={23}
            offset={1}
            style={{
              marginRight: 20, marginTop: 10, padding: '15px 0 30px',
            }}
          >
            <a
              href="#contact-modal"
              onClick={this.showContactModal}
            >
              Contact
            </a>
            <span style={{ padding: '0 30px' }}> | </span>
            <a
              style={{ paddingRight: 20 }}
              href="https://github.com/joelongstreet/data-forms"
              target="blank"
            >
              Github
            </a>
          </Col>
        </Row>
        <ContactModal
          visible={contactModalVisible}
        />
      </React.Fragment>
    );
  }
}

export default Footer;
