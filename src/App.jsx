import React from "react";
import Map from "./Map";
import TripInfo from "./TripInfo";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      directionsService: null,
      directionsDisplay: null,
      map: null,
      days: [],
      markers: null,
    };

    this.drawPoints = this.drawPoints.bind(this);
    this.updateMarker = this.updateMarker.bind(this);
  }

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();

    let currentPosition = {
      lat: 37.687923,
      lng: -122.470207
    };

    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: currentPosition,
      zoom: 8
    });

    fetch("http://127.0.0.1:4000/data/getNames")
      .then(res => res.json())
      .then(data => {
        let days = {};
        let numDays = data.length;

        data.forEach((file, idx) => {
          fetch(`http://127.0.0.1:4000/data/${file}`)
            .then(res => res.json())
            .then(data => {
              days[file] = data;
              if (idx === numDays - 1) {
                this.setState({
                  directionsService,
                  directionsDisplay,
                  map,
                  days
                });
              }
            });
        });
      });
  }

  updateMarker(day) {
    const { days, markers } = this.state;
    console.log(markers[days[day].index]);
  }

  drawPoints() {
    let { days, map} = this.state;
    let markers = [];

    Object.entries(days).forEach(pair => {
      let curDayPath = [];
      let dayName = pair[0];
      let value = pair[1];

      // Add start marker for current day
      const startMarker = new google.maps.Marker({
        position: {
          lat: value.coords[0].lat,
          lng: value.coords[0].lng
        },
        title: dayName.concat("_start"),
        map
      });

      // Add end marker for current day
      const endMarker = new google.maps.Marker({
        position: {
          lat: value.coords[value.coords.length - 1].lat,
          lng: value.coords[value.coords.length - 1].lng
        },
        title: dayName.concat("_end"),
        map
      });

      markers.push(startMarker, endMarker);

      // Add all coordinates of current day to an array
      let speedInOneMinute = 0;
      let idx = 0;

      value.coords.forEach(location => {
        speedInOneMinute += location.speed;
        idx += 1;
        curDayPath.push({
          lat: location.lat,
          lng: location.lng
        });

        // If a minute has passed or reaches the end of trip
        if (idx === 60 || idx === value.coords.length - 1) {
          const averageSpeed = speedInOneMinute / idx;

          let strokeColor;

          if (averageSpeed < 11.176) {
            strokeColor = "#da28f1";
          } else if (averageSpeed >= 11.176) {
            strokeColor = "#3b77db";
          } else if (averageSpeed >= 17.8816) {
            strokeColor = "#3df229";
          } else if (averageSpeed >= 29.0576) {
            strokeColor = "#d10404";
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
          curDayPath = [];
        }
      });

      // Draw points on Map
      let dayPath = new google.maps.Polyline({
        path: curDayPath,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      dayPath.setMap(map);
    });
  }

  render() {
    //cs
    //cp
    const { map, days } = this.state;
    this.drawPoints();
    return (
      <div id="app">
        <TripInfo updateMarker={this.updateMarker} />
        <div id="map" />
      </div>
    );
  }
}

export default App;
