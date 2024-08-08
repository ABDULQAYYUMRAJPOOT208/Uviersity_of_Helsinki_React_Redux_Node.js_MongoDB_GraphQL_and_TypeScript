const express = require("express");
const app = express();
const fs = require("fs");
const morgan = require("morgan");

// Middleware to parse JSON bodies
app.use(express.json());
// Define a custom Morgan token for logging request bodies
morgan.token("body", (req) => {
  // Return JSON stringified body, or an empty string if body is undefined
  return req.body ? JSON.stringify(req.body) : "";
});

// Configure Morgan to log the body of POST requests
const loggerFormat =
  ":method :url :status :res[content-length] - :response-time ms :body";
app.use(morgan(loggerFormat));
const persons = JSON.parse(fs.readFileSync("./data.json", "utf8"));

console.log(persons, typeof persons);

const newId = () => {
  return Math.floor(Math.random() * 100000000) + 1;
};
const isNamePresent = (newName) => {
  const result = persons.filter((person) => person.name === newName);
  if (result.length > 0) {
    return true;
  }
  return false;
};
app.get("/", (req, res) => {
  res.send("<h>This is base url...</h>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const pid = req.params.id;
  const person = persons.find((p) => p.id === pid);
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ message: "Person not found" });
  }
});

app.get("/api/info", (req, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${
      persons.length
    } people<p/><br/><p>${date.toString()}</p>`
  );
});

app.delete("/api/persons/:id", (req, res) => {
  const pid = req.params.id;
  const index = persons.findIndex((p) => p.id === pid);
  if (index !== -1) {
    persons.splice(index, 1);
    fs.writeFileSync("./data.json", JSON.stringify(persons, null, 2));
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Person not found" });
  }
});

app.post("/api/persons", (req, res) => {
  try {
    const newPerson = req.body;
    if (isNamePresent(newPerson.name)) {
      return res.status(400).json({ message: "Name already exists" });
    }
    if (!newPerson || !newPerson.name || !newPerson.number) {
      return res.status(400).json({ message: "Missing name or number" });
    }
    newPerson.id = newId().toString();
    persons.push(newPerson);
    fs.writeFileSync("./data.json", JSON.stringify(persons, null, 2));
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
