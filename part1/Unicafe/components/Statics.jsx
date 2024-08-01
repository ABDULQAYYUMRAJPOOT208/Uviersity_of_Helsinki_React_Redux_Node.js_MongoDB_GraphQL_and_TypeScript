import React from "react";

const Statics = ({ good, neutral, bad }) => {
  return (
    <div>
      {good + bad + neutral == 0 ? (
        <p>No FeedBack Given</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Rating</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>Neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>Bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{good + neutral + bad}</td>
            </tr>
            <tr>
              <td>Average</td>
              <td>{(good + neutral + bad) / 3}</td>
            </tr>
            <tr>
              <td>Positive</td>
              <td>{(good / (good + neutral + bad)) * 100}%</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Statics;
