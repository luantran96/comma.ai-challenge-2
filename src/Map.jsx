import React, { Component } from "react";

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      directionsDisplay: null,
      directionsService: null,
      days: {},
      markers: null,
    };

  }


  render() {
    this.drawPoints();
    return <div id="map" />;
  }
}
