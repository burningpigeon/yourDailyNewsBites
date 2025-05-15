require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/users/routes');

const app = express();
const port = process.env.API_PORT || 3000;

// ✅ Must be before routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

// ✅ This must come after middleware
app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
    console.log('App listening on port ' + port);
});
