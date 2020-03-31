const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/:contactId', function (req, res, next) {
  fs.readFile('contacts.json', 'utf8', function (err, data) {
    if (err) throw err;
    const jsonContent = JSON.parse(data);
    const contactsFiltered = jsonContent.contacts.filter(
      c => c.id !== Number.parseInt(req.params.contactId));
    fs.writeFile('contacts.json', JSON.stringify({ contacts: contactsFiltered }), (err) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
});

module.exports = router;
