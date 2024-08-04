import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  let total = parts.reduce((prev, curr) => prev + curr.exercises, 0);
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <strong>total of {total} exercises</strong>
    </div>
  );
};

export default Content;
