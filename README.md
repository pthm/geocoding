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
})
```
