const getProperty24Data = require('./getProperty24Data');
const getPrivatePropertyData = require('./getPrivatePropertyData');

const axios = require('axios');
const cheerio = require('cheerio');

async function getPropertyData(url) {
    const isProperty24 = url.includes('property24.com');
    const isPrivateProperty = url.includes('privateproperty.co.za');

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    if (isProperty24) {
        return getProperty24Data($, url)
    } else if (isPrivateProperty) {
        return getPrivatePropertyData($)
    } else {
        return {
            image: $('meta[property="og:image"]').attr('content'),
            title: $('meta[property="og:title"]').attr('content'),
            description: $('meta[name="description"]').attr('content')
        }
    }
}

module.exports = getPropertyData
