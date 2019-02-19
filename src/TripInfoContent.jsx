import React from "react";

const TripInfoContent = ({ startTime, endTime, averageSpeed }) => (
  <div>
    <div>
      <em>Start Time</em>: {startTime}
    </div>
    <div>
      <em>End Time</em>: {endTime}
    </div>
    <div>
      <em>Trip Duration</em>: {averageSpeed.length} minutes
    </div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Minute</th>
          <th scope="col">Average mph</th>
        </tr>
      </thead>
      <tbody>
        {averageSpeed.map((speed, idx) => (
          <tr>
            <th scope="row">{idx+1}</th>
            <td>{(speed * 2.237).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TripInfoContent;
