var Landset8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterDate('2018-01-01', '2018-12-31')
    .filterBounds(Rangitoto)
    .filterMetadata("CLOUD_COVER", "less_than", 50)
print(Landset8)

