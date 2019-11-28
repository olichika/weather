const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { weatherToJsonRequest } = require('./assets');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the weather app"
    });
});

require('./routes/weather.routes')(app);

weatherToJsonRequest();

setInterval(() => {
    weatherToJsonRequest();
}, 180000);

app.listen(4000, () => {
    console.log("Server is listening on port 4000");
})