import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Modal, Button } from 'antd';

import ContactForm from './Contact.form';
import * as Styles from './Styles';
import downloadSvgDocument from './Download';

const ruleSets = StyleSheet.create({
  button: {
    backgroundColor: Styles.colors[10],
    marginRight: 20,
    marginTop: 20,
    float: 'right',
    [`@media (max-width: ${Styles.breaks.small.width}px)`]: {
      display: 'block',
      float: 'none',
      margin: '20px auto',
      width: '95%',
    },
  },
  link: {
    color: Styles.colors[1],
    display: 'inline-block',
    padding: 20,
    ':after': {
      color: Styles.colors[5],
      content: '"|"',
      marginLeft: 40,
    },
    ':hover': {
      color: Styles.colors[8],
    },
    [`@media (max-width: ${Styles.breaks.small.width}px)`]: {
      display: 'block',
      borderBottom: `1px solid ${Styles.colors[5]}`,
      margin: 0,
      ':after': {
        content: '""',
      },
    },
  },
  linkFirst: {
    marginLeft: 20,
  },
  linkLast: {
    ':after': {
      content: '""',
    },
  },
});


class Menu extends Component {
  state = {
    contactModalVisible: false,
  }

  toggleContactModal = (e) => {
    if (e) e.preventDefault();
    const { contactModalVisible } = this.state;
    this.setState({ contactModalVisible: !contactModalVisible });
  }

  render() {
    const { contactModalVisible } = this.state;
    const { openExamples } = this.props;
    return (
      <React.Fragment>
        <a
          className={css(ruleSets.link, ruleSets.linkFirst)}
          href="#contact-modal"
          onClick={this.toggleContactModal}
        >
          Contact
        </a>
        <a
          className={css(ruleSets.link)}
          href="https://github.com/joelongstreet/data-forms"
          target="blank"
        >
          Github
        </a>
        <a
          className={css(ruleSets.link, ruleSets.linkLast)}
          href="#show-examples"
          onClick={() => { openExamples(); }}
        >
          Examples
        </a>
        <Button type="default" onClick={downloadSvgDocument} className={css(ruleSets.button)}>
            Download SVG
        </Button>

        {/* Contact Modal */}
        <Modal
          onCancel={this.toggleContactModal}
          visible={contactModalVisible}
          footer={[]}
          wrapClassName="ant-modal-wrap-contact"
        >
          <ContactForm onSubmit={this.toggleContactModal} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default Menu;
