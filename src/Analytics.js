import React from 'react';
import FS from 'react-fullstory';
import GA from 'react-ga';

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

if (isProduction) {
  GA.initialize('UA-137049621-1');
}

function Fullstory() {
  return (
    <React.Fragment>
      { isProduction
        && <FS org="K5HZ8" />
      }
    </React.Fragment>
  );
}

export default Fullstory;
