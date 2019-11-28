const weather = require('../controllers/weather.controller');

module.exports = app => {
    app.get('/cities', weather.cities);

    app.get('/weather/:city', weather.weather);
};
