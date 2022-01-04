const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
//import routes
const authRoute = require('./routes/auth');

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT,).then(() => {
    console.log("connection successful");
}).catch((err) => console.log("connection unseccessfull", err));

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

//route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts',postRoutes);

app.listen(3000, () => console.log('server listening on port 3000'));
