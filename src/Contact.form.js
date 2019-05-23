import React, { Component } from 'react';
import GA from 'react-ga';

import {
  Button, Form, Input,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';

class NestedForm extends Component {
  handleSubmit = (e) => {
    const { form, onSubmit } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        let label = `${values.name} | ${values.email} | ${values.message}`;
        // https://github.com/react-ga/react-ga/issues/144
        label = label.replace('@', ' at ');
        // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#el
        label = label.substring(0, 500);

        GA.event({
          category: 'Contact',
          action: 'Contact:Submit',
          label,
        });

        onSubmit();
      }
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <React.Fragment>
        <h3 style={{ marginRight: 35 }}>
          { /* eslint-disable-next-line max-len */ }
          { /* eslint-disable-next-line react/no-unescaped-entities, react/jsx-one-expression-per-line */ }
          Say hi 👋. Tell me what you've made with DataForms. Send me feature requests. Contribute at <a href="https://github.com/joelongstreet/data-forms" rel="noopener noreferrer" target="_blank">Github</a>.
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                { required: true, type: 'email', message: 'Not a valid email address' },
              ],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Name">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'What\'s your name?', whitespace: true },
              ],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Message">
            {getFieldDecorator('message', {
              rules: [
                { required: true, message: 'What would you like to tell me?', whitespace: true },
              ],
            })(
              <TextArea />,
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit">Send</Button>
        </Form>
      </React.Fragment>
    );
  }
}

const ContactForm = Form.create({ name: 'contact_form' })(NestedForm);

export default ContactForm;
