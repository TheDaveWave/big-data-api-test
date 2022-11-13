const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const locationRouter = require('./routes/location.router');

app.use('/api/locations', locationRouter);

// app.use(express.static('build'));
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
