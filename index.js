const express = require ('express');
const bodyParser = require ('body-parser');
const nodemailer = require ('nodemailer');
const cors = require ('cors');

const app = express ();

const port = 4444;

app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));

app.use (cors ());

app.use (function (req, res, next) {
  res.header ('Access-Control-Allow-Origin', '*');
  res.header (
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next ();
});

app.listen (port, () => {
  console.log ("We're live on port 4444");
});

app.get ('/', (req, res) => {
  res.send ('Welcome to my mailer');
});

app.post ('/api/v1', (req, res) => {
  const data = req.body;

  const smtpTransport = nodemailer.createTransport ({
    service: 'Gmail',
    port: 465,
    auth: {
      user: 'ctrjcb@gmail.com',
      pass: 'Batterman12',
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
      res.send (error);
    } else {
      res.send ('Success');
    }
    smtpTransport.close ();
  });
});
