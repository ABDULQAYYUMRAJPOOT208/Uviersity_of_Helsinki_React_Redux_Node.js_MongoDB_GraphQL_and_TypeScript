const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const con = require("./config.js"); // MongoDB connection
const Phone = require("./model.js"); // Mongoose model

// Middleware
app.use(express.json());
app.use(cors());

// Logger setup
morgan.token("body", (req) => (req.body ? JSON.stringify(req.body) : ""));
const loggerFormat =
  ":method :url :status :res[content-length] - :response-time ms :body";
app.use(morgan(loggerFormat));

// Routes
app.get("/", (req, res) => {
  res.send("<h>This is the base URL...</h>");
});

app.get("/api/persons", async (req, res) => {
  try {
    const persons = await Phone.find({});
    res.json(persons);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch persons" });
  }
});

app.get("/api/persons/:id", async (req, res) => {
  try {
    const person = await Phone.findById(req.params.id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ message: "Person not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch person" });
  }
});

app.get("/api/info", async (req, res) => {
  try {
    const count = await Phone.countDocuments({});
    const date = new Date();
    res.send(
      `<p>Phonebook has info for ${count} people</p><br/><p>${date.toString()}</p>`
    );
  } catch (err) {
    res.status(500).json({ message: "Failed to get info" });
  }
});

app.delete("/api/persons/:id", async (req, res) => {
  try {
    const result = await Phone.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Person not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete person" });
  }
});

app.post("/api/persons", async (req, res) => {
  try {
    const newPerson = req.body;
    if (!newPerson || !newPerson.name || !newPerson.number) {
      return res.status(400).json({ message: "Missing name or number" });
    }
    const existingPerson = await Phone.findOne({ name: newPerson.name });
    if (existingPerson) {
      return res.status(403).json({ message: "Name already exists" });
    }
    const person = new Phone({
      name: newPerson.name,
      number: newPerson.number,
    });
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/api/persons/:id", async (req, res) => {
  try {
    const updatedPerson = req.body;
    const person = await Phone.findByIdAndUpdate(req.params.id, updatedPerson, {
      new: true,
      runValidators: true,
    });
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ message: "Person not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
