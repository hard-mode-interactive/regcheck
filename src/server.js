
require('./config/config');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;



// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// routes
app.use(require('./routes/api.index'));


app.listen(port);
console.log('The magic happens on port ' + port);



