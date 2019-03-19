var validUrl = require('valid-url');
var URL = require('url');
const cheerio = require('cheerio');


var endsWith = (str, suffix) => {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


var getSelector = (link) => {
    var selectorval = link.tag_type;
    if (link.id.length > 0) {
        selectorval += '[id="' + link.id + '"]';
    }
    if (link.type.length > 0) {
        selectorval += '[type="' + link.type + '"]';
    }
    if (link.name.length > 0) {
        selectorval += '[name="' + link.name + '"]';
    }
    if (link.value.length > 0) {
        selectorval += '[value="' + link.value + '"]';
    }
    if (link.length > 0) {
        selectorval += '[title="' + link.title + '"]';
    }
    if (link.orig_href.length > 0) {
        selectorval += '[href="' + link.orig_href + '"]';
    } else {
        if (link.href.length > 0) {
            selectorval += '[href="' + link.href + '"]';
        }
    }
    if (link.class.length > 0) {
        link.class = link.class.replace(/ /g, '.');
        selectorval += '.' + link.class;
    }

    return selectorval;
}

var getFullURI = (href, baseURI) => {
    try {
        var combinedUrl = URL.resolve(baseURI, href);
        if (validUrl.isWebUri(combinedUrl)) {
             return URL.parse(combinedUrl);
        } else {
            return URL.parse(href);
        }
    } catch (err) {
        throw err;
    }
}




class Tag {
    constructor(baseurl, tag) {

        this.validHref = false;
        this.id = "";
        this.type = "";
        this.name = '';
        this.value = "";
        this.class = '';
        this.tag_type = '';
        this.title = '';
        this.baseURI = '';
        this.href = '';
        this.orig_href = '';
        this.outerHTML = '';
        this.innerHTML = '';
        this.uri = '';
        this.selector = '';
        this.pattern = '';

        if (baseurl && tag) {
            this.tag_type = tag.name;
          
            this.baseURI = baseurl;
            const $ = cheerio.load(tag);
            this.outerHTML = '"' + $(tag) + '"';
            this.innerHTML = $(tag).html();
            var tagAttributes = $(tag).attr();

            if (tagAttributes.id)
                this.id = tagAttributes.id;
            if (tagAttributes.type)
                this.type = tagAttributes.type;
            if (tagAttributes.title)
                this.title = tagAttributes.title;
            if (tagAttributes.value)
                this.value = tagAttributes.value;
            if (tagAttributes.name)
                this.name = tagAttributes.name;
            if (tagAttributes.class)
                this.class = tagAttributes.class;
            if (tagAttributes.href) {
                this.orig_href = tagAttributes.href;
            }
            if (tagAttributes.src) {
                this.orig_href = tagAttributes.src;
            }
            this.uri = getFullURI(this.orig_href, baseurl);
            this.href = this.uri.href;
            this.validHref = this.isValidHref();
            this.selector = getSelector(this);


        }
    }


    isValidHref(){
        return validUrl.isWebUri(this.href)!==undefined;
    }


}


module.exports = Tag;