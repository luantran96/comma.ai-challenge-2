import React, { Component } from 'react'

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      directionsDisplay: null,
      directionsService: null,
    };
  }

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;

    let currentPosition = {
      lat: 37.687923,
      lng: -122.470207,
    };

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: currentPosition,
      zoom: 5,
    });

    directionsDisplay.setMap(map);

    this.setState({
      directionsService,
      directionsDisplay,
      map,
    });
  }

  render() {
    return (
      <div id="map">
      
      </div>
    )
  }
}
