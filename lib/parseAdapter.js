var request  = require('request');
var root_url = "https://api.parse.com/1";
var buildUrl = function( klass, id ){
  var url = root_url + '/' + klass;

  if( id ){
    url += '/' + options.id; 
  }
  url += '.json';

  return url;
};

var Parse = function(app_id, rest_api_key) {
      headers       = {
        'X-Parse-Application-Id':   app_id,
        'X-Parse-REST-API-Key':     rest_api_key
      };

  var parse = {

    root_url:     root_url,
    headers:      headers,

    read: function ( klass, options, callback ) {
      var url     = buildUrl( klass, options.id );
      var payload = {
        headers: parse.headers
      };

      request.get( url, payload, function( error, response, body ) {
        var json = JSON.parse(body);
        callback(json);
      });

    },

    create: function ( klass, options, callback ) {
      var payload = {
        headers:  parse.headers,
        url:      buildUrl( klass ),
      };

      if( options.body ){
        payload.json = options.body;
      }
      
      request.post(payload, function(error, response, body) {
        var json = JSON.parse(body);
        callback( json );
      });
    },

    update: function( klass, options, callback) {
      var new_headers = parse.headers;

      if ( typeof options.body.session_token ) {
        new_headers["X-Parse-Session-Token"] = json.session_token;
        delete options.body.session_token;
      }

      var payload = {
        headers:  new_headers,
        url:      buildUrl( klass ),
        json:     options.body
      };

      request.put(payload, function(error, response, body) {
        callback(body);
      });
    },

    del: function(){}
  }

  return parse;
}

module.exports = Parse;