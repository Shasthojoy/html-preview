# html-preview

[![Build Status](https://travis-ci.org/ewnd9/html-preview.svg?branch=master)](https://travis-ci.org/ewnd9/html-preview)

Trim down an HTML string to a specific length.

Useful for creating previews for APIs which you can't control (e.g. RSS feeds)

## Install

```
$ npm install --save html-preview
```

## Usage

```js
const preview = require('html-preview');

const html = '<span>text1</span><span>test2</span><span>test3</span>';
const limit = 10;

preview(html, limit); //=> '<span>text1</span><span>test2</span>'
```

## License

MIT © [ewnd9](http://ewnd9.com)
