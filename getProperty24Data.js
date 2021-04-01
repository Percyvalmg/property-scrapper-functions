function getProperty24Data($, url) {
    function getPropertyOverview() {

        let fields = [], values = []
        $('.p24_propertyOverviewRow > div').text((i, text) => {
            if (i % 2) {
                values.push(text.trim().split('\n')[0])
            } else {
                fields.push(text.replace(/ /g, '').trim())
            }
        });

        let data = {}
        fields.forEach((field, index) => {
            data[field] = values[index]
        })

        console.log(data)

        return data;
    }

    const propertyOverview = getPropertyOverview()

    function getImages() {
        let images = []
        $('#gallery-scrollable-container > div > div > div > img').each((index, element) => {
            images.push(element.attribs['lazy-src'])
        })

        return images;
    }

    return {
        location: url.split('/')[4],
        price: $('meta[name="twitter:data1"]').attr('content'),
        image: $('meta[property="og:image"]').attr('content'),
        title: $('meta[property="og:title"]').attr('content'),
        bedrooms: $('.p24_featureDetails[title="Bedrooms"]').children('span').text() && propertyOverview['Bedrooms'],
        bathrooms: $('.p24_featureDetails[title="Bathrooms"]').children('span').text() && propertyOverview['Bathrooms'],
        parking: $('.p24_featureDetails[title="Parking Spaces"]').children('span').text(),
        floorSize: $('.p24_featureDetails[title="Floor Size"]').children('span').text() && propertyOverview['FloorSize'],
        levy: propertyOverview['Levies'],
        rates: propertyOverview['RatesandTaxes'],
        images: getImages()
    }
}

module.exports = getProperty24Data
