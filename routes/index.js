const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function (req, res, next) {
  fs.readFile('contacts.json', 'utf8', function (err, data) {
    if (err) throw err;
    const jsonContent = JSON.parse(data);
    res.render('index',
      {
        contacts: jsonContent.contacts,
        activeLinks: true,
      });
  });
});

module.exports = router;
