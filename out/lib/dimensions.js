"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dimensions;
(function (dimensions) {
    function getDimensions(length) {
        if (typeof length !== 'number' || (length <= 0)) {
            return { height: 0, width: 0 };
        }
        const sqrt = Math.sqrt(length);
        let width = sqrt;
        let height = sqrt;
        while (height * width < length) {
            height *= 2;
            width *= 2;
        }
        while ((width > height) && ((width / 1.01) > (height * 1.01)) && ((width / 1.01) * (height * 1.01) > length)) {
            width = width / 1.001;
            height = height * 1.001;
        }
        width = Math.ceil(width);
        height = Math.ceil(height);
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
    dimensions.getDimensions = getDimensions;
})(dimensions = exports.dimensions || (exports.dimensions = {}));