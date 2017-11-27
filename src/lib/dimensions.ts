/**
 * Generate dimensions of the PNG to create from the length of an array
 * @param {number} length Length of the hexadecimal array
 * @returns {number; number} Returns height and width of the PNG to create
 */
function getDimensions(length: number): { height: number; width: number } {
    if (typeof length !== 'number' || (length <= 0)) {
        return { height: 0, width: 0 }
    }

    function PGCD(a: number, b: number): number {
        if (b === 0) {
            return a
        } else {
            return PGCD(b, a % b)
        }
    }

    const sqrt: number = Math.round(Math.sqrt(length));
    let width: number = sqrt;
    let height: number = PGCD(sqrt, length);

    if ((height === 1 || width === 1) && length > 700) {
        while (height * width < length) {
            height += Math.round((length - (height * width)));
            width += Math.round((length - (height * width)))
        }
    } else {
        while (height * width < length) {
            height += Math.round((length - (height * width)) / 2);
            width += Math.round((length - (height * width))) / 10
        }
        if (Math.round(width) < width) {
            width = Math.round(width) + 1
        } else {
            width = Math.round(width)
        }
    }

    while (Math.round(height / 2) * Math.round(width / 3) > length) {
        height = Math.round(height / 2);
        width = Math.round(width / 3)
    }

    while ((Math.round(height / 1.1) * Math.round(width / 1.1) > length) && length > 14) {
        height = Math.round(height / 1.1);
        width = Math.round(width / 1.1)
    }

    if (height > width) {
        // If height and width are not equal, then image must be wider than tall
        const remember: number = height;
        height = width;
        width = remember
    }

    while ((width > height) && ((width / 1.001) > (height * 1.001)) && ((width / 1.001) * (height * 1.001) > length)) {
        // We are trying to get closer to a square
        width = width / 1.001;
        height = height * 1.001;
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
        // Again, we are trying to get closer to a square
        // height must be equal to width as much as possible
        if ((height > width && (height - 1) * width > length) || height === width) {
            height -= 1
        } else if ((width > height && height * (width - 1) > length) || ((width = height) && (height * (width - 1) > length))) {
            width -= 1
        }
    }

    return { height: height, width: width }
}

module.exports = { getDimensions }
