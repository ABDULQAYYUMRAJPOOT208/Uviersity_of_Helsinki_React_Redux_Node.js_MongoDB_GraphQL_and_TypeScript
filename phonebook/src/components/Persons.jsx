import React, { useState } from "react";
import db from "../services/services";
import axios from "axios";

const Persons = ({
  persons,
  setPersons,
  setMessage,
  setError,
  setShowMessage,
}) => {
  console.log("Rendering Persons with:", persons);
  const handleClick = async (id) => {
    const conf = confirm("Are you sure");
    if (conf) {
      await axios
        .delete(`http://localhost:3001/api/persons/${id}`)
        .then(async () => {
          alert("Data deleted successfully");
          await axios.get(`http://localhost:3001/api/persons`).then((data) => {
            setPersons(data.data);
            console.log(persons);
          });
        })
        .catch((err) => {
          alert("Error deleting data: " + err.message);
        });
    } else {
      return;
    }
  };
  return (
    <ul>
      {persons.length > 0 ? (
        <>
          {persons.map((person, idx) => (
            <li key={idx}>
              {person.name} {person.number}{" "}
              <button onClick={() => handleClick(person._id)}>delete</button>
            </li>
          ))}
        </>
      ) : (
        <></>
      )}
    </ul>
  );
};

export default Persons;
