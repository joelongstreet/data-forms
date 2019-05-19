import React, { Component } from 'react';
import * as Styles from './Styles';
import ExampleData from './Examples.data';
import Example from './Example';


class Examples extends Component {
  state = {
    showOnboarding: true,
  }

  hideOnboarding() {
    this.setState({ showOnboarding: false });
  }

  close() {
    const { onClose } = this.props;
    this.setState({ showOnboarding: false });
    onClose();
  }

  render() {
    const { visible } = this.props;
    const { showOnboarding } = this.state;

    const translateY = visible ? '-100%' : '0%';
    const examples = ExampleData.map((d, i) => (
      <Example
        // eslint-disable-next-line react/no-array-index-key
        key={i}
        exampleIndex={i}
        images={d.images}
        title={d.title}
        settings={d.settings}
        description={d.description}
        closeParent={() => { this.close(); }}
      />
    ));

    let onboarding = '';
    if (showOnboarding) {
      onboarding = (
        <div
          style={{
            position: 'absolute',
            padding: 20,
            zIndex: 2,
            left: '33%',
            width: '33%',
            top: 200,
            color: Styles.colors[8],
            background: Styles.colors[0],
          }}
        >
          <h2
            style={{
              letterSpacing: 1,
              fontSize: 20,
              fontWeight: 'bold',
              color: Styles.colors[8],
              textAlign: 'center',
            }}
          >
            DataForms
          </h2>
          <p>DataForms allows you to create physical manifestations of data. Data sets are drawn on a 2D plane and downloadable as a single SVG. Modify the downloaded file or send it straight to a laser cutter for processing.</p>
          <p>Fork the examples to get started.</p>
          <div
            tabIndex="0"
            role="button"
            onKeyPress={() => { this.hideOnboarding(); }}
            onClick={() => { this.hideOnboarding(); }}
            style={{
              border: `1px solid ${Styles.colors[1]}`,
              fontWeight: 'bold',
              textAlign: 'center',
              margin: '30px auto 0',
              padding: 10,
              cursor: 'pointer',
            }}
          >
            OK
          </div>
        </div>
      );
    }

    return (
      <div style={{
        background: Styles.colors[0],
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
          onClick={() => { this.close(); }}
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
            borderRight: 'none',
          }}
        >
          &times;
        </a>
        {onboarding}
        {examples}
      </div>
    );
  }
}

export default Examples;
