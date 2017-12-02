"use strict";
function getDimensions(length) {
    if (typeof length !== 'number' || (length <= 0)) {
        return { height: 0, width: 0 };
    }
    let width = Math.round(Math.sqrt(length));
    let height = Math.round(Math.sqrt(length));
    while (height * width < length) {
        height *= 2.1;
        width *= 1.9;
    }
    while ((width > height) && ((width / 1.01) > (height * 1.01)) && ((width / 1.01) * (height * 1.01) > length)) {
        width = width / 1.01;
        height = height * 1.01;
    }
    if (Math.round(width) < width) {
        width = Math.round(width) + 1;
    }
    else {
        width = Math.round(height);
    }
    if (Math.round(height) < height) {
        height = Math.round(height) + 1;
    }
    else {
        height = Math.round(height);
    }
    while ((height * (width - 1) > length) || ((height - 1) * width > length)) {
        if (((height > width) && ((height - 1) * width > length)) || height === width) {
            height -= 1;
        }
        else if (((width > height) && (height * (width - 1) > length)) || ((width = height) && (height * (width - 1) > length))) {
            width -= 1;
        }
    }
    return { height: height, width: width };
}
module.exports = { getDimensions };