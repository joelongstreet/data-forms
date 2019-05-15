import React from 'react';
import * as Styles from './Styles';
import ExampleData from './Examples.data';
import Example from './Example';


function Examples(props) {
  const { visible, onClose } = props;

  const topPosition = visible ? 0 : '100%';
  const examples = ExampleData.map(d => (
    <Example
      title={d.title}
      description={d.description}
      images={d.images}
    />
  ));

  return (
    <div style={{
      backgroundColor: Styles.colors[8],
      width: '100%',
      height: '100%',
      overflow: 'scroll',
      position: 'absolute',
      top: topPosition,
      zIndex: 3,
    }}
    >
      <a
        href="#close-example"
        onClick={onClose}
        style={{
          cursor: 'pointer',
          color: 'black',
          position: 'absolute',
          fontSize: 50,
          right: 20,
          top: 0,
        }}
      >
        &times;
      </a>
      {examples}
    </div>
  );
}

export default Examples;
