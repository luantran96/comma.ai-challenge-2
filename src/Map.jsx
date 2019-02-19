import React, { Component } from 'react'

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      directionsDisplay: null,
      directionsService: null,
      days: {},
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
      zoom: 8,
    });

    directionsDisplay.setMap(map);

    fetch('http://127.0.0.1:4000/data/getNames')
    .then(res => res.json())
    .then(data => {

      this.setState({
        directionsService,
        directionsDisplay,
        map,
        files: data,
      });

      let days = {};
      let numDays = data.length;

      data.forEach((file, idx) => {
        fetch(`http://127.0.0.1:4000/data/${file}`)
        .then(res => res.json())
        .then(data => {
          days[file] = data;

          if(idx === numDays - 1) {
            this.setState({ days });
          }
        });
      });
      
    });

  }

  render() {
    return (
      <div id="map">
      
      </div>
    )
  }
}
