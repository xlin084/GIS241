// Task 2
// Supervised classification

var AOI = ee.Geometry.Rectangle(174.5666, -36.980168, 174.96900, -36.7235777);

Map.centerObject(AOI, 11)

var image = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_074085_20190302').clip(AOI);

Map.addLayer(image, {bands: 'B4,B3,B2', min: '0,0,0', max: '0.4,0.4,0.4'}, 'L8 image 20190302')

// Use these bands for prediction.
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11'];

// Make a FeatureCollection from the hand-made geometries.
var polygons = ee.FeatureCollection([
  ee.Feature(water, {'class': 1}),
  ee.Feature(forest, {'class': 2}),
  ee.Feature(grass, {'class': 3}),
]);

// Get the values for all pixels in each polygon in the training.
var training = image.sampleRegions({
  // Get the sample from the polygons FeatureCollection.
  collection: polygons,
  // Keep this list of properties from the polygons.
  properties: ['class'],
  // Set the scale to get Landsat pixels in the polygons.
  scale: 30
});

// Create an SVM classifier with custom parameters.
var classifier = ee.Classifier.libsvm({
  kernelType: 'RBF',
  gamma: 0.5,
  cost: 10
});

// Train the classifier.
var trained = classifier.train(training, 'class', bands);

// Classify the image.
var classified = image.classify(trained);

// Display the classification result and the input image.
//Map.addLayer(polygons, {}, 'training polygons');
Map.addLayer(classified,
            {min: 1, max: 3, palette: ['blue', '006600', '99ff33']},
            'classified image');