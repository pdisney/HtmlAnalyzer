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
      var data = await readFile(__dirname+'/files/tag_extractor_test.json');
      try{
        var result = await htmlanalyzer.getAllTags(data.url, data.html);

        expect(result.textareas.length).to.be.eql(1);
        expect(result.inputs.length).to.be.eql(8);
        expect(result.buttons.length).to.be.eql(1);
        expect(result.anchors.length).to.be.eql(11);
        expect(result.spans.length).to.be.eql(4);
        expect(result.selects.length).to.be.eql(2);
        expect(result.images.length).to.be.eql(1);
    
      }catch(err){
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
    var data = await readFile(__dirname+'/files/tag_extractor_test.json');
    try{
      var result = await htmlanalyzer.getTextSample(data.html,100);
      expect(result.length).to.be.eql(100);
    }catch(err){
      console.log(err);
    }
});

it('Test getLanguages', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getLanguages(data.html);
    expect(result.length).to.be.eql(3);
  }catch(err){
    console.log(err);
  }
});

it('Test getSubmitAnchors', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getSubmitAnchors(data.url, data.html);
 
    expect(result.length).to.be.eql(1);
  }catch(err){
    console.log(err);
  }
});

it('Test getSearchInputs', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getSearchInputs(data.url, data.html);
 
    expect(result.length).to.be.eql(2);
  }catch(err){
    console.log(err);
  }
});

it('Test getTextInputs', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getTextInputs(data.url, data.html);
 
    expect(result.length).to.be.eql(2);
  }catch(err){
    console.log(err);
  }
});

it('Test getTextImages', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getTextImages(data.url, data.html);
 
    expect(result.length).to.be.eql(1);
  }catch(err){
    console.log(err);
  }
});

it('Test getPasswordInputs', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getPasswordInputs(data.url, data.html);
    expect(result.length).to.be.eql(1);
  }catch(err){
    console.log(err);
  }
});

it('Test getSubmitInputs', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getSubmitInputs(data.url, data.html);
 
    expect(result.length).to.be.eql(2);
  }catch(err){
    console.log(err);
  }
});

it('Test getSubmitButtons', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getSubmitButtons(data.url, data.html);
   
    expect(result.length).to.be.eql(1);
  }catch(err){
    console.log(err);
  }
});

it('Test getSubmitForms', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getSubmitForms(data.url, data.html);
 
    expect(result.length).to.be.eql(3);
  }catch(err){
    console.log(err);
  }
});

it('Test getAllForms', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getAllForms(data.url, data.html);
 
    expect(result.length).to.be.eql(3);
  }catch(err){
    console.log(err);
  }
});

it('Test getAllTextAreas', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getAllTextAreas(data.url, data.html);
 
    expect(result.length).to.be.eql(1);
  }catch(err){
    console.log(err);
  }
});

it('Test getAllInputs', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getAllInputs(data.url, data.html);
 
    expect(result.length).to.be.eql(8);
  }catch(err){
    console.log(err);
  }
});

it('Test getAllButtons', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getAllButtons(data.url, data.html);
 
    expect(result.length).to.be.eql(1);
  }catch(err){
    console.log(err);
  }
});

it('Test getAllAnchors', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getAllAnchors(data.url, data.html);
 
    expect(result.length).to.be.eql(11);
  }catch(err){
    console.log(err);
  }
});

it('Test getAllSpans', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getAllSpans(data.url, data.html);
 
    expect(result.length).to.be.eql(4);
  }catch(err){
    console.log(err);
  }
});

it('Test getAllSelects', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getAllSelects(data.url, data.html);
 
    expect(result.length).to.be.eql(2);
  }catch(err){
    console.log(err);
  }
});

it('Test getAllImages', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getAllImages(data.url, data.html);
 
    expect(result.length).to.be.eql(1);
  }catch(err){
    console.log(err);
  }
});

it('Test getLoginTags', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getLoginTags(data.url, data.html);
    expect(result.login.length).to.be.eql(1);
    expect(result.username.length).to.be.eql(1);
    expect(result.password.length).to.be.eql(1);
  }catch(err){
    console.log(err);
  }
});

it('Test getNavigationTags', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getNavigationTags(data.url, data.html);
   
    expect(result.letter_anchors.length).to.be.eql(1);
    expect(result.pagination_nav.length).to.be.eql(2);
    expect(result.group_nav.length).to.be.eql(1);
  }catch(err){
    console.log(err);
  }
});

it('Test getSearchTags', async function () {
  var data = await readFile(__dirname+'/files/tag_extractor_test.json');
  try{
    var result = await htmlanalyzer.getSearchTags(data.url, data.html);
   
    expect(result.searchInput.length).to.be.eql(2);
    expect(result.searchSubmit.length).to.be.eql(1);
    expect(result.searchForms.length).to.be.eql(2);
  }catch(err){
    console.log(err);
  }
});


});
