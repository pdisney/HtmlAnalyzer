var URL = require('url');
const path = require('path');
const Tag = require('./Tag');

const URL_EXTENTION_TO_INCLUDE = [
    '.txt',
    '.pdf',
    '.ppt',
    '.pptx',
    '.doc',
    '.docx',
    '.csv',
    '.xls',
    '.xlsx',
    '.rar',
    '.zip',
    '.gz',
    '.rtf',
    '.xml',
    '.json'
];



/**
 * Helper funcction to determine if a string ends with a particular value.
 * @param {string} str 
 * @param {string} suffix 
 */
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

/**
 *  Determines if an href's value ends with the desired ending.
 * @param {string} href 
 */
function hrefEndingValid(href) {
    for (var i = 0; i < URL_EXTENTION_TO_INCLUDE.length; i++) {
        var ending = URL_EXTENTION_TO_INCLUDE[i];
        if (endsWith(href, ending)) {
            return true;
        } else {
            var filename = path.basename(href);
            var url = URL.parse(href);
            if (url.protocol && filename.indexOf('.') === -1
                && url.protocol.indexOf('ftp') !== -1) {
                return true;
            }
        }

    }
    return false;

}


class FileTag extends Tag {

    constructor(baseurl, tag, includeTypes) {
        super(baseurl, tag);
        if (!includeTypes) {
            this.includeTypes = URL_EXTENTION_TO_INCLUDE;
        }
        this.validFileType = this.isValidFileType();

    }

    isValidFileType(){
        return hrefEndingValid(this.href);
    }


    getValidFileTypes() {
        return this.includeTypes;
    }

}


module.exports = FileTag;