var request = require('superagent');
var q = require('q');
var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';

function geocode(options){
  var deffered = q.defer();

  var query = {};

  if(!options){
    throw new Error('Must supply an options object');
  }

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

  if(options.components ){
    query.components = [];
    for(var i in options.components){
      query.components.push([i, options.components[i]].join(':'))
    }
    query.components = query.components.join('|')
  }

  if(options.latlng){
    if(options.place_id){
      return deffered.reject(new Error('Cannot supply latlng and place_id in a single query'));
    }
    query.latlng = options.latlng.join(',')
  }

  if(options.place_id){
    if(options.latlng){
      return deffered.reject(new Error('Cannot supply latlng and place_id in a single query'));
    }
    query.place_id = options.place_id
  }

  if(options.result_type){
    query.result_type = options.result_type.join('|')
  }

  request.get(baseUrl).query(query).end(function(err, response){
    if(err){
      deffered.reject(err);
    } else {
      if(response.body.results.length > 0){
        deffered.resolve(response.body.results)
      } else {
        if(response.body.error_message){
          deffered.reject(new Error(response.body.error_message))
        } else {
          deffered.reject(new Error('No results'))
        }
      }
    }
  })
  return deffered.promise;
}

module.exports = geocode;
