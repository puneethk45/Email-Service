const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'info@categorytech.com',
    pass: 'soiy ojxo dqjc tvms',
  },
});

module.exports = transporter;