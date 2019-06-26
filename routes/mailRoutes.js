const express = require ('express');
const MailRouter = express.Router ();
const nodemailer = require ('nodemailer');
const creds = require ('../config/config');

MailRouter.route ('/').post ((req, res) => {
  const data = req.body;

  const smtpTransport = nodemailer.createTransport ({
    service: 'Gmail',
    port: 465,
    auth: {
      user: creds.USER,
      pass: creds.PASS,
    },
  });

  const mailOptions = {
    from: data.email,
    to: 'mike@methcleanup.com',
    subject: 'test for mailer',
    html: `<p>Name: ${data.name}</p>
          <p>Email: ${data.email}</p>
          <p>Phone Number: ${data.phone}</p>
          <p>Message: ${data.message}</p>`,
  };
  smtpTransport.sendMail (mailOptions, (error, response) => {
    if (error) {
      res.send ('Mailer Error is sendMail call: ' + error);
    } else {
      res.send ('Success: ' + response);
    }
    smtpTransport.close ();
  });
});
