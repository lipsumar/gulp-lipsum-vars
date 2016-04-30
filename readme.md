# gulp-lipsum-vars [![Build Status](https://travis-ci.org/lipsumar/gulp-lipsum-vars.svg?branch=master)](https://travis-ci.org/lipsumar/gulp-lipsum-vars)

Replace `$lipsum(words:2)` by `lorem ipsum`

## Example

```html
<p>Hello $lipsum(words:3)</p>
```

Will output

```html
<p>Hello voluptate quis incididunt</p>
```

## Install

```
$ npm install --save-dev gulp-lipsum-vars
```


## Usage

```js
const gulp = require('gulp');
const lipsumVars = require('gulp-lipsum-vars');

gulp.task('default', () => {
	gulp.src('src/file.ext')
		.pipe(lipsumVars())
		.pipe(gulp.dest('dist'))
);
```


## API

### lipsumVars()

#### options

None


## License

MIT © [Emmanuel Pire](https://github.com/lipsumar)
