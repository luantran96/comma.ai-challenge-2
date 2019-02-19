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

    this.drawPoints = this.drawPoints.bind(this);
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

    fetch('http://127.0.0.1:4000/data/getNames')
    .then(res => res.json())
    .then(data => {

      this.setState({
        directionsService,
        directionsDisplay,
        map,
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
            this.drawPoints();
          }
        });
      });
    });

  }

  drawPoints() {
    let { days, map } = this.state;

    console.log('in DrawPoints: ', days);
    
    Object.values(days).forEach(day => {
      
      let curDayPath = [];
      
      // Add start marker for current day
      const startMarker = new google.maps.Marker({
        position: {
          lat: day.coords[0].lat,
          lng: day.coords[0].lng,
        },
        title: 'Start',
        map,
      });

      // Add end marker for current day
      const endMarker = new google.maps.Marker({
        position: {
          lat: day.coords[day.coords.length - 1].lat,
          lng: day.coords[day.coords.length - 1].lng,
        },
        title: 'End',
        map,
      });

      // Add all coordinates of current day to an array
      let speedInOneMinute = 0;
      let idx = 0;

      day.coords.forEach(location => {
        speedInOneMinute += location.speed;
        idx += 1;
        curDayPath.push({
          lat: location.lat,
          lng: location.lng,
        });
        
        // If a minute has passed or reaches the end of trip
        if (idx === 60 || idx === day.coords.length - 1) {

          const averageSpeed = speedInOneMinute / idx;

          //console.log('averageSpeed: ', averageSpeed);
          let strokeColor;

          if(averageSpeed < 11.176) {
            strokeColor = '#da28f1';
          } else if (averageSpeed >= 11.176) {
            strokeColor = '#3b77db';
          } else if (averageSpeed >= 17.8816) {
            strokeColor = '#3df229';
          } else if (averageSpeed >= 29.0576) {
            strokeColor = '#d10404';
          }

          //console.log('strokeColor: ', strokeColor);


          let dayPath = new google.maps.Polyline({
            path: curDayPath,
            geodesic: true,
            strokeColor,
            strokeOpacity: 1.0,
            strokeWeight: 1
          });
    
          dayPath.setMap(map);        
          speedInOneMinute = 0;
          idx = 0;
        }
      });

  
      // Draw points on Map
      let dayPath = new google.maps.Polyline({
        path: curDayPath,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      dayPath.setMap(map);
    });
  }

  render() {
    return (
      <div id="map">
      </div>
    )
  }
}
