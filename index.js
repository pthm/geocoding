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
