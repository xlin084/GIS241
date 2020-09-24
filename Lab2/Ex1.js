// Load an image.
var G241image = ee.Image('LANDSAT/LC08/C01/T1_RT_TOA/LC08_073086_20181018');

// Center the map on the image.
Map.centerObject(G241image, 9);

// Display the image.
Map.addLayer(G241image);

var vizParams = {bands: ['B5', 'B4', 'B2'], min: 0, max: 0.3};

Map.addLayer(G241image, vizParams, 'Landsat 8 image');