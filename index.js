var request = require('superagent');
var q = require('q');
var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';

function geocode(options){
  var deffered = q.defer();

  var query = {};

  if(options.address){
    query.address = options.address;
  }

  if(options.key){
    query.key = options.key;
  }

  if(options.region){
    query.region = options.region;
  }

  if(options.bounds){
    var bounds = options.bounds;
    var northeast = [bounds.northeast.lat, bounds.northeast.lng].join(',');
    var southwest = [bounds.southwest.lat, bounds.southwest.lng].join(',');
    query.bounds = northeast + '|' + southwest;
  }

  if(options.components){
    query.components = [];
    for(var i in options.components){
      query.components.push([i, options.components[i]].join(':'))
    }
    query.components = query.components.join('|')
  }

  request.get(baseUrl).query(query).end(function(err, response){
    if(err){
      deffered.reject(err);
    } else {
      if(response.body.results.length > 0){
        deffered.resolve(response.body.results)
      } else {
        deffered.reject(new Error('No results'))
      }
    }
  })
  return deffered.promise;
}

module.exports = geocode;
geocode({
  address: 'Toledo',
  region: 'es'
}).then(function(results){
  console.log(results);
  /*
  [ { address_components: [ [Object], [Object], [Object], [Object], [Object] ],
    formatted_address: 'Winnetka, Los Angeles, CA, USA',
    geometry:
     { bounds: [Object],
       location: [Object],
       location_type: 'APPROXIMATE',
       viewport: [Object] },
    place_id: 'ChIJ0fd4S_KbwoAR2hRDrsr3HmQ',
    types: [ 'neighborhood', 'political' ] } ]
  */
})
