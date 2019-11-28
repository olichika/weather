const axios = require('axios');
const fs = require('fs');

const constants = require('../constants');
const { apiUrl, appId, cities } = constants;

const filterWeatherArr = ((val, i) => {
    if (i === 0) {
        return true;
    };
    if ((i + 1) % 8 === 0) {
        return true;
    };
});

const weatherToJsonRequest = () => {
    axios.all(cities.map(city => axios.get(`${apiUrl}?id=${city.id}&appid=${appId}`)))
        .then((resultsArray) => {
            const weatherAll = resultsArray.map(result => {
                return {
                    name: result.data.city.name,
                    weathers: result.data.list.filter(filterWeatherArr)
                }
            });
            const jsonWeatherAll = JSON.stringify(weatherAll);
            fs.writeFile(process.cwd() + '/data/db.json', jsonWeatherAll, 'utf8', () => {
                console.log('Weather json was successfully updated');
            });
        });
};

exports.weatherToJsonRequest = weatherToJsonRequest;
