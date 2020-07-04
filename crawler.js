const makeApiCalls = require("./src/makeApiCalls");
const getSmallestString = require("./src/getSmallestString");

module.exports = url => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await makeApiCalls('get', url);
            let smallestString = '';
            smallestString = await getSmallestString(data, url);
            if (smallestString !== '') {
                resolve(smallestString);
            }
        }
         catch (e) {
             reject(e);
         }
    });
};
