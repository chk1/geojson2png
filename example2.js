var mapnik = require('mapnik');
var fs = require('fs');

mapnik.register_default_input_plugins();
var map = new mapnik.Map(600, 400);
map.loadSync("data/countries-stylesheet.xml");
map.zoomAll();
map.renderFileSync("example2.png");
console.log('saved map image to example2.png');