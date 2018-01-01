# STR2PNG

## Install str2png

Add this in your package.json:
```javascript
"str2png": "https://github.com/Ehstrali/str2png"
```

## Convert a file to png

```javascript
const { createWriteStream, readFileSync } = require('fs');
const str2png = require('str2png');

const content = readFileSync('file.js', 'utf8'); // file.js is the file you want to convert, it may not be a js file
const image = str2png.encrypt(content);
image.pipe(createWriteStream('image.png')); // image.png is the converted file
```

## Convert it back

```javascript
const { writeFileSync } = require('fs');
const str2png = require('str2png');

str2png.decrypt('image.png', (content) => {
    writeFileSync('file.js', content))
}
```
