import React, { Component } from 'react';
import * as Styles from './Styles';
import ExampleData from './Examples.data';
import Example from './Example';


class Examples extends Component {
  state = {
    title: '',
    description: '',
  }

  render() {
    const { visible, onClose } = this.props;
    const { title, description } = this.state;

    const translateY = visible ? '-100%' : '0%';
    const examples = ExampleData.map(d => (
      <Example
        images={d.images}
        onHover={() => {
          this.setState({
            title: d.title,
            description: d.description,
          });
        }}
      />
    ));

    return (
      <div style={{
        backgroundColor: Styles.colors[8],
        width: '100%',
        height: '100%',
        overflow: 'scroll',
        position: 'absolute',
        top: '100%',
        transition: 'transform .3s ease-in-out',
        transform: `translateY(${translateY})`,
        zIndex: 3,
      }}
      >
        <a
          id="close-examples-button"
          href="#close-example"
          onClick={onClose}
          style={{
            cursor: 'pointer',
            color: Styles.colors[8],
            backgroundColor: Styles.colors[0],
            position: 'absolute',
            fontSize: 50,
            right: 0,
            top: 20,
            zIndex: 1,
            padding: '0px 20px',
            border: `5px solid ${Styles.colors[8]}`,
            borderRight: 'none',
          }}
        >
          &times;
        </a>
        {examples}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            padding: 20,
            borderTop: `5px solid ${Styles.colors[0]}`,
            backgroundColor: Styles.colors[8],
            color: Styles.colors[0],
            bottom: 0,
          }}
        >
          <h3 style={{ color: Styles.colors[0] }}>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Examples;
