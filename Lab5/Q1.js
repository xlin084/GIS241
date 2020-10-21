// Task 1
// Unsupervised classification

var AOI = ee.Geometry.Rectangle(174.5666, -36.980168, 174.96900, -36.7235777);
Map.centerObject(AOI, 11)

var image = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_074085_20190302').clip(AOI);

Map.addLayer(image, {bands: 'B4,B3,B2', min: '0,0,0', max: '0.4,0.4,0.4'}, 'L8 image 20190302')

// Make the training dataset.
var training = image.sample({
  region: AOI,
  scale: 30,
  numPixels: 5000
});

// Instantiate the clusterer and train it.
var clusterer = ee.Clusterer.wekaKMeans(7).train(training);

// Cluster the input using the trained clusterer.
var result = image.cluster(clusterer);

// Display the clusters with random colors.
//Map.addLayer(result.randomVisualizer(), {}, 'clusters');

//palette colour stands for: forest(Dark green), grass(light green), houses&urban area(white), buildings(yellow), sea(water) (blue)
//Map.addLayer(result, {min: 0, max: 4, palette: ['#034013', '#43e86a', '#ffffff', 'yellow', '#086bbd']}, '5_Classes');
Map.addLayer(result, {min: 0, max: 6, palette: ['yellow', '#43e86a', '#ffffff', 'purple', '#0c1991', '#086bbd', '#034013']}, '7_Classes');
//palette colour stands for: beach/sand(yellow), grass(light green), houses&urban area(white), buildings(purple),  deep sea(deep blue), near sea(light blue), forest(Dark green)