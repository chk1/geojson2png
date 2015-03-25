var mapnik = require('mapnik');
var mapnikify = require('geojson-mapnikify');
var fs = require('fs');

var width = 512;
var height = 512;

/* read GeoJSON into variable */
var filename = 'countries.geojson';
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
      //console.log(map);
      var im = new mapnik.Image(width, height);
      map.render(im, function(err,im) {
        console.log(map);
        if (err) throw err;
        im.encode('png', function(err,buffer) {
            if (err) throw err;
            fs.writeFile('map.png',buffer, function(err) {
                if (err) throw err;
                console.log('saved map image to map.png');
            });
        });
      });
  });
});

