Map.addLayer(WaitakiDEM2016, {}, '2016_DEM');

Map.addLayer(WaitakiDEM2018, {}, '2018_DSM');

//Centered to the middle of the region
Map.centerObject(WaitakiDEM2018, 14);

var DEM_diff = WaitakiDEM2018.subtract(WaitakiDEM2016)

Map.addLayer(DEM_diff, {min: -2.5, max: 2.4, palette:['b2182b', 'ef8a62', 'fddbc7', 'f7f7f7', 'd1e5f0', '67a9cf', '2166ac']}, 'DEM_difference')