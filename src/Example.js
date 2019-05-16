import React, { Component } from 'react';

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

  showDescription = () => {
    const { onHover } = this.props;
    onHover();
  }

  render() {
    const { imageIndex } = this.state;
    const { images } = this.props;

    return (
      <div
        tabIndex="0"
        role="button"
        onKeyPress={this.nextImage}
        onClick={this.nextImage}
        onMouseEnter={this.showDescription}
        style={{
          backgroundImage: `url(${images[imageIndex]})`,
          backgroundSize: 'cover',
          cursor: 'pointer',
          width: '33.3%',
          paddingBottom: '33.3%',
          float: 'left',
          position: 'relative',
          display: 'inline-block',
          overflow: 'hidden',
        }}
      />
    );
  }
}

export default Example;
