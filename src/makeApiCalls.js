const axios = require("axios");
const makeApiCalls = async function(method, url) {
    let data= await axios[method](url);
    return await data.data;
}

module.exports = makeApiCalls;