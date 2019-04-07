import React from 'react';
import FullStory, { FullStoryAPI } from 'react-fullstory';
import GA from 'react-ga';

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

if (isProduction) {
  GA.initialize('UA-137049621-1');
  GA.ga((tracker) => {
    const trackerClientId = tracker.get('clientId');

    const fullstoryInitted = setInterval(() => {
      if (window._fs_namespace) {
        FullStoryAPI('identify', trackerClientId);
        clearInterval(fullstoryInitted);
      }
    }, 500);
  });
}

function Analytics() {
  return (
    <React.Fragment>
      { isProduction
        && <FullStory org="K5HZ8" />
      }
    </React.Fragment>
  );
}

export default Analytics;
