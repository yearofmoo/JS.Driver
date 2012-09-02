JS.Driver.extend({

  $ : function(element) {
    if(element.jsDriverExtended) return element;

    element = this.element(element);
    var that = this;
    return {

      jsDriverExtended : true,

      getElement : function() {
        return element;
      },

      attr : function(attr, value) {
        if(attr && value != null) {
          that.setAttr(attr,value);
        }
        else {
          return that.getAttr(attr);
        }
      },

      fadeIn : function() {
        that.fadeIn(element, fn);
      },

      fadeOut : function() {
        that.fadeOut(element, fn);
      },

      nix : function(fn) {
        that.nix(element, fn);
      },

      reveal : function(fn) {
        that.reveal(element, fn);
      },

      dissolve : function(fn) {
        that.dissolve(element, fn);
      },

      show : function() {
        that.show(element);
      },

      hide : function() {
        that.hide(element);
      },

      destroy : function() {
        that.destroy(element);
      }
    };
  },

  getWindowWidth : function() {
    return this.getSize(window).x;
  },

  getWindowHeight : function() {
    return this.getSize(window).y;
  },

  getSize : function(element) {
    var x = this.getWidth(element);
    var y = this.getHeight(element);
    return {
      x : x,
      y : y
    };
  },

  toArray : function(data) {
    if(this.typeOf(data) != 'array') data = [data];
    return data;
  },

  on : function(element, selector, event, fn) {
    this.delegate(element, selector, event, fn);
  },

  getBody : function() {
    return this.element(document.body);
  },

  setHTML : function(element, html) {
    this.setAttr(element, 'html', html);
  },

  getHTML : function(element, html) {
    return this.getAttr(element, 'html');
  },

  reveal : function(element, fn) {
    this.fadeOut(element, null, 1);
    this.show(element);
    this.fadeIn(element, fn);
  },

  dissolve : function(element, fn) {
    var that = this;
    this.fadeOut(element, function() {
      that.hide();
      fn();
    });
  },

  nix : function(element, fn) {
    var that = this;
    this.dissolve(element, function() {
      that.destroyElement(element);
      fn();
    });
  },

  isHidden : function(element) {
    return this.getStyle(element, 'display') == 'none';
  },

  show : function(element) {
    return this.id(element).setStyle('display','block');
  },

  hide : function() {
    return this.id(element).setStyle('display','none');
  },

  isShowing : function(element) {
    return this.getStyle(element, 'display') == 'block';
  }

});
