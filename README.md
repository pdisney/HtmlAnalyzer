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
- [Full API](#api)
- [getTags](#gettags)
- [getSubmitAnchors](#getSubmitAnchors)
- [getSearchInputs](#getSearchInputs)
- [getTextInputs](#getTextInputs)
- [getTextImages](#getTextImages)
- [getPasswordInputs](#getPasswordInputs)
- [getSubmitInputs](#getSubmitInputs)
- [getSubmitButtons](#getSubmitButtons)
- [getSubmitForms](#getSubmitForms)
- [getAllForms](#getAllForms)
- [getAllTextAreas](#getAllTextAreas)
- [getAllInputs](#getAllInputs)
- [getAllButtons](#getAllButtons)
- [getAllAnchors](#getAllAnchors)
- [getAllSpans](#getAllSpans)
- [getAllSelects](#getAllSelects)
- [getAllImages](#getAllImages)
- [getAllFileTags](#getAllFileTags)
- [getLoginTags](#getLoginTags)
- [getNavigationTags](#getNavigationTags)
- [getSearchInputAndSubmitTags](#getSearchInputAndSubmitTags)
- [getSearchTags](#getSearchTags)
- [getAllTags](#getAllTags)

---
## Convenience Methods

There are 20 methods allowing access to common tags.  Below is an example of a convenience method that returns tags used for page navigation:

```js
    const HtmlAnalyzer = require('@pdisney1/htmlanalyzer/HtmlAnalyzer');
    const htmlAnalyzer = new HtmlAnalyzer();

    var navigation_tags = await htmlAnalyer.getNavigationTags(source_url, html);

    console.log(navigation_tags.letter_anchors);
    console.log(navigation_tags.pagination_nav);
    console.log(navigation_tags.group_nav);
```

Review the HtmlAnalyzer.js file for a list of all the convenience methods.  
In addition, this module lets you look for a specific set of tags based on selector information.  See Below:

```js
    const HtmlAnalyzer = require('@pdisney1/htmlanalyzer/HtmlAnalyzer');
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
    const HtmlAnalyzer = require('@pdisney1/htmlanalyzer/HtmlAnalyzer');
    const htmlAnalyzer = new HtmlAnalyzer();


    var sample_text = await htmlAnalyer.getTextSample(html, length);

    console.log(sample_text);

```

In addition, HtmlAnalyzer also provides a language inference method providing the ability to infer the language of an HTML input.  See Below:

```js
    const HtmlAnalyzer = require('@pdisney1/htmlanalyzer/HtmlAnalyzer');
    const htmlAnalyzer = new HtmlAnalyzer();


    var languages = await htmlAnalyer.getLanguages(html); 
    console.log(languages);
```


[back to top](#table-of-contents)


---

## Full API

Below is a list of all convenience methods for HTML analysis and class definitions.
---
## getTags
Allows the selection of any HTML tag within a body of HTML.  
    Inputs :
        URL - url for the html source.
        HTML - HTML source data.
        Selector - Tag selection string used to select a specific set of tags or a singular tag. example input[type="text"].classname
        Tag Limit - Limits the number of possible tags selected.

```js
    const htmlAnalyzer = new HtmlAnalyzer();

    var selector = "a[href='http://test.com/tester'][id='mainanchor']";
    var textLimit = 1000;

    var tags = await htmlAnalyer.getTags(url, html, selector, textLimit); 
    console.log(tags);
```
 
[back to top](#table-of-contents)

---


## getSubmitAnchors


[back to top](#table-of-contents)
---

## getSearchInputs

[back to top](#table-of-contents)

---

## getTextInputs


[back to top](#table-of-contents)
---
    
## getTextImages


[back to top](#table-of-contents)

---

## getPasswordInputs

[back to top](#table-of-contents)
---

## getSubmitInputs

[back to top](#table-of-contents)
---

## getSubmitButtons

[back to top](#table-of-contents)
---

## getSubmitForms

[back to top](#table-of-contents)
---

## getAllForms

[back to top](#table-of-contents)
---

## getAllTextAreas

[back to top](#table-of-contents)
---

## getAllInputs

[back to top](#table-of-contents)
---

## getAllButtons

[back to top](#table-of-contents)
---

## getAllAnchors

[back to top](#table-of-contents)
---

## getAllSpans

[back to top](#table-of-contents)
---

## getAllSelects

[back to top](#table-of-contents)
---

## getAllImages

[back to top](#table-of-contents)
---


## getAllFileTags

[back to top](#table-of-contents)
---

## getLoginTags
[back to top](#table-of-contents)
---

## getNavigationTags

[back to top](#table-of-contents)
---



## getSearchInputAndSubmitLinks

[back to top](#table-of-contents)
---

## getSearchTags

[back to top](#table-of-contents)
---


## getAllTags

[back to top](#table-of-contents)
---








