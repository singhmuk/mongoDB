const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');


router.postRecord = async (req, res) => {
  const { name, email, phone, type } = req.body;
  try {
    const newContact = new Contact({
      name: name,
      type: type
    })

    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error.');
  }
}

router.all = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ date: -1 });
    res.json(contacts);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error.');
  }
}


router.updates = async (req, res) => {
  const { name, type } = req.body;
  try {
    let contact = await Contact.findById(req.params.contactId);
    if (!contact) {
      return res.status(400).json({ msg: 'Contact Not Found.' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      { $set: { name: name, type: type } },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Contact Not Found.' });
    }

    console.error(err.message);
    res.status(500).send('Server Error.');
  }
}


router.remove = async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.contactId);
    if (!contact) {
      return res.status(400).json({ msg: 'Contact Not Found.' });
    }

    await Contact.findByIdAndDelete(req.params.contactId);
    res.json({ msg: 'Contact Deleted.' })
  }
  catch (err) {

    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Contact Not Found.' });
    }

    console.error(err.message);
    res.status(500).send('Server Error.');
  }
}


module.exports = router;