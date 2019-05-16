import React from 'react';
import * as Styles from './Styles';
import ExampleData from './Examples.data';
import Example from './Example';


function Examples(props) {
  const { visible, onClose } = props;

  const translateY = visible ? '-100%' : '0%';
  const examples = ExampleData.map((d, i) => (
    <Example
      // eslint-disable-next-line react/no-array-index-key
      key={i}
      images={d.images}
      title={d.title}
      description={d.description}
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
          color: Styles.colors[0],
          backgroundColor: Styles.colors[8],
          position: 'absolute',
          fontSize: 50,
          right: 0,
          top: 20,
          zIndex: 1,
          padding: '0px 20px',
          borderRight: 'none',
        }}
      >
        &times;
      </a>
      {examples}
    </div>
  );
}

export default Examples;
