import React, { Component } from 'react';

import { Modal } from 'antd';
import ContactForm from './Contact.form';

class ContactModal extends Component {
  state = {
    visible: false,
  }

  constructor(props) {
    super(props);
    this.state.visible = props.visible;
  }

  componentWillReceiveProps = () => {
    const { visible } = this.props;
    this.setState({ visible });
  }

  onSubmit = () => {
    this.setState({ visible: false });
  }

  onCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;

    return (
      <Modal
        onCancel={this.onCancel}
        visible={visible}
        footer={[]}
      >
        <ContactForm onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}


export default ContactModal;
