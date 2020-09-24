//var roi = /* color: #bf04c2 */ee.Geometry.Point([174.09696847206172, -39.05009183981138]),
//    Sea = /* color: #d63000 */ee.Geometry.Polygon(
//        [[[174.08058882877015, -39.04180270254351],
//        [174.08814192935608, -39.04173603896596],
//        [174.08179045840882, -39.03700276418143]]]),
//    Urban = /* color: #0b4a8b */ee.Geometry.Polygon(
//        [[[174.10095561328532, -39.047298869578874],
//        [174.10162080112102, -39.04876533826855],
//        [174.10387385669353, -39.04826540918121],
//        [174.10290826144816, -39.04688225360227]]]),
//    Lake = /* color: #ffc82d */ee.Geometry.Polygon(
//        [[[174.11305428668638, -39.040719411614184],
//        [174.11339760944028, -39.04191936365287],
//        [174.1158866994061, -39.04125272614749],
//        [174.11528588458677, -39.03971943601358]]]),
//    Beach = /* color: #00ffff */ee.Geometry.Polygon(
//        [[[174.10059790574974, -39.04139791218416],
//        [174.0989885803408, -39.0436394512047],
//        [174.099203157062, -39.043764441993375],
//        [174.10096268617576, -39.041372913206715],
//        [174.10056571924156, -39.04123958517762]]]);

// Script to select and display least cloudy LS8 image for
// an area in a given date range and generate a scatter plot of spectral response
// for broad land cover types for visible to SWIR bands (B1 - B7)
// Note I have added some ??? to the code for you to fix.

var Sea = ee.Feature(Sea, { label: 'Sea' });
var Urban = ee.Feature(Urban, { label: 'Urban' });
var Lake = ee.Feature(Lake, { label: 'Lake' });
var Beach = ee.Feature(Beach, { label: 'Beach' });

// Select and display image
var image = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterBounds(roi)
    .filterDate('2019-01-01', '2019-12-31')
    .sort('CLOUD_COVER')
    .first()
print(image)

Map.addLayer(image, { bands: ['B4', 'B3', 'B2'], min: 0, max: 3000, gamma: 1.5 })
Map.centerObject(roi, 8)

// Define image bands and surface features to include in spectral response curves
var subset = image.select('B[1-7]').multiply(0.0001)
var surfaceFeats = ee.FeatureCollection([Sea, Urban, Lake, Beach])

// Define plot variables
var plotVar = {
    title: 'Landsat-8 Surface reflectance response',
    hAxis: { title: 'Landsat bands' },
    vAxis: { title: 'Reflectance' },
    lineWidth: 1,
    pointSize: 4,
    series: {
        0: { color: 'blue' },
        1: { color: 'red' },
        2: { color: 'black' },
        3: { color: 'green' },
    }
};

// Create scatter plot of spectral response
var scatter = ui.Chart.image.regions(
    subset, surfaceFeats, ee.Reducer.mean(), 10, 'label')
    .setChartType('ScatterChart')
    .setOptions(plotVar);

// Display plot              
print(scatter)