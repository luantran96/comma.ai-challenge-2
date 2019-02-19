import React, { Component } from "react";
import TripInfoContent from "./TripInfoContent";

export default class TripInfo extends Component {
  constructor() {
    super();

    this.state = {
      render: false,
      select: null,
      fileNames: [],
      averageSpeed: [],
      tripDuration: null,
      startTime: 0,
      endTime: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    // fetch file names from server
    fetch("http://127.0.0.1:4000/data/getNames")
      .then(res => res.json())
      .then(data => {
        this.setState({
          fileNames: data,
        });
      });
  }

  handleChange({ target }) {
    // fetch day data from server
    fetch(`http://127.0.0.1:4000/data/${target.value}`)
      .then(res => res.json())
      .then(data => {
        let speedInOneMinute = 0;
        let idx = 0;
        let startTime = data.start_time;
        let endTime = data.end_time;
        let averageSpeedsPerMinute = [];

        // Calculate average one minute speed for whole trip duration
        data.coords.forEach(location => {
          speedInOneMinute += location.speed;
          idx += 1;

          if (idx === 60 || idx === data.coords.length - 1) {
            let currentAverageSpeed = speedInOneMinute / idx;
            averageSpeedsPerMinute.push(currentAverageSpeed);
            idx = 0;
            speedInOneMinute = 0;
          }
        });

        this.setState({
          select: target.value,
          render: true,
          averageSpeed: averageSpeedsPerMinute,
          startTime,
          endTime
        });
      });
  }

  renderContent() {
    let { render, averageSpeed, startTime, endTime } = this.state;

    if (render) {
      return (
        <TripInfoContent
          averageSpeed={averageSpeed}
          startTime={startTime}
          endTime={endTime}
        />
      );
    }
  }

  render() {
    let { fileNames } = this.state;

    return (
      <div id="tripInfo">
        <div id="legend">
          <em>
            <h3>Legend</h3>
          </em>
          <div>
            <span id="lessThan25" /> Less than 25 mph
          </div>
          <div>
            <span id="moreThan25" />
            More than 25 mph
          </div>
          <div>
            <span id="moreThan40" />
            More than 40 mph
          </div>
          <div>
            <span id="moreThan65" />
            More than 65 mph
          </div>
        </div>

        <div>
          <select id="day-select" onChange={this.handleChange}>
            {fileNames.map((fileName, idx) => (
              <option key={idx} value={fileName}>
                {fileName}
              </option>
            ))}
          </select>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}
