require("dotenv").config();
const express =require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const apiRouter = require('./apiRouter');
 
const app = express();
 
const PORT = process.env.APP_PORT;
 
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api', apiRouter)
 
 
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto: ${PORT}`);
});
 
module.exports = app;