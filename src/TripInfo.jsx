import React, { Component } from "react";

export default class TripInfo extends Component {
  constructor() {
    super();

    this.state = {
      select: null,
      fileNames: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('http://127.0.0.1:4000/data/getNames')
    .then(res => res.json())
    .then(data => {
      this.setState({fileNames: data});
    });
  }
  handleChange({target}) {
    this.setState({select: target.value})
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
            <span id="moreThan25" />More than 25 mph
          </div>
          <div>
            <span id="moreThan40" />More than 40 mph
          </div>
          <div>
            <span id="moreThan65" />More than 65 mph
          </div>
        </div>

        <div>
          <select 
          id="day-select"
          onChange={this.handleChange}>
            {fileNames.map((fileName, idx) => <option key={idx} value={fileName}>{fileName}</option>)}
          </select>
        </div>
      </div>
    );
  }
}
