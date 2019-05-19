import React, { Component } from 'react';
import { Popover } from 'antd';

import SettingsContext from './Settings.context';
import * as Styles from './Styles';

class Example extends Component {
  state = {
    imageIndex: 0,
  }

  nextImage = () => {
    const { images } = this.props;
    const { imageIndex } = this.state;
    let nextIndex = imageIndex + 1;

    if (nextIndex > images.length - 1) {
      nextIndex = 0;
    }

    this.setState({ imageIndex: nextIndex });
  }

  loadExample = () => {
    const { closeParent, exampleIndex } = this.props;
    const { setActiveExampleIndex } = this.context;
    setActiveExampleIndex(exampleIndex);
    closeParent();
  }

  render() {
    const { imageIndex } = this.state;
    const { title, description, images } = this.props;
    const content = (
      <div>
        <p>{description}</p>
        <div
          tabIndex="0"
          role="button"
          onKeyPress={() => { this.loadExample(); }}
          onClick={() => { this.loadExample(); }}
          style={{
            border: `1px solid ${Styles.colors[0]}`,
            fontWeight: 'bold',
            textAlign: 'center',
            margin: 'auto',
            padding: 5,
            cursor: 'pointer',
          }}
        >
          Fork
        </div>
      </div>
    );

    return (
      <Popover
        content={content}
        title={title}
        overlayClassName="example-popover"
        overlayStyle={{
          maxWidth: '22%',
          arrowPointAtCenter: true,
        }}
      >
        <div
          tabIndex="0"
          role="button"
          onKeyPress={this.nextImage}
          onClick={this.nextImage}
          style={{
            backgroundImage: `url(${images[imageIndex]})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            cursor: 'pointer',
            width: '25%',
            paddingBottom: '25%',
            float: 'left',
            position: 'relative',
            display: 'inline-block',
            overflow: 'hidden',
          }}
        />
      </Popover>
    );
  }
}

Example.contextType = SettingsContext;
export default Example;