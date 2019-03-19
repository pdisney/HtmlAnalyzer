const validUrl = require('valid-url');
const Tag = require('./classes/Tag.js');
const FileTag = require('./classes/FileTag.js');
const cheerio = require('cheerio');
const franc = require('franc');

const ANCHOR = 'a';
const INPUT = 'input';
const BUTTON = 'button';
const FORM = 'form';
const SPAN = 'span';
const SELECT = 'select';
const TEXTAREA = 'textarea';
const IMAGES = 'img';
const DIV = 'div';
const PARAGRAPH = 'p'


var getBaseUrl = ($, url) => {
    var base_url = url;
    var base = $('base');
    if (base) {
        var basehref = base.attr('href');
        if (basehref) {
            if (validUrl.isWebUri(basehref))
                base_url = basehref;
        }
    }
    return base_url;
}

var getTags = async (source_url, html, selector) => {
    try {

        $ = cheerio.load(html);
        source_url = getBaseUrl($, source_url);

        var selected_tags = $(selector);
        var tags = await processTags(selected_tags, source_url);
        return tags;
    } catch (err) {
        throw err;
    }
}

/**
 * Returns an array of Tag objects
 * 
 * 
 * 
 * @param {array} tags 
 * @param {string} baseURI 
 */
var processTags = async (rawtags, baseURI) => {
    try {
        var valid_tags = [];
        for (var i = 0; i < rawtags.length; i++) {
            var rawtag = rawtags[i];
            var tag = new Tag(baseURI, rawtag);
            if (!containsTag(valid_tags, tag)) {
                valid_tags.push(tag);
            }
        }
        return valid_tags;
    } catch (err) {
        throw err;
    }
}


/**
 * Returns an array of FileTag objects
 *  * 
 * 
 * @param {array} tags 
 * @param {string} baseURI 
 * @param {array} fileTypes
 */
var processFileTags = async (rawtags, baseURI, fileTypes) => {
    try {

        var valid_tags = [];
        for (var i = 0; i < rawtags.length; i++) {
            var rawtag = rawtags[i];
            var tag = new FileTag(baseURI, rawtag, fileTypes);
            if (tag.validFileType) {
                if (!containsTag(valid_tags, tag)) {
                    valid_tags.push(tag);
                }
            }
        }
        return valid_tags;
    } catch (err) {
        throw err;
    }
}


/**
 * Returns true or false if the passed in array contains the value.
 * @param {array} list 
 * @param {string} value 
 */
var containsTag = function (list, value) {
    for (var i = 0; i < list.length; i++) {
        if (value.outerHTML === list[i].outerHTML) {
            return true;
        }
    }
    return false;
}

/**
 * Returns inner HTML text for each tag.
 * @param {array} tags 
 */
var getInnerText = (selector, $) => {
    var tags = $(selector);
    var text = '';
    for (var i = 0; i < tags.length; i++) {
        var tag = $(tags[i]);
        var html = $(tag).html();
        tag.replaceWith(html);
        text += " " + tag.html();
    }
    return text;
}

class HtmlAnalyzer {

    constructor() {

    }

    getTags(source_url, html, selector) {
        return (async () => {
            try {
                return await getTags(source_url, html, selector);
            } catch (err) {
                throw err;
            }

        })();
    }


    /********************************************************
     * 
     * Utility functions 
     * Get Sample text from HTML input.  Searches Divs, Spans, Paragraphs, and 
     * Anchors using Inner HTML and returns an HTML free sample of text.
     * 
     * Get Language - tries to infern the language a site is.
     * 
     * 
     * 
     */


    /**
     * Returns a text sample form the input HTML of a length equal to the length parameter
     * @param {string} html 
     * @param {numeric} length 
     */
    getTextSample(html, length) {
        try {
            if (!length) {
                length = 10000
            }
            const $ = cheerio.load(html);
            var textOnly = getInnerText(DIV, $);
            if (textOnly.length < length)
                textOnly += getInnerText(SPAN, $);
            if (textOnly.length < length)
                textOnly += getInnerText(PARAGRAPH, $);
            if (textOnly.length < length)
                textOnly += getInnerText(ANCHOR, $);

            textOnly = textOnly.replace(/<\/?[^>]+(>|$)/g, " ");
            textOnly = textOnly.replace(/(?:\r\n|\r|\n|\t)/g, " ");

            textOnly = unescape(textOnly);
            textOnly = textOnly.trim();
            textOnly = textOnly.substr(0, length);

            return textOnly;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    getLanguages(html) {
        return (async () => {
            try {
                var lang_out = [];
                var textSample = this.getTextSample(html);
                if (textSample && textSample !== "") {
                    var detected_languages = await franc.all(textSample);
                    //example output [['eng',1],['por',.821]]
                    for (var i = 0; i < detected_languages.length; i++) {
                        var lang = detected_languages[i];
                        if (lang_out.length > 2) {
                            break;
                        }
                        var lang_val = lang[0];
                        lang_out.push(lang_val);
                    }
                }
                if (lang_out.length === 0) {
                    lang_out.push('eng');
                }
                return lang_out;
            } catch (err) {
                throw err;
            }
        })();
    }





    /************************************************************
     * 
     * Get Specific Tag Types based on specific selector values
     * 
     */



    getSubmitAnchors(source_url, html) {
        return (async () => {
            try {
                var selector = ANCHOR + '[onclick]';
                return await getTags(source_url, html, selector);
            } catch (err) {
                throw err;
            }

        })();
    }

    getSearchInputs(source_url, html) {
        return (async () => {
            try {
                var selector = INPUT + '[type="submit"]';
                return await getTags(source_url, html, selector);
            } catch (err) {
                throw err;
            }

        })();
    }

    getTextInputs(source_url, html) {
        return (async () => {
            try {
                var selector = '[type="text"]';
                return await getTags(source_url, html, selector);
            } catch (err) {
                throw err;
            }

        })();
    }

    getTextImages(source_url, html) {
        return (async () => {
            try {
                var selector = INPUT + '[type="image"]';
                return await getTags(source_url, html, selector);
            } catch (err) {
                throw err;
            }

        })();
    }

    getPasswordInputs(source_url, html) {
        return (async () => {
            try {
                var selector = INPUT + '[type="password"]';
                return await getTags(source_url, html, selector);
            } catch (err) {
                throw err;
            }
        })();
    }

    getSubmitInputs(source_url, html) {
        return (async () => {
            try {
                var selector = INPUT + '[type="submit"]';
                return await getTags(source_url, html, selector);
            } catch (err) {
                throw err;
            }

        })();
    }

    getSubmitButtons(source_url, html) {
        return (async () => {
            try {
                var selector = BUTTON + '[type="submit"]';
                return await getTags(source_url, html, selector);
            } catch (err) {
                throw err;
            }

        })();
    }

    getSubmitForms(source_url, html) {
        return (async () => {
            try {
                var selector = FORM + '[action]';
                return await getTags(source_url, html, selector);
            } catch (err) {
                throw err;
            }

        })();
    }



    /****************************************************************
     * 
     * Get all tags of a generic type:
     * Form
     * TextArea
     * Input
     * Button
     * Anchor
     * Span
     * Select
     * Image
     * 
     */

    getAllForms(source_url, html) {
        return (async () => {
            try {
                return await getTags(source_url, html, FORM);
            } catch (err) {
                throw err;
            }

        })();
    }

    getAllTextAreas(source_url, html) {
        return (async () => {
            try {
                return await getTags(source_url, html, TEXTAREA);
            } catch (err) {
                throw err;
            }

        })();
    }

    getAllInputs(source_url, html) {
        return (async () => {
            try {
                return await getTags(source_url, html, INPUT);
            } catch (err) {
                throw err;
            }

        })();
    }

    getAllButtons(source_url, html) {
        return (async () => {
            try {
                return await getTags(source_url, html, BUTTON);
            } catch (err) {
                throw err;
            }

        })();
    }

    getAllAnchors(source_url, html) {
        return (async () => {
            try {
                return await getTags(source_url, html, ANCHOR);
            } catch (err) {
                throw err;
            }

        })();
    }

    getAllSpans(source_url, html) {
        return (async () => {
            try {
                return await getTags(source_url, html, SPAN);
            } catch (err) {
                throw err;
            }

        })();
    }

    getAllSelects(source_url, html) {
        return (async () => {
            try {

                return await getTags(source_url, html, SELECT);
            } catch (err) {
                throw err;
            }

        })();
    }

    getAllImages(source_url, html) {
        return (async () => {
            try {
                return await getTags(source_url, html, IMAGES);
            } catch (err) {
                throw err;
            }

        })();
    }


    /**************************************************************
     * 
     * Get Very specific Tags related to page functionality. 
     * Ex:
     * Tags with file related endpoints
     * Tags related to page login
     * Navigation Tags
     * Search Related Tags
     * Tags used for selection
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */


    getAllFileTags(source_url, html, fileTypes) {
        return (async () => {
            try {

                const $ = cheerio.load(html);
                source_url = getBaseUrl($, source_url);

                var all_anchors = $(ANCHOR);

                var all_spans = $(SPAN);

                var results = await Promise.all([
                    processFileTags(all_anchors, source_url, fileTypes),
                    processFileTags(all_spans, source_url, fileTypes),
                ]);

                var anchors = results[0];
                var spans = results[1];

                var output = anchors.concat(spans);
                return output;

            } catch (err) {
                throw err;
            }

        })();
    }

    getLoginTags(source_url, html) {
        return (async () => {
            try {

                var results = await Promise.all([
                    this.getPasswordInputs(source_url, html),
                    this.getAllInputs(source_url, html),
                    this.getAllAnchors(source_url, html),
                    this.getAllButtons(source_url, html)

                ]);

                var output = {};
                output.username = [];
                output.login = [];
                output.password = results[0];

                var textInputs = results[1];
                var submits = results[1].concat(results[2]);
                submits = submits.concat(results[3]);

                for (var i = 0; i < textInputs.length; i++) {
                    var input = textInputs[i];
                    if (input.outerHTML.toLowerCase().indexOf('user') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('username') !== -1
                    ) {
                        output.username.push(input);
                    }
                }

                for (var i = 0; i < submits.length; i++) {
                    var input = submits[i];
                    if (input.outerHTML.toLowerCase().indexOf('sign-in') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('signin') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('sign in') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('log in') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('log-in') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('login') !== -1
                    ) {
                        output.login.push(input);
                    }
                }

                if (output.login.length === 0) {
                    for (var i = 0; i < submits.length; i++) {
                        var input = submits[i];
                        if (input.outerHTML.toLowerCase().indexOf('submit') !== -1) {
                            output.login.push(input);
                        }
                    }

                }


                return output;
            } catch (err) {
                console.error("Filter Login Tags ERROR", err);
                throw err;
            }
        })();
    }

    getNavigationTags(source_url, html) {
        return (async () => {
            try {
                var anchors = await this.getAllAnchors(source_url, html);

                var letter_anchors = [];    //A,B
                var pagination_nav = [];   //NEXT, PREV
                var productgroup_nav = [];   //bestsellers, etc...

                var letterRegex = new RegExp(/^[A-Z|0-9]$/i);

                anchors.forEach((anchor, i) => {
                    var testHTML = anchor.innerHTML;
                    if (letterRegex.test(testHTML)) {
                        anchor.pattern = anchor.innerHTML;
                        letter_anchors.push(anchor);
                    }
                    var nav = false;
                    if (testHTML.toLowerCase().indexOf('next') !== -1) {
                        anchor.pattern = 'next';
                        nav = true;
                    }
                    if (testHTML.toLowerCase().indexOf('prev') !== -1) {
                        anchor.pattern = 'prev';
                        nav = true;
                    }
                    if (nav)
                        pagination_nav.push(anchor);

                    var groupNav = false;
                    if (!groupNav && testHTML.toLowerCase().indexOf('bestseller') !== -1) {
                        anchor.pattern = 'bestseller';
                        groupNav = true;
                    }
                    if (!groupNav && testHTML.toLowerCase().indexOf('site') !== -1 &&
                        testHTML.toLowerCase().indexOf('map') !== -1) {
                        anchor.pattern = 'sitemap';
                        groupNav = true;
                    }
                    if (!groupNav && anchor.outerHTML.toLowerCase().indexOf('category') !== -1) {
                        anchor.pattern = 'category';
                        groupNav = true;
                    }
                    if (groupNav)
                        productgroup_nav.push(anchor);

                });


                var output = {
                    'letter_anchors': letter_anchors,
                    'pagination_nav': pagination_nav,
                    'group_nav': productgroup_nav
                };
                return output;
            } catch (err) {
                console.error("Filter Navigation Tags ERROR", err);
                throw err;
            }
        })()
    }

    getSearchTags(source_url, html) {
        return (async () => {
            try {

                var results = await Promise.all([
                    this.getAllInputs(source_url, html),
                    this.getAllAnchors(source_url, html),
                    this.getAllButtons(source_url, html),
                    this.getAllForms(source_url, html)
                ]);

                var searchSubmit = results[0].concat(results[1]);
                searchSubmit = searchSubmit.concat(results[2]);
                var inputs = results[0];
                //    var anchors = resuls[1];
                //   var buttons = results[2];
                var forms = results[3];
                var output = {}
                output.searchInput = [];
                output.searchSubmit = [];
                output.searchForms = [];

                for (var i = 0; i < inputs.length; i++) {
                    var input = inputs[i];
                    if (input.outerHTML.toLowerCase().indexOf('placeholder=') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('search') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('keyword') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('Marcador de posición=') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('buscar') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('palabra clave') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('products') !== -1 ||
                        input.id === 'q' ||
                        input.name === 'q' ||
                        input.id === 's' ||
                        input.name === 's' ||
                        input.outerHTML.toLowerCase().indexOf('data[') !== -1) {
                        output.searchInput.push(input);
                    }
                }


                for (var i = 0; i < searchSubmit.length; i++) {
                    var input = searchSubmit[i];
                    if ((input.outerHTML.toLowerCase().indexOf('search') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('find') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('go') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('query') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('quick') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('buscar') !== -1 ||
                        input.outerHTML.toLowerCase().indexOf('encontrar') !== -1) &&
                        input.type !== 'text') {
                        output.searchSubmit.push(input);
                    }
                }


                for (var i = 0; i < forms.length; i++) {
                    var form = forms[i];
                    if (form.outerHTML.toLowerCase().indexOf('search') !== -1 ||
                        form.outerHTML.toLowerCase().indexOf('find') !== -1 ||
                        form.outerHTML.toLowerCase().indexOf('quick') !== -1) {
                        output.searchForms.push(form);
                    }
                }
                return output;

            } catch (err) {
                console.error("Filter Search Tags ERROR", err);
                throw err;
            }
        }
        )()
    }


    /**
     * Function returning all relevent Tags from source HTML
     * @param {string} source_url 
     * @param {string} html 
     */
    getAllTags(source_url, html) {
        return (async () => {
            try {
                var results = await Promise.all([
                    this.getAllForms(source_url, html),
                    this.getAllInputs(source_url, html),
                    this.getAllButtons(source_url, html),
                    this.getAllAnchors(source_url, html),
                    this.getAllSpans(source_url, html),
                    this.getAllSelects(source_url, html),
                    this.getAllTextAreas(source_url, html),
                    this.getAllImages(source_url, html)
                ]);
                var output = {};
                output.forms = results[0];
                output.inputs = results[1];
                output.buttons = results[2];
                output.anchors = results[3];
                output.spans = results[4];
                output.selects = results[5];
                output.textareas = results[6];
                output.images = results[7];

                return output;
            } catch (err) {
                throw err;
            }

        })();
    }

}
module.exports = HtmlAnalyzer;