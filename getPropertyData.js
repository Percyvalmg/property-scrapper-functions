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

function getProperty24Data($, url) {
    return {
        location: url.split('/')[4],
        price: $('meta[name="twitter:data1"]').attr('content'),
        image: $('meta[property="og:image"]').attr('content'),
        title: $('meta[property="og:title"]').attr('content'),
        bedrooms: $('.p24_featureDetails[title="Bedrooms"]').children('span').text(),
        bathrooms: $('.p24_featureDetails[title="Bathrooms"]').children('span').text(),
        parking: $('.p24_featureDetails[title="Parking Spaces"]').children('span').text(),
        floorSize: $('.p24_featureDetails[title="Floor Size"]').children('span').text(),
        levy: '',
        rates: '',
    }
}

module.exports = getPropertyData
