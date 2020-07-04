const axios = require("axios");
const JSSoup = require("jssoup").default;
const Ramda = require("ramda");
const makeApiCalls = require("./makeApiCalls");

const links = [];
const textList = [];
let linkIndex = 0;

const getSmallestString = async (data, url) => {
    const soup = new JSSoup(data);
    const linkSelectors = soup.findAll('a');
    const textSelectors = soup.findAll('h1');
    const linkLens = Ramda.lensPath(['attrs', 'href']);
    const textLens = Ramda.lensPath(['nextElement', '_text']);
    const pageLinks = [];
    linkSelectors.forEach(soup => {
        const link = Ramda.view(linkLens, soup);
        pageLinks.push(link);
    });
    textSelectors.forEach(soup => {
        const text = Ramda.view(textLens, soup);
        textList.push(text);
    });
    pageLinks.forEach(link => {
        links.indexOf(link) < 0 && links.push(link);
    });
    if (linkIndex < links.length) {
        const data = await makeApiCalls('get', `${url}${links[linkIndex]}`);
        linkIndex++;
        await getSmallestString(data, url);
    }
    return textList.sort((a, b) => a.localeCompare(b))[0];
};

module.exports = getSmallestString;
