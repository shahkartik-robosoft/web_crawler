const axios = require("axios");
const axiosRetry = require("axios-retry");

axiosRetry(axios, {
            retryCondition: (error) => (error.code === '400' || error.code === '500'),
            shouldResetTimeout: true,
            retries: 5,
            retryDelay: 1000 });

const makeApiCalls = async function(method, url) {
    let data= await axios[method](url);
    return await data.data;
}

module.exports = makeApiCalls;