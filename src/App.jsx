import React from 'react';
import Map from './Map';
import TripInfo from './TripInfo';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="app">
        <TripInfo />
        <Map />
      </div>
    );
  }
}



export default App;
