# STR2PNG

## Convert a file to png

```javascript
const content = fs.readFileSync('file.js', 'utf8');
const image = encrypt(content);
image.pipe(fs.createWriteStream('image.png'));
```

## Convert it back

```javascript
const content = decrypt('image.png', (content) => {
    fs.writeFileSync('file.js', content))
}
```