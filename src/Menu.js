import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Modal, Button } from 'antd';

import ContactForm from './Contact.form';
import Examples from './Examples';
import * as Styles from './Styles';
import downloadSvgDocument from './Download';

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

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
    display: 'inline-block',
    padding: 20,
    ':after': {
      color: Styles.colors[5],
      content: '"|"',
      marginLeft: 40,
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
    examplesVisible: isProduction,
  }

  toggleContactModal = (e) => {
    if (e) e.preventDefault();
    const { contactModalVisible } = this.state;
    this.setState({ contactModalVisible: !contactModalVisible });
  }

  openExamples = (e) => {
    e.preventDefault();
    this.setState({ examplesVisible: true });
  }

  closeExamples = () => {
    const { toggleMenu } = this.props;
    toggleMenu();
    this.setState({ examplesVisible: false });
  }

  render() {
    const { contactModalVisible, examplesVisible } = this.state;
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
          onClick={this.openExamples}
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

        {/* Examples page */}
        <Examples
          onClose={this.closeExamples}
          visible={examplesVisible}
        />
      </React.Fragment>
    );
  }
}

export default Menu;
