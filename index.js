const express = require('express');
const app = express();
const port = 3000; // You can choose any port you want

// Start the server
app.listen(port , () => {
    console.log(`Server is running  port ${port}`);
});
