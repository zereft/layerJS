var jsdom = require("jsdom").jsdom;
var document = global.document = jsdom("<html><head><style id='wl-obj-css'></style></head><body><div id='outer'><div id='7'></div></div></body></html>");
var window = global.window = document.defaultView;

var CobjView = require('../../src/framework/cobjview.js');
var CobjData = require('../../src/framework/cobjdata.js');

var $ = document.querySelector;

describe("CobjView", function() {
  it('can be created', function() {
    var cv = new CobjView();
    expect(cv).not.toBeUndefined();
    expect(cv.el.outerHTML).toBe('<div class="object-default object-undefined"></div>');
    expect(document.getElementById('wl-obj-css').innerHTML).toBe('');
  });
  it('can be initialized with an CobjData object', function() {
    var cd = new CobjData({
      "id": 5,
      "type": "text",
      "text": "Frame 1:1",
      "scaleX": 1,
      "scaleY": 1,
      "height": 2000,
      "zIndex": 500,
      "width": 626,
      "y": 100,
      "x": 100,
      "rotation": 0
    });
    expect(cd).not.toBeUndefined();
    var cv = new CobjView(cd);
    expect(cv).not.toBeUndefined();
    expect(cv.el.getAttribute('data-wl-id')).toBe("5");
    expect(cv.el.id).toBe("5");
    expect(cv.el.className).toBe('object-default object-text');
    expect(cv.el.outerHTML).toBe('<div data-wl-id="5" id="5" class="object-default object-text"></div>'); // remove this expect if we get trouble with attribute orders
  });
  it('can be initialized with an existing element, without re-rendering', function() {
    var cd = new CobjData({
      "id": 5,
      "type": "text",
      "text": "Frame 1:1",
      "scaleX": 1,
      "scaleY": 1,
      "height": 2000,
      "zIndex": 500,
      "width": 626,
      "y": 100,
      "x": 100,
      "rotation": 0
    });
    var element = document.getElementById('7')
    var cv = new CobjView(cd, {
      el: element
    });
    expect(cv.el).toBe(element);
    expect(cv.el.id).toBe('7'); // not changed
  });
  it('can be initialized with an existing element, forcing re-rendering', function() {
    var cd = new CobjData({
      "id": 5,
      "type": "text",
      "text": "Frame 1:1",
      "scaleX": 1,
      "scaleY": 1,
      "height": 2000,
      "zIndex": 500,
      "width": 626,
      "y": 100,
      "x": 100,
      "rotation": 0
    });
    var element = document.getElementById('7')
    var cv = new CobjView(cd, {
      el: element,
      forceRender: true
    });
    expect(cv.el).toBe(element);
    expect(cv.el.id).toBe('5'); // not changed
  });
  it('is styled in a separate stylesheet', function() {
    var cd = new CobjData({
      "id": 5,
      "type": "text",
      "text": "Frame 1:1",
      "scaleX": 1,
      "scaleY": 1,
      "height": 2000,
      "zIndex": 500,
      "width": 626,
      "style": "color: red",
      "y": 100,
      "x": 100,
      "rotation": 0
    });
    var cv = new CobjView(cd);
    expect(document.getElementById('wl-obj-css').innerHTML).toContain("#wl-obj-5{color: red}");

  })
})