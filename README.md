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
// file.js is the file you want to convert
const content = readFileSync('file.js', 'utf8');
// image is a Buffer, it's the content of the image
// content must be of type string
const image = str2png.encrypt(content);
// image.png is the path to the converted file
image.pipe(createWriteStream('image.png'));
```

## Convert it back

```javascript
const { writeFileSync, readFileSync } = require('fs');
const str2png = require('str2png');

const imageBuffer = readFileSync('image.png');
// First argument must be a Buffer of the image
str2png.decrypt(imageBuffer, (content) => {
    writeFileSync('file.js', content)
})
```
