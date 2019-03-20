var validUrl = require('valid-url');
var URL = require('url');
const cheerio = require('cheerio');


var endsWith = (str, suffix) => {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


var getSelector = (tag) => {
    var selectorval = tag.tag_type;
    if (tag.id.length > 0) {
        selectorval += '[id="' + tag.id + '"]';
    }
    if (tag.type.length > 0) {
        selectorval += '[type="' + tag.type + '"]';
    }
    if (tag.name.length > 0) {
        selectorval += '[name="' + tag.name + '"]';
    }
    if (tag.value.length > 0) {
        selectorval += '[value="' + tag.value + '"]';
    }
    if (tag.title.length > 0) {
        selectorval += '[title="' + tag.title + '"]';
    }
    if (tag.tag_type === 'a') {
        if (tag.orig_href.length > 0) {
            selectorval += '[href="' + tag.orig_href + '"]';
        } else {
            if (tag.href.length > 0) {
                selectorval += '[href="' + tag.href + '"]';
            }
        }
    }
    if(tag.src.length>0){
        selectorval += '[src="' + tag.src + '"]';
    }
    if (tag.class.length > 0) {
        tag.class = tag.class.replace(/ /g, '.');
        selectorval += '.' + tag.class;
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
        this.src = '';
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
                this.href = this.orig_href;
            }
            if (tagAttributes.src) {
                this.src = tagAttributes.src;
            }
            this.selector = getSelector(this);
            this.uri = getFullURI(this.orig_href, baseurl);
            this.href = this.uri.href;
            if(this.src.length>0){
                var src = getFullURI(this.src, baseurl);
                this.src = src.href;
            }
            this.validHref = this.isValidHref();
            


        }
    }


    isValidHref() {
        return validUrl.isWebUri(this.href) !== undefined;
    }


}


module.exports = Tag;