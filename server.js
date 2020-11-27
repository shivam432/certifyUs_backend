const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const templatesRouter = require('./routes/templates');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const customersRoutes = require('./routes/customers');

const app = express();
const port = process.env.PORT || 5000;

app .use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())
app.set("view engine", "ejs"); 

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true}
    );
     
const connection = mongoose.connection;
 connection.once('open',()=>{
     console.log("MongoDB database connection established");
 });



app.use('/templates',templatesRouter);
app.use('/user',userRoutes);
app.use('/admin',adminRoutes);
app.use('/customer',customersRoutes);
app.use(express.static("uploads"));

app.listen(port,() => {
    console.log('Server is running')
});