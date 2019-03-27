import React from 'react';
import FS from 'react-fullstory';


function Fullstory() {
  return (
    <React.Fragment>
      { process.env.NODE_ENV === 'production'
        && <FS org="K5HZ8" />
      }
    </React.Fragment>
  );
}

export default Fullstory;
