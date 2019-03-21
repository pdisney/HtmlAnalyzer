const expect = require('chai').expect;
const HtmlAnalyzer = require('../HtmlAnalyzer');
const fs = require('fs');

var readFile = (fullpath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fullpath, (err, data) => {
      if (err) {
        console.info(err);
        return reject(err);
      }

      return resolve(JSON.parse(data));
    });
  })
}



let connector;

describe('HtmlAnalyzer test', function () {
  this.timeout(720000);
  let htmlanalyzer;

  before(function () {
    htmlanalyzer = new HtmlAnalyzer();
  })

  it('Test getAllTags', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getAllTags(data.url, data.html);

      expect(result.forms.length).to.be.eql(1);
      expect(result.inputs.length).to.be.eql(1);
      expect(result.textareas.length).to.be.eql(1);
      expect(result.buttons.length).to.be.eql(1);
      expect(result.anchors.length).to.be.eql(11);
      expect(result.spans.length).to.be.eql(4);
      expect(result.selects.length).to.be.eql(2);

    } catch (err) {
      console.log(err);
    }


  });

  it('Test getAllTagsLimit', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getAllTags(data.url, data.html, 1);

      expect(result.textareas.length).to.be.eql(1);
      expect(result.buttons.length).to.be.eql(1);
      expect(result.anchors.length).to.be.eql(1);
      expect(result.spans.length).to.be.eql(1);
      expect(result.selects.length).to.be.eql(1);

    } catch (err) {
      console.log(err);
    }


  });

  it('Test getAllFileTags', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {

      var result = await htmlanalyzer.getAllFileTags(data.url, data.html);
      expect(result.length).to.be.eql(2);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getTags', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getTags(data.url, data.html, 'a[href="http://test.com/product-pills-reviews.html"]');
      expect(result.length).to.be.eql(1);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getTextSample', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getTextSample(data.html, 100);
      expect(result.length).to.be.eql(100);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getLanguages', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getLanguages(data.html);
      expect(result.length).to.be.eql(3);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getSubmitAnchors', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getSubmitAnchors(data.url, data.html);

      expect(result.length).to.be.eql(1);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getSearchInputs', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getSearchInputs(data.url, data.html);

      expect(result.length).to.be.eql(2);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getTextInputs', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getTextInputs(data.url, data.html);

      expect(result.length).to.be.eql(2);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getTextImages', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getTextImages(data.url, data.html);

      expect(result.length).to.be.eql(1);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getPasswordInputs', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getPasswordInputs(data.url, data.html);
      expect(result.length).to.be.eql(1);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getSubmitInputs', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getSubmitInputs(data.url, data.html);

      expect(result.length).to.be.eql(2);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getSubmitButtons', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getSubmitButtons(data.url, data.html);

      expect(result.length).to.be.eql(1);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getSubmitForms', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getSubmitForms(data.url, data.html);

      expect(result.length).to.be.eql(3);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getAllForms', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getAllForms(data.url, data.html);

      expect(result.length).to.be.eql(3);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getAllTextAreas', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getAllTextAreas(data.url, data.html);

      expect(result.length).to.be.eql(1);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getAllInputs', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getAllInputs(data.url, data.html);

      expect(result.length).to.be.eql(8);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getAllButtons', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getAllButtons(data.url, data.html);

      expect(result.length).to.be.eql(1);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getAllAnchors', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getAllAnchors(data.url, data.html);

      expect(result.length).to.be.eql(11);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getAllSpans', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getAllSpans(data.url, data.html);

      expect(result.length).to.be.eql(4);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getAllSelects', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getAllSelects(data.url, data.html);

      expect(result.length).to.be.eql(2);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getAllImages', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getAllImages(data.url, data.html);

      expect(result.length).to.be.eql(1);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getLoginTags', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getLoginTags(data.url, data.html);
      expect(result.login.length).to.be.eql(1);
      expect(result.username.length).to.be.eql(1);
      expect(result.password.length).to.be.eql(1);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getNavigationTags', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getNavigationTags(data.url, data.html);

      expect(result.letter_anchors.length).to.be.eql(1);
      expect(result.pagination_nav.length).to.be.eql(2);
      expect(result.group_nav.length).to.be.eql(1);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getSearchTags', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getSearchTags(data.url, data.html);

      expect(result.searchInput.length).to.be.eql(2);
      expect(result.searchSubmit.length).to.be.eql(1);
      expect(result.searchForms.length).to.be.eql(2);
    } catch (err) {
      console.log(err);
    }
  });

  it('Test getSearchInputAndSubmitTags', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getSearchTags(data.url, data.html);
      result = htmlanalyzer.getSearchInputAndSubmitTags(result);

      expect(result.contains_input).to.be.eql(true);
      expect(result.contains_submit).to.be.eql(true);
      expect(result.text_input.id).to.be.eql('twotabsearchtextbox');
      expect(result.submit_input.name).to.be.eql('site-search');

    } catch (err) {
      console.log(err);
    }
  });

  var testSelector = (tags)=>{
    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i];
      var selector = tag.tag_type;
      if (tag.id.length > 0) {
        selector += '[id="' + tag.id + '"]'
      }
      if (tag.type.length > 0) {
        selector += '[type="' + tag.type + '"]';
      }
      if (tag.name.length > 0) {
        selector += '[name="' + tag.name + '"]';
      }
      if (tag.value.length > 0) {
        selector += '[value="' + tag.value + '"]';
      }
      if (tag.title.length > 0) {
        selector += '[title="' + tag.title + '"]';
      }
      if (tag.tag_type === 'a') {
        if (tag.orig_href.length > 0) {
          selector += '[href="' + tag.orig_href + '"]';
        }
      }
      if (tag.orig_src.length > 0) {
           selector += '[src="' + tag.orig_src + '"]';
      }
      if (tag.class.length > 0) {
        tag.class = tag.class.replace(/ /g, '.');
        selector += '.' + tag.class;
      }

      expect(tag.selector).to.be.eql(selector);

    }
  }

  it('Test Selectors', async function () {
    var data = await readFile(__dirname + '/files/tag_extractor_test.json');
    try {
      var result = await htmlanalyzer.getAllTags(data.url, data.html);
      result.images = await htmlanalyzer.getAllImages(data.url, data.html);
    

      testSelector(result.forms);
      testSelector(result.inputs);
      testSelector(result.textareas);
      testSelector(result.buttons);
      testSelector(result.anchors);
      testSelector(result.spans);
      testSelector(result.selects);
      testSelector(result.images);
      
    } catch (err) {
      console.log(err);
    }
  });


});
