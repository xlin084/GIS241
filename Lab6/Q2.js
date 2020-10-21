//loads the SRTM data
var SRTM = ee.Image('CGIAR/SRTM90_V4');

//calculates slope from the SRTM
var slope = ee.Terrain.slope(SRTM);

//adds slope and renders it from green to red colour ramp
//Map.addLayer(slope, {min: 0, max: 90, palette: ['00ff00' , 'ff0000']}, 'slope');
Map.addLayer(slope, {min: 0, max: 90, palette: ['1a9641' ,'a6d96a', 'ffffbf', 'fdae61', 'd7191c']}, 'slope');

//calculates hillshade
var hillshade = ee.Terrain.hillshade(SRTM);

//adds hillshade
Map.addLayer(hillshade, {min:150, max:255, palette: ['ffffff', '000000']}, 'Hillshade');

//elevation
Map.addLayer(SRTM, {min: 0, max: 3724, palette: ['feebe2', 'f768a1']}, 'elevation')  //SRTM stores elevation datas; the highest mountain in NZ is 3724 m.

// //elevation
// var elevation = SRTM.select(SRTM);
// var slope_for_elevation = ee.Terrain.slope(elevation);
// //adds elevation
// Map.addLayer(slope, {min: 0, max: 60, palette: ['feebe2', 'fbb4b9', 'f768a1', 'c51b8a', '7a0177']}, 'Elevation');
// //Map.addLayer(slope, {min: 0, max: 60, palette: ['ffffff', 'a5effa']}, 'Elevation');