// Dubai

var geometry = ee.Geometry.Rectangle([54.838223266, 24.915374563,55.466503906, 25.28224203]);  // area which we need to focus

Map.centerObject(geometry, 10);  // centered to Dubai

var collection1999 = ee.ImageCollection("LANDSAT/LE07/C01/T1_TOA")
  .filterBounds(geometry)
  .filterDate('1999-01-01', '1999-12-31')
  .filter(ee.Filter.lt('CLOUD_COVER', 20));

var collection2015 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
  .filterBounds(geometry)
  .filterDate('2015-01-01', '2015-12-31')
  .filter(ee.Filter.lt('CLOUD_COVER', 20));

var collection2020 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
  .filterBounds(geometry)
  .filterDate('2020-01-01', '2020-10-01')
  .filter(ee.Filter.lt('CLOUD_COVER', 20));

var median1999 = collection1999.median();
var loc_area_1999 = ee.Image(median1999).clip(geometry);
//Map.addLayer(loc_area_1999, {}, 'loc_area_1999');

var median2015 = collection2015.median();
var loc_area_2015 = ee.Image(median2015).clip(geometry);
//Map.addLayer(loc_area_2015, {}, 'loc_area_2015');

var median2020 = collection2020.median();
var loc_area_2020 = ee.Image(median2020).clip(geometry);
//Map.addLayer(loc_area_2020, {}, 'loc_area_2020');

// (large) image for each year 
Map.addLayer(median1999, {bands: 'B3,B2,B1', min:'0,0,0', max: '0.5,0.5,0.5'}, '1999');
Map.addLayer(median2015, {bands: 'B4,B3,B2', min:'0,0,0', max: '0.5,0.5,0.5'}, '2015');
Map.addLayer(median2020, {bands: 'B4,B3,B2', min:'0,0,0', max: '0.5,0.5,0.5'}, '2020');

//var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11'];  //Lanset 8
var bands = ['B1','B2', 'B3', 'B4', 'B5','B7', 'B8', 'BQA']; // Landset 7


// 1999 clssification
var polygons_1999 = ee.FeatureCollection([
  ee.Feature(water, {'class':1}),
  ee.Feature(sand, {'class':2}),
  ee.Feature(urban, {'class':3}),
]);

var training_1999 = loc_area_1999.sampleRegions({ // training data
  collection: polygons_1999,
  properties: ['class'],
  scale: 30,
  tileScale: 8 // could be deleted
});

var classifier = ee.Classifier.libsvm({
  kernelType: 'RBF',
  gamma: 0.5,
  cost: 10
});

var trained_1999 = classifier.train(training_1999, 'class', bands);

var classified_1999 = loc_area_1999.classify(trained_1999);

Map.addLayer(classified_1999,
            {min: 1, max: 3, palette: ['blue', '006600', '99ff33']}, 'classified image 1999');



// 2015 classification
var polygons_2015 = ee.FeatureCollection([
  ee.Feature(water_15, {'class':10}),
  ee.Feature(sand_15, {'class':20}),
  ee.Feature(urban_15, {'class':30}),
]);

var training_2015 = loc_area_2015.sampleRegions({ // training data
  collection: polygons_2015,
  properties: ['class'],
  scale: 30,
  tileScale: 8 // could be deleted
});

var classifier = ee.Classifier.libsvm({
  kernelType: 'RBF',
  gamma: 0.5,
  cost: 10
});

var training_2015 = classifier.train(training_2015, 'class', bands);

var classified_2015 = loc_area_2015.classify(training_2015);

Map.addLayer(classified_2015,
            {min: 10, max: 30, palette: ['67a9cf', 'ef8a62', 'f7f7f7']}, 'classified image 2015');
            
            
// 2020 classification
var polygons_2020 = ee.FeatureCollection([
  ee.Feature(water_20, {'class':100}),
  ee.Feature(sand_20, {'class':200}),
  ee.Feature(urban_20, {'class':300}),
]);

var training_2020 = loc_area_2020.sampleRegions({ // training data
  collection: polygons_2020,
  properties: ['class'],
  scale: 30,
  tileScale: 8 // could be deleted
});

var classifier = ee.Classifier.libsvm({
  kernelType: 'RBF',
  gamma: 0.5,
  cost: 10
});

var trained_2020 = classifier.train(training_2020, 'class', bands);

var classified_2020 = loc_area_2020.classify(trained_2020);

Map.addLayer(classified_2020,
            {min: 100, max: 300, palette: ['91bfdb',  'fc8d59', 'ffffbf']}, 'classified image 2020');


// algebra values change in time 
var diff9920 = classified_2020.subtract(classified_1999); // 1999 and 2020
Map.addLayer(diff9920,
            {min: 97, max: 299, palette: ['8dd3c7',  'ffffb3', 'bebada', 'fb8072', '80b1d3', 'fdb462', 'b3de69', 'fccde5', 'd9d9d9']}, 'diff9920');
            
var diff1520 = classified_2020.subtract(classified_2015); // 2015 and 2020
Map.addLayer(diff1520,
            {min: 70, max: 290, palette: ['8dd3c7',  'ffffb3', 'bebada', 'fb8072', '80b1d3', 'fdb462', 'b3de69', 'fccde5', 'd9d9d9']}, 'diff1520');
            
var diff9915 = classified_2015.subtract(classified_1999); // 1999 and 2015
Map.addLayer(diff9915,
            {min: 7, max: 29, palette: ['8dd3c7',  'ffffb3', 'bebada', 'fb8072', '80b1d3', 'fdb462', 'b3de69', 'fccde5', 'd9d9d9']}, 'diff9915');


var Landset1999 = median1999.select('B3', 'B2', 'B1');
var cliped_landset_1999 = ee.Image(Landset1999).clip(geometry);
Map.addLayer(cliped_landset_1999, {bands: 'B3,B2,B1', min:'0,0,0', max: '0.5,0.5,0.5'}, 'clipedLandset_1999');

var Landset2015 = median2015.select('B4', 'B3', 'B2');
var cliped_landset_2015 = ee.Image(Landset2015).clip(geometry);
Map.addLayer(cliped_landset_2015, {bands: 'B4,B3,B2', min:'0,0,0', max: '0.5,0.5,0.5'}, 'clipedLandset_2015');

var Landset2020 = median2020.select('B4', 'B3', 'B2');
var cliped_landset_2020 = ee.Image(Landset2020).clip(geometry);
Map.addLayer(cliped_landset_2020, {bands: 'B4,B3,B2', min:'0,0,0', max: '0.5,0.5,0.5'}, 'clipedLandset_2020');

// Export.image.toDrive({
//   image: diff9920.toInt(),
//   description: 'diff9920',
//   scale: 30,
//   crs: 'EPSG:3857',
//   region: geometry
// });

// Export.image.toDrive({
//   image: diff1520.toInt(),
//   description: 'diff1520',
//   scale: 30,
//   crs: 'EPSG:3857',
//   region: geometry
// });

// Export.image.toDrive({
//   image: diff9915.toInt(),
//   description: 'diff9915',
//   scale: 30,
//   crs: 'EPSG:3857',
//   region: geometry
// });

// Export.image.toDrive({
//   image: classified_1999,
//   description: 'Dubai_1999',
//   scale: 30,
//   crs: 'EPSG:3857',
//   region: geometry
// });

// Export.image.toDrive({
//   image: classified_2015,
//   description: 'Dubai_2015',
//   scale: 30,
//   crs: 'EPSG:3857',
//   region: geometry
// });

// Export.image.toDrive({
//   image: classified_2020,
//   description: 'Dubai_2020',
//   scale: 30,
//   crs: 'EPSG:3857',
//   region: geometry
// });