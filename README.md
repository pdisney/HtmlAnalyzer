# HtmlAnalyzer - HTML Analyzer and Tag Extractor
Module that performs HTML Tag Extraction for an HTML input.  

## Super simple to use

HtmlAnalyzer was desinged to extract tags from any HTML input.  It has many convenience methods as well as generic methods for use in any project requiring HTML tag analysis.

```js
const HtmlAnalyzer = require('HtmlAnalyzer');
const htmlAnalyzer = new HtmlAnalyzer();

var alltags = await htmlAnalyzer.getAllTags(url, html);

console.log(alltags);
```


## Table of contents

- [Convenience Methods](#convenience--methods)
- [Extra Utilities](#extra--utilities)


---


## Convenience Methods

There are 20 methods allowing access to common tags.  Below is an example of a convenience method that returns tags used for page navigation:

```js
    const HtmlAnalyzer = require('HtmlAnalyzer');
    const htmlAnalyzer = new HtmlAnalyzer();


    var login_tags = await htmlAnalyer.getLoginTags(url, html);

    console.log(login_tags.letter_anchors);
    console.log(login_tags.pagination_nav);
    console.log(login_tags.group_nav);
```

Review the HtmlAnalyzer.js file for a list of all the convenience methods.  
In addition, this module lets you look for a specific set of tags based on selector information.  See Below:

```js
    const HtmlAnalyzer = require('HtmlAnalyzer');
    const htmlAnalyzer = new HtmlAnalyzer();

    var tags = await htmlanalyzer.getTags(data.url, data.html, 'a[href="http://test.com/product-pills-reviews.html"]');

    console.log(tags);

```

[back to top](#table-of-contents)


---


## Extra Utilities

This module also provides two additional utilites.  The getSampleText method provides a way to return text from the HTML page with the html tag information removed.  This method limits the results to a predetermined character count.

See Below:
```js
    const HtmlAnalyzer = require('HtmlAnalyzer');
    const htmlAnalyzer = new HtmlAnalyzer();


    var sample_text = await htmlAnalyer.getTextSample(html, length);

    console.log(sample_text);

```

In addition, HtmlAnalyzer also provides a language inference method providing the ability to infer the language of an HTML input.  See Below:

```js
    const HtmlAnalyzer = require('HtmlAnalyzer');
    const htmlAnalyzer = new HtmlAnalyzer();


    var languages = await htmlAnalyer.getLanguages(html); 
    console.log(languages);
```


[back to top](#table-of-contents)


---



