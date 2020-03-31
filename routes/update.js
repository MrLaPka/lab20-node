const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/:contactId', function (req, res, next) {
  fs.readFile('contacts.json', 'utf8', function (err, data) {
    if (err) throw err;
    const jsonContent = JSON.parse(data);
    const current = jsonContent.contacts.find(c => c.id === Number.parseInt(req.params.contactId));
    res.render(
      'update',
      {
        contacts: jsonContent.contacts,
        current: current,
      });
  });
});

router.post('/:contactId', function (req, res, next) {
  fs.readFile('contacts.json', 'utf8', function (err, data) {
    if (err) throw err;
    const jsonContent = JSON.parse(data);
    const current = jsonContent.contacts.find(c => c.id === Number.parseInt(req.params.contactId));
    current.fullName = req.body.fullName;
    current.phoneNumber = req.body.phoneNumber;
    fs.writeFile('contacts.json', JSON.stringify(jsonContent), (err) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
});

module.exports = router;
