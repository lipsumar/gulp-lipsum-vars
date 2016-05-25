/* jshint node:true */
'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var loremIpsum = require('lorem-ipsum');

var re = /\$lipsum\(([a-z:0-9-,]*)\)/gm;

function process(str) {
	var m;
	var out = str;
	var lipsum;
	var matches = [];

	// collect matches so we can look ahead
	while ((m = re.exec(str)) !== null) {
		if (m.index === re.lastIndex) {
			re.lastIndex++;
		}
		matches.push(m);
	}

	if (matches.length > 0) {
		// start with first part
		out = str.substr(0, matches[0].index);

		for (var i = 0; i < matches.length; i++) {
			m = matches[i];
			var lipsumOpts = parseLipsumOptions(m[1]);

			if (lipsumOpts.words) {
				lipsum = loremIpsum({
					count: parseInt(lipsumOpts.words, 10),
					units: 'words'
				});
			}

			if (!lipsum) {
				lipsum = 'lipsum';
			}

			// add lipsum
			out += lipsum;

			// add the rest
			if (matches[i + 1]) {
				out += str.substr(m.index + m[0].length, matches[i + 1].index - (m.index + m[0].length));
			} else {
				out += str.substr(m.index + m[0].length);
			}
		}
	}

	return out;
}

function parseLipsumOptions(str) {
	var opts = {};
	var kvs = str.split(',');
	kvs.forEach(function (kv) {
		var p = kv.split(':');
		var k = p[0];
		var v = p[1];

		opts[k] = v;
	});
	return opts;
}

module.exports = function (opts) {
	opts = opts || {};

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-lipsum-vars', 'Streaming not supported'));
			return;
		}

		try {
			file.contents = new Buffer(process(file.contents.toString(), opts));
			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-lipsum-vars', err));
		}

		cb();
	});
};
