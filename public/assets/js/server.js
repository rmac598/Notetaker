const express = require('express');
const htmlroutes = require('./routes/htmlRoutes.js');
const apiroutes = require('./routes/apiRoutes.js');

const PORT = process.env.PORT || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiroutes);
app.use('/', htmlroutes);

app.use(express.static('public'));
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
