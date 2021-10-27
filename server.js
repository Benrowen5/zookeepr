const express = require('express');
const {animals} = require('./data/animals');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

// set up middleware functions
// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data
app.use(express.json());
// Make static resources readily available
app.use(express.static('public'));

// use apiRoutes when client navigates to /api endpoint
app.use('/api', apiRoutes);
// use htmlRoutes if / is the endpoint
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});