const express = require ('express');
const app = express ();
const bodyParser = require ('body-parser');
const PORT = process.env.PORT || 6000;
const cors = require ('cors');
const mailRoutes = require ('./routes/mailRoutes');

app.use (cors ());
app.use (bodyParser.urlencoded ({extended: true}));
app.use (bodyParser.json ());

app.use ('/mailer', mailRoutes);

app.listen (PORT, () => {
  console.log ('Server is running on port:', PORT);
});
