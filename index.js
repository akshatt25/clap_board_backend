const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const authRouter = require('./routes/auth'); // Import the auth routes
const movieDataRouter = require('./routes/movieData');
const actionsRouter = require('./routes/actions/actions');



//init
const app = express();
const port = 3000; // You can choose any port you want
const DB = "mongodb+srv://akshatt25g:akshat4546@cluster0.g8klkns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//middleware
app.use(express.json());
app.use(compression());

app.use(authRouter);
app.use( movieDataRouter);
app.use( actionsRouter);
//connections
mongoose.connect(DB).then(()=>{
    console.log('Connection Successful');
}).catch((e)=>{
    console.log(e);
});

// Start the server
app.listen(port , () => {
    console.log(`Server is running  port ${port}`);
});


