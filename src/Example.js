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

  loadDefaultImage = () => {
    this.setState({ imageIndex: 0 });
  }

  loadImage = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const w = bounds.right - bounds.left;
    const { images } = this.props;

    let index = Math.floor((x / w) * images.length);
    if (index <= 0 || index >= images.length) index = 0;
    this.setState({ imageIndex: index });
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
            border: `1px solid ${Styles.colors[1]}`,
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
        { /* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */ }
        <div
          tabIndex="0"
          role="button"
          onKeyPress={this.nextImage}
          onClick={this.nextImage}
          onMouseMove={this.loadImage}
          onMouseOut={this.loadDefaultImage}
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
