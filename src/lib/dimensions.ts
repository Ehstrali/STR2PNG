/**
 * Generate dimensions of the PNG to create from the length of an array
 * @param {number} length Length of the hexadecimal array
 * @returns {number; number} Returns height and width of the PNG to create
 */
function getDimensions(length: number): { height: number; width: number } {
    if (typeof length !== 'number' || (length <= 0)) {
        return { height: 0, width: 0 }
    }

    let width: number = Math.round(Math.sqrt(length));
    let height: number = Math.round(Math.sqrt(length));

    while (height * width < length) {
        height *= 2.1;
        width *= 1.9;
    }

    while ((width > height) && ((width / 1.01) > (height * 1.01)) && ((width / 1.01) * (height * 1.01) > length)) {
        // We are trying to get closer to a square
        width = width / 1.01;
        height = height * 1.01;
    }

    if (Math.round(width) < width) { // Round width
        width = Math.round(width) + 1
    } else {
        width = Math.round(height)
    }

    if (Math.round(height) < height) { // Round height
        height = Math.round(height) + 1
    } else {
        height = Math.round(height)
    }

    while ((height * (width - 1) > length) || ((height - 1) * width > length)) {
        // Height must be equal to width as much as possible
        if (((height > width) && ((height - 1) * width > length)) || height === width) {
            height -= 1
        } else if (((width > height) && (height * (width - 1) > length)) || ((width = height) && (height * (width - 1) > length))) {
            width -= 1
        }
    }
    return { height: height, width: width }
}

module.exports = { getDimensions }
