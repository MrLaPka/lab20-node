const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function (req, res, next) {
  fs.readFile('contacts.json', 'utf8', function (err, data) {
    if (err) throw err;
    const jsonContent = JSON.parse(data);
    res.render('add', { contacts: jsonContent.contacts });
  });
});

router.post('/', function (req, res, next) {
  fs.readFile('contacts.json', 'utf8', function (err, data) {
    if (err) throw err;
    const jsonContent = JSON.parse(data);
    const maxId = Math.max.apply(Math, jsonContent.contacts.map(c => {
      return c.id;
    }));
    jsonContent.contacts.push({
      id: maxId + 1,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
    });
    fs.writeFile('contacts.json', JSON.stringify(jsonContent), (err) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
});

module.exports = router;
