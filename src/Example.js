import React, { Component } from 'react';
import { Popover } from 'antd';
import { StyleSheet, css } from 'aphrodite';

import SettingsContext from './Settings.context';
import * as Styles from './Styles';

const ruleSets = StyleSheet.create({
  example: {
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    cursor: 'pointer',
    width: '25%',
    paddingBottom: '25%',
    float: 'left',
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
    [`@media (max-width: ${Styles.breaks.medium.width}px)`]: {
      width: '33.3%',
      paddingBottom: '33.3%',
    },
    [`@media (max-width: ${Styles.breaks.small.width}px)`]: {
      width: '50%',
      paddingBottom: '50%',
    },
  },
  popover: {
    width: '23%',
    arrowPointAtCenter: true,
    [`@media (max-width: ${Styles.breaks.medium.width}px)`]: {
      width: '50%',
    },
    [`@media (max-width: ${Styles.breaks.small.width}px)`]: {
      width: '90%',
    },
  },
  popoverButton: {
    border: `1px solid ${Styles.colors[1]}`,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 'auto',
    padding: 5,
    cursor: 'pointer',
  },
});


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
          className={css(ruleSets.popoverButton)}
        >
          Fork
        </div>
      </div>
    );

    return (
      <Popover
        content={content}
        title={title}
        overlayClassName={css(ruleSets.popover)}
      >
        <div
          tabIndex="0"
          role="button"
          onKeyPress={this.nextImage}
          onClick={this.nextImage}
          onMouseMove={this.loadImage}
          onMouseOut={this.loadDefaultImage}
          onBlur={this.loadDefaultImage}
          className={css(ruleSets.example)}
          style={{ backgroundImage: `url(${images[imageIndex]})` }}
        />
      </Popover>
    );
  }
}

Example.contextType = SettingsContext;
export default Example;
