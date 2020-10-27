//Create a point in the fire (i.e. long/lat of point)
var firepoint = ee.Geometry.Point([172.61, -43.62]);
//Add the point to the map, called firepoint
Map.addLayer(firepoint, {}, 'firepoint')

//Pre- and post- fire Landsat 8 images
var porthillsL8_after = ee.Image('LANDSAT/LC08/C01/T1_RT_TOA/LC08_073090_20170422');
var porthillsL8_before = ee.Image('LANDSAT/LC08/C01/T1_RT_TOA/LC08_073090_20170116');

// Define visualization parameters for RGB image.
var vizParams = { bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3 };

Map.centerObject(firepoint, 12)

// Display the true colour image.
Map.addLayer(porthillsL8_after, vizParams, 'L8 after');

// This function gets NBR from Landsat 8 imagery.
var getNBR = function(image) {
    return image.normalizedDifference(['B5', 'B7']); // NIR and SWIR band 5 and 7.
};

// Compute NBR from the scenes.
var NBRafter = getNBR(porthillsL8_after);
var NBRbefore = getNBR(porthillsL8_before)

//Calculate the d_NBR (i.e. the difference)
var diff = NBRbefore.subtract(NBRafter);

Map.addLayer(diff, {min: -0.5, max: 0.5, palette: ['00ff00', 'ffffff', 'ff0000']}, 'NBR_diff');

// The region to reduce within.
// Here were are adding a variable called poly. Poly is a rectangle defined by these coordinates,
// i.e. the upper left and then lower right position
var poly = ee.Geometry.Rectangle([172.58236251831056, -43.58258279100498, 172.6422723388672, -43.63975584354196]);

Map.addLayer(poly)

// Reduce the image within the given region, in this example it computes the max pixel value within the "region"
// which in this case is the area "poly".  We also specify the spatial resolution at which to perform the computation
// in this case it is set to 100m.
var max = NBRbefore.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: poly,
    scale: 30
});

// Print the result to the console (you should see a number printed in the console).
print(max);
