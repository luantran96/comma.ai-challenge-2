import React from "react";

const TripInfoContent = ({ startTime, endTime, averageSpeed }) => (
  <div>
    <div><em>Start Time</em>: {startTime}</div>
    <div><em>End Time</em>: {endTime}</div>
    <div><em>Trip Duration</em>: {averageSpeed.length} minutes</div>
    <div><em>Average m/s per minute</em>: {averageSpeed.map((speed, idx) => <div key={idx+1}>{idx+1} : {speed}</div>)}</div>
  </div>
);

export default TripInfoContent;
