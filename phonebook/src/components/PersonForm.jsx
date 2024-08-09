import React, { useState } from "react";
import db from "../services/services";
import axios from "axios";
const PersonForm = ({
  persons,
  setPersons,
  setMessage,
  setError,
  setShowMessage,
}) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPerson = { name, number };
    const pid = persons.find((person) => {
      if (person.name === name) {
        return person.id;
      }
    });
    if (pid) {
      if (
        confirm(
          `${pid.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        db.update(pid.id, newPerson).then((result) => {
          setMessage("Data updated successfully");
          setError(false);
          setShowMessage(true);
          return;
        });
      } else {
        return;
      }
    } else {
      await axios
        .post("http://localhost:3001/api/persons", newPerson)
        .then((result) => {
          setMessage("Data inserted successfully");
          setError(false);
          setShowMessage(true);
          console.log(result);
        });
    }

    await db.getAll().then((result) => {
      setPersons(result);
    });
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="number">Number: </label>
        <input
          name="number"
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default PersonForm;
