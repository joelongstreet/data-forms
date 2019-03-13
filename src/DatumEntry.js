import React from 'react';

function DatumEntry(props){

  function onDatumChange(e) {
    const val = e.target.value;
    props.onDatumChange(val);
  }

  return (
    <textarea value={props.datum} onChange={onDatumChange}></textarea>
  )
}

export default DatumEntry;