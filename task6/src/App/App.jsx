import React from 'react';

import Navigation from './Navigation';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='app_container'>
        <Navigation></Navigation>
        {this.props.children}
      </div>
    );
  }
}

export default App;
