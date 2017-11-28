const commentWithoutContent: RegExp = /^([ ]*)\/\/.*$/gm; // Matches if this is a single line comment without any content after the '//'
/**
 * Modified code from: https://github.com/JonathanStoye/single-line-to-multi-line-comment-converter
 * @param {string} line The string to process
 * @param {string} contentSubstitut What to replace with if there is content on this line after the '//'
 * @param {string} noContentSubstitut What to replace with if it is just a comment without content after the '//'
 * @param {boolean} previousAndNextMatch Whether or not the previous && the next line match with a comment
 * @returns {string} The replaced line content
 */
function replaceLineContent(line: string, contentSubstitut: string, noContentSubstitut: string, previousAndNextMatch?: boolean): string {
    const commentWithContent: RegExp = /^([ ]*)\/\/(.+).*$/gm; // Matches if this is a single line comment with some content after the '//'
    const contentExists: RegExpMatchArray | null = line.match(commentWithContent);
    const contentNotExisting: RegExpMatchArray | null = line.match(commentWithoutContent);
    if (contentExists) {
        return line.replace(commentWithContent, contentSubstitut)
    } else if (!previousAndNextMatch && contentNotExisting) { // If comment is empty and there is no previons && next comment
        return line.replace(commentWithoutContent, '')
    } else {
        return line.replace(commentWithoutContent, noContentSubstitut)
    }
}
/**
 * Modified code from: https://github.com/JonathanStoye/single-line-to-multi-line-comment-converter
 * @param {string} line The string to process
 * @param {RegExpMatchArray | null} previousMatch If the previous line was a comment
 * @param {RegExpMatchArray | null} nextMatch If the next line is a comment
 * @returns {string} The replaced line
 */
  function replaceLine(line: string, previousMatch: RegExpMatchArray | null, nextMatch: RegExpMatchArray | null): string {
    if (previousMatch && nextMatch) {
        return replaceLineContent(line, '$1 *$2', '$1 *')
    } else if (previousMatch && !nextMatch) {
        return replaceLineContent(line, '$1 *$2\n$1 */', '$1 */')
    } else if (!previousMatch && nextMatch) {
        return replaceLineContent(line, '$1/**\n$1 *$2', '$1/**')
    } else if (!previousMatch && !nextMatch) {
        return replaceLineContent(line, '$1/*$2 */', '$1/**', false)
    } else {
        return line
    }
}
/**
 * Modified code from: https://github.com/JonathanStoye/single-line-to-multi-line-comment-converter
 * Replace all single line comments in a string with block comments.
 * It resolves a 'bug' which was commenting all code after a single line comment.
 * @param {string} fileContent The file content to process
 * @returns {string} The processed file content
 */
function singleToMultiLineComments(fileContent: string): string {
    const contentLines: string[] = fileContent.split('\n');
    const replacedLines: string[] = contentLines.map((line: string, index: number, contentLines: string[]): string => {
        let previousMatch: RegExpMatchArray | null = null;
        let nextMatch: RegExpMatchArray | null = null;
        if (index > 0) {
            previousMatch = contentLines[index - 1].match(commentWithoutContent)
        }
        if (index < contentLines.length - 2) {
            nextMatch = contentLines[index + 1].match(commentWithoutContent)
        }
        return replaceLine(line, previousMatch, nextMatch)
    })
    return replacedLines.join('\n')
}
/** KNOWN BUGS LIST
 * - It doesn't work for comments at the end of a line
 */
module.exports = { singleToMultiLineComments }
