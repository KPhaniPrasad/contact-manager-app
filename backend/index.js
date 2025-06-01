const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://mongo:27017/contacts', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Contact = mongoose.model('Contact', {
  name: String,
  phone: String
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

app.post('/contacts', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json(contact);
});

app.listen(4000, () => console.log('Backend running on http://localhost:4000'));
