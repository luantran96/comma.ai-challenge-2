import React from 'react';
import Map from './Map';
import TripInfo from './TripInfo';

class App extends React.Component {
  constructor(props) {
    super(props);
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
