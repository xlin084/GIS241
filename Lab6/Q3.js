Map.addLayer(CanterburyDEM, {}, 'Can_DEM');

Map.addLayer(CanterburyDSM, {}, 'Can_DSM');

//Centered to the middle of the region
Map.centerObject(CanterburyDEM, 13);

var local_height = CanterburyDSM.subtract(CanterburyDEM);

//print(local_height);

Map.addLayer(local_height, {min:0, max: 25, palette: ['f6eff7', 'd0d1e6' ,'a6bddb', '67a9cf', '3690c0', '02818a', '016450']}, 'Height')

//hillshade
//var SRTM = ee.Image('CGIAR/SRTM90_V4');
var hillshade = ee.Terrain.hillshade(CanterburyDEM);
Map.addLayer(hillshade, {min:150, max:255, palette: ['ffffff', '000000']}, 'Hillshade');

