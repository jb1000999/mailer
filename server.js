const express = require ('express');
const app = express ();
const bodyParser = require ('body-parser');
const port = process.env.PORT;
const cors = require ('cors');
const mailRoutes = require ('./routes/mailRoutes');

if (port == null || port == '') {
  port = 8000;
}

app.use (cors ());
app.use (bodyParser.urlencoded ({extended: true}));
app.use (bodyParser.json ());

app.use ('/mailer', mailRoutes);

app.listen (port, () => {
  console.log ('Server is running on port:', port);
});
