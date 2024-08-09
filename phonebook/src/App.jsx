import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import db from "./services/services";
import Message from "./components/Message";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("Some Error Occurred");
  const [error, setError] = useState(true);
  useEffect(() => {
    const fetchAllData = async () => {
      // await db
      //   .getAll()
      //   .then((data) => {
      //     setPersons(data);
      //   })
      //   .catch((err) => {
      //     alert(err.message);
      //   });
      await axios
        .get("http://localhost:3001/api/persons")
        .then((result) => {
          setPersons(result.data);
        })
        .catch((err) => {
          console.warn(err);
        });
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  }, [showMessage]);

  const handlePersonFormSubmit = (newPersons) => setPersons(newPersons);

  return (
    <>
      <h2>PhoneBook</h2>
      {showMessage ? <Message message={message} isErr={error} /> : <></>}
      <h3>Filter</h3>
      <Filter list={persons} setList={setPersons} />
      <h3>Add A New</h3>
      <PersonForm
        persons={persons}
        setPersons={handlePersonFormSubmit}
        setMessage={setMessage}
        setError={setError}
        setShowMessage={setShowMessage}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setError={setError}
        setShowMessage={setShowMessage}
      />
    </>
  );
};

export default App;
