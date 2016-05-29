# geocoding
A full-featured wrapper for Google's Geocoding api

## Usage
```javascript
var geocoding = require('geocoding')
```

## Examples

### Simple address geocoding

```javascript
geocoding({address: '1 Infinite Loop'}).then(function(results){
  console.log(results);
  /*
  [ { address_components:
     [ [Object],
       [Object],
       [Object],
       [Object],
       [Object],
       [Object],
       [Object],
       [Object] ],
    formatted_address: '1 Infinite Loop, Cupertino, CA 95014, USA',
    geometry:
     { location: [Object],
       location_type: 'ROOFTOP',
       viewport: [Object] },
    place_id: 'ChIJN7JUxLa1j4AR7-m1UdKbLow',
    types: [ 'street_address' ] } ]
    */
})
```

### Component filtering

```javascript
geocoding({
  address: 'Santa Cruz',
  components: {
    country: 'ES'
  }
}).then(function(results){
  console.log(results);
  /*
  [ { address_components: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
    formatted_address: 'Santa Cruz de Tenerife, Santa Cruz de Tenerife, Spain',
    geometry:
     { bounds: [Object],
       location: [Object],
       location_type: 'APPROXIMATE',
       viewport: [Object] },
    place_id: 'ChIJcUElzOzMQQwRLuV30nMUEUM',
    types: [ 'locality', 'political' ] } ]
  */
})
```

### Viewport filtering

```javascript
geocoding({
  address: 'Winnetka',
  bounds: {
    northeast : {
       lat : 34.172684,
       lng : -118.604794
    },
    southwest : {
       lat : 34.236144,
       lng : -118.500938
    }
  }
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
```
