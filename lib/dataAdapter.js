/** DataAdapter
  *
  * The main pupose for this file is to allow for a decoupled
  * module to drive the data returns so that not to tie down 
  * the app to one database type
  */

module.exports = function( path, auth ){

	var Adapter = require( path );

	// validates the adapter
	if ( typeof Adapter === 'function' ) {

		// authenticate the adapter
		var adpater = Adapter.apply( null, auth );
		
		// look for basic methods
		if (
			typeof adapter.create === 'function' &&
			typeof adapter.read === 'function' &&
			typeof adapter.update === 'function' &&
			typeof adapter.del === 'function'
		) {
			//if we have a good one 
			return adapter;
		}
	}

	return null;

};