/* @wolfram77 */
/* ZED - general purpose module */
/* fn: apush, arrange, scatter */

// required modules
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');


// define
module.exports = function() {
	var o = new EventEmitter();

	// push items from source array
	o.apush = function(dst, src) {
		Array.prototype.push.apply(dst, src);
		return dst;
  };

	// arrange objects of same kind into arrays
	o.arrange = function(dst, src, ps) {
		ps = ps? ps : _.keys(src[0]);
    _.forEach(ps, function(p) {
      o.apush(dst[p] = dst[p]||[], _.pluck(src, p));
    });
    return dst;
	};

	// scatter arrays into objects of same kind
	o.scatter = function(dst, src, ps) {
		ps = ps? ps : _.keys(src);
		for(var i=0,I=src[ps[0]].length; i<I; i++) {
			for(var p=0,P=ps.length,v={}; p<P; p++)
				v[ps[p]] = src[ps[p]][i];
			dst.push(v);
		}
		return dst;
	};

	// ready
	console.log('zed> ready!');
	return o;
};
