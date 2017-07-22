var mapnik = require('mapnik');
var mapnikify = require('@mapbox/geojson-mapnikify');
var fs = require('fs');

var width = 512;
var height = 512;
var outputFilename = 'example1.png'

/* read GeoJSON into variable */
var filename = 'data/countries.geojson';
var geojson = JSON.parse(fs.readFileSync(filename));

/* convert GeoJSON to Mapnik XML */
mapnikify(geojson, false, function(err, xml){
  if(err) throw err;

  /* render the Mapnik XML */
  var map = new mapnik.Map(width, height);
  mapnik.register_default_input_plugins();
  map.fromString(xml, {}, function(err,map) {
      if (err) throw err;
      map.zoomAll();
      var im = new mapnik.Image(width, height);
      map.render(im, function(err,im) {
        if (err) throw err;
        im.encode('png', function(err,buffer) {
            if (err) throw err;
            fs.writeFile(outputFilename, buffer, function(err) {
                if (err) throw err;
                console.log('saved map image to '+outputFilename);
            });
        });
      });
  });
});
