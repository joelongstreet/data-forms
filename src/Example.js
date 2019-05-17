import React, { Component } from 'react';
import { Popover } from 'antd';

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

  render() {
    const { imageIndex } = this.state;
    const { title, description, images } = this.props;

    return (
      <Popover
        content={description}
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
          lazyload="on"
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

export default Example;
