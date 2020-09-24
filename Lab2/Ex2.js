//var ee = require('@google/earthengine');

// Load an image.
var G241image = ee.Image('LANDSAT/LC08/C01/T1_RT_TOA/LC08_073086_20181018');

// Prints image properties
print(G241image)

// Center the map on the image.
Map.centerObject(G241image, 8);

// Define visualization parameters in an object literal.
var vizParams = { bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3 };

// Display the image.
Map.addLayer(G241image, vizParams, 'Landsat 8 image');

// This function gets NDVI from Landsat 8 imagery.
var getNDVI = function (image) {
    return image.normalizedDifference(['B5', 'B4']);
};

// Compute NDVI from the scenes.
var ndvi1 = getNDVI(G241image);

//Calculate the min and max value by formula and set up palette
Map.addLayer(ndvi1, { min: 0.1184, max: 0.1579, palette: ['07a8ed', '2FF011'] }, 'NDVI');

