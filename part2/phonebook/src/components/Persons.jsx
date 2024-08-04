import React, { useState } from "react";
import db from "../services/services";

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
      await db
        .deleteData(id)
        .then(async () => {
          setMessage("data deleted successfully");
          setError(false);
          setShowMessage(true);
          await db.getAll().then((res) => {
            setPersons(res);
          });
        })
        .catch((err) => {
          setMessage("Data already deleted from database");
          setError(true);
          setShowMessage(true);
        });
    } else {
      return;
    }
  };
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleClick(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
