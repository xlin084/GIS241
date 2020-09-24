var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate('2018-01-01', '2019-12-31')
                  .filterBounds(Albert_Park)

var median = dataset.reduce(ee.Reducer.median());

print(median)

var visParams = {
  bands: ['B4_median', 'B3_median', 'B2_median'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};

Map.addLayer(median, visParams);