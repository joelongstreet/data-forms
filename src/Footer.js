import React, { Component } from 'react';
import {
  Col, Modal, Row, Button,
} from 'antd';

import ContactForm from './Contact.form';
import * as Styles from './Styles';
import downloadSvgDocument from './Download';


class Footer extends Component {
  state = {
    contactModalVisible: false,
  }

  showContactModal = (e) => {
    e.preventDefault();
    this.setState({ contactModalVisible: true });
  }

  closeContactModal = () => {
    this.setState({ contactModalVisible: false });
  }

  render() {
    const { contactModalVisible } = this.state;
    return (
      <React.Fragment>
        <Row style={{
          height: Styles.footerHeight,
          borderTop: `1px solid ${Styles.colors[5]}`,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
        >
          <Col
            span={23}
            offset={1}
            style={{
              marginRight: 20, marginTop: 10, padding: '15px 0 30px',
            }}
          >
            <Button
              type="default"
              onClick={downloadSvgDocument}
              style={{
                backgroundColor: Styles.colors[10],
                marginRight: '20px',
                float: 'right',
              }}
            >
                Download SVG
            </Button>
            <a
              style={{ padding: 20 }}
              href="#contact-modal"
              onClick={this.showContactModal}
            >
              Contact
            </a>
            <span> | </span>
            <a
              style={{ padding: 20 }}
              href="https://github.com/joelongstreet/data-forms"
              target="blank"
            >
              Github
            </a>
          </Col>
        </Row>
        <Modal
          onCancel={this.closeContactModal}
          visible={contactModalVisible}
          footer={[]}
          wrapClassName="ant-modal-wrap-contact"
        >
          <ContactForm onSubmit={this.closeContactModal} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default Footer;
