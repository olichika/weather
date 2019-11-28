const fs = require('fs');

exports.cities = (req, res) => {
    fs.readFile(process.cwd() + '/data/db.json', (err, data) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        };
        res.json({
            cities: JSON.parse(data).map(city => city.name)
        });
    });
}

exports.weather = (req, res) => {
    const city = req.params.city;

    fs.readFile(process.cwd() + '/data/db.json', (err, data) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        };
        const json = JSON.parse(data);
        res.json({
            city: json.filter(mappingCity => mappingCity.name.toLowerCase() === city.toLowerCase())[0]
        });
    });
}