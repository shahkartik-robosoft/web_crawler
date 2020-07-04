const axios = require('axios');
const crawl = require('../crawler');

crawl()
    .then(data => console.log('in api ', data));
