import React from 'react';

function Examples(props) {
  const {
    title,
    description,
  } = props;
  return (
    <div style={{
      width: '25%',
      paddingBottom: '25%',
      float: 'left',
    }}
    >
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
}

export default Examples;
