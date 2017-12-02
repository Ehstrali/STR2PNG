"use strict";
const commentWithoutContent = /^([ ]*)\/\/.*$/gm;
function replaceLineContent(line, contentSubstitut, noContentSubstitut, previousAndNextMatch) {
    const commentWithContent = /^([ ]*)\/\/(.+).*$/gm;
    const contentExists = line.match(commentWithContent);
    const contentNotExisting = line.match(commentWithoutContent);
    if (contentExists) {
        return line.replace(commentWithContent, contentSubstitut);
    }
    else if (!previousAndNextMatch && contentNotExisting) {
        return line.replace(commentWithoutContent, '');
    }
    else {
        return line.replace(commentWithoutContent, noContentSubstitut);
    }
}
function replaceLine(line, previousMatch, nextMatch) {
    if (previousMatch && nextMatch) {
        return replaceLineContent(line, '$1 *$2', '$1 *');
    }
    else if (previousMatch && !nextMatch) {
        return replaceLineContent(line, '$1 *$2\n$1 */', '$1 */');
    }
    else if (!previousMatch && nextMatch) {
        return replaceLineContent(line, '$1/**\n$1 *$2', '$1/**');
    }
    else if (!previousMatch && !nextMatch) {
        return replaceLineContent(line, '$1/*$2 */', '$1/**', false);
    }
    else {
        return line;
    }
}
function singleToMultiLineComments(fileContent) {
    const contentLines = fileContent.split('\n');
    const replacedLines = contentLines.map((line, index, contentLines) => {
        let previousMatch = null;
        let nextMatch = null;
        if (index > 0) {
            previousMatch = contentLines[index - 1].match(commentWithoutContent);
        }
        if (index < contentLines.length - 2) {
            nextMatch = contentLines[index + 1].match(commentWithoutContent);
        }
        return replaceLine(line, previousMatch, nextMatch);
    });
    return replacedLines.join('\n');
}
module.exports = { singleToMultiLineComments };