const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// App
const app = express();
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
    
})
.then(() => console.log('Connection successful'))
.catch(err => console.log(`DB connection error`))

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit : '2mb'}));
app.use(cors());

// route 
app.get('/api', (req, res) => {
res.json({
    data: 'Hej you hit node API',
})
})


// Port 
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
