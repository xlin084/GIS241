var Albert_Park: Point(174.77, -36.85)

var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate('2018-01-01', '2019-12-31')
                  .filterBounds(Albert_Park)

//var median = dataset.reduce(ee.Reducer.median());
var mean = dataset.reduce(ee.Reducer.mean());

print(mean)

var visParams = {
  bands: ['B4_mean', 'B3_mean', 'B2_mean'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};

Map.addLayer(mean, visParams);