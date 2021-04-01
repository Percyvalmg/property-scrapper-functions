function getPrivatePropertyData($) {

    function findTextAndReturnRemainder(target, variable) {
        const chopFront = target.substring(target.search(variable) + variable.length, target.length);
        return chopFront.substring(0, chopFront.search(';'));
    }

    function getDataFromDataLayer() {
        const text = $('script').contents().text();
        const findAndClean = findTextAndReturnRemainder(text, 'dataLayer =');
        const object = findAndClean.split('[').toString().split(']').toString()
        .replace(/ /g, '')
        .replace(/-/g, '')
        .replace(/'/g, '"')
        .replace(/\n/g, '')
        .slice(1, -1);
        return JSON.parse(object)
    }

    function getDataFromMainFeaturesClass() {
        let fields = [], values = []
        $('.mainFeature').contents().text((i, text) => {
            if ((i % 2) === 0) {
                fields.push(text.replace(/ /g, '').trim())
            } else {
                values.push(text.trim())
            }
        });

        let data = {}
        fields.forEach((field, index) => {
            data[field] = values[index]
        })

        return data;
    }

    function getDataFromFeatureColumnsClass() {
        const dataFields = {};
        const dataValues = []
        $('.featureCols, .attribute, .propAttrValue').text((index, text) => {
            if (index % 2 === 0 && index !== 0)
                dataValues.push(text)
        })
        let count = 0;
        $('.featureCols, .attribute, .attributeLabel').text((index, text) => {
            if (index % 2 === 0 && index !== 0) {
                dataFields[text.replace(/ /g, '')] = dataValues[count]
                count++
            }
        })
        return dataFields;
    }

    function getPropertyImages() {
        let images = []
        $('#modalGallery > div > div > img').each((index, element) => {
            images.push(element.attribs['data-src'])
        })

        return images
    }

    const dataFromDataLayer = getDataFromDataLayer();
    const featureColumnsClassData = getDataFromFeatureColumnsClass();
    const mainFeaturesClassData = getDataFromMainFeaturesClass();

    return {
        price: dataFromDataLayer.price,
        location: dataFromDataLayer.suburb,
        image: $('meta[property="og:image"]').attr('content'),
        title: $('meta[property="og:title"]').attr('content'),
        bedrooms: dataFromDataLayer.bedrooms,
        bathrooms: featureColumnsClassData['Bathrooms'],
        parking: featureColumnsClassData['Garages'],
        floorSize: mainFeaturesClassData['FloorArea'],
        levy: mainFeaturesClassData['Levy'],
        rates: mainFeaturesClassData['Rates'],
        images: getPropertyImages()
    }
}

module.exports = getPrivatePropertyData
