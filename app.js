const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 6005;
app.use(cors());

// Use body-parser middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://Sarvesh:Sarvesh123@cluster1.jz8t5ag.mongodb.net/Entry');

const entrySchema = new mongoose.Schema({
  name: String,
  vehicleno: String,
  email: String,
  phonenumber: String,
  time: String,
});

const Entry = mongoose.model('Entry', entrySchema);

// Endpoint for handling entry form submissions
app.post('/entry', async (req, res) => {
  const entryData = req.body;
  console.log('Received entry data:', entryData);
  try {
    const entry = new Entry(entryData);
    await entry.save();
    console.log('Entry data saved to MongoDB:', entry);
    res.send('Entry form submitted successfully!');
  } catch (error) {
    console.log('Error saving entry data to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint for handling exit form submissions
app.post('/exit', (req, res) => {
  const exitData = req.body;
  // Process the exit form data and store it in your data store
  parkingExits.push(exitData);
  res.send('Exit form submitted successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
