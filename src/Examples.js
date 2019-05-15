import React from 'react';
import * as Styles from './Styles';
import ExampleData from './Examples.data';
import Example from './Example';


function Examples() {
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
      top: 0,
      zIndex: 3,
    }}
    >
      {examples}
    </div>
  );
}

export default Examples;
