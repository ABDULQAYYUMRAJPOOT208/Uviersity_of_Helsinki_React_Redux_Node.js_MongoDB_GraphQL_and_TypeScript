import React from "react";

const errStyles = {
  width: "100%",
  border: "2px solid red",
  //   backgroundColor: "grey",
  color: "red",
  padding: "6px",
};
const infoStyles = {
  width: "100%",
  border: "2px solid green",
  //   backgroundColor: "grey",
  color: "green",
  padding: "6px",
};
const Message = ({ message, isErr }) => {
  return <div style={isErr ? errStyles : infoStyles}>{message}</div>;
};

export default Message;
