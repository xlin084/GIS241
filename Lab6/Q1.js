//loads the SRTM data
var SRTM = ee.Image('CGIAR/SRTM90_V4');

//calculates slope from the SRTM
var slope = ee.Terrain.slope(SRTM);

//adds slope and renders it from green to red colour ramp
//Map.addLayer(slope, {min: 0, max: 90, palette: ['00ff00' , 'ff0000']}, 'slope');
Map.addLayer(slope, {min: 0, max: 90, palette: ['1a9641' ,'a6d96a', 'ffffbf', 'fdae61', 'd7191c']}, 'test');

//calculates hillshade
var hillshade = ee.Terrain.hillshade(SRTM);

//adds hillshade
Map.addLayer(hillshade, {min:150, max:255, palette: ['ffffff', '000000']}, 'Hillshade');