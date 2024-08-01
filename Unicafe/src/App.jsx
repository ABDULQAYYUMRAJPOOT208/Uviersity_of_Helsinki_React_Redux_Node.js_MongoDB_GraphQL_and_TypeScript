import Header from "../components/Header";
import Content from "../components/Content";
import Total from "../components/Total";
import { useState } from "react";
import Statics from "../components/Statics";
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const handleGood = (e) => {
    e.preventDefault();
    setGood(good + 1);
  };
  const handleNeutral = (e) => {
    e.preventDefault();
    setNeutral(neutral + 1);
  };
  const handleBad = (e) => {
    e.preventDefault();
    setBad(bad + 1);
  };
  const course = "Give FeedBack";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  return (
    <div>
      <Header course={course} />
      {/* <Content parts={parts} />
      <Total parts={parts} /> */}
      <div>
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
      </div>
      <br />
      <h2>statistics</h2>
      <br />
      <Statics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
