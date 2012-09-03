(function() {

  if(!window.JS) {
    var JS = window.JS = {};
  }

  JS.Driver = {
    extend : function(hash) {
      if(hash.test && hash.test() == true) {
        for(var i in hash) {
          JS.Driver[i] = hash[i];
        }
      }
    }
  };

})();
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

      on : function(target, event, fn) {
        that.on(target, event, fn);
      },

      addEvent : function(event, fn) {
        that.addEvent(element, event, fn);
      },

      removeEvent : function(event, fn) {
        that.removeEvent(element, event, fn);
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
JSDriver.extend({

  JSON : {

    encode : function(data) {
      return JSON.encode(data);
    },

    decode : function(data) {
      return JSON.decode(data);
    }

  },

  driver : function() {
    return 'MooTools';
  },

  test : function() {
    return window.MooTools && window.MooTools.version;
  },

  id : function(element) {
    var selector = typeof element == 'string' ? '#' + element : element;
    return document.id(selector);
  },

  element : function(element) {
    element = element.jsDriverExtended ? element.getElement() : element;
    return document.id(element);
  },

  typeOf : function(element) {
    return typeOf(element);
  },

  forEach : function(array, fn) {
    if(this.typeOf(array) == 'array') {
      array.each(fn);
    }
    else {
      Object.each(array, fn);
    }
  },

  getKeys : function(array, fn) {
    return Object.keys(array);
  },

  getValues : function(array) {
    return Object.values(array);
  },

  getAttr : function(element, attr) {
    return this.element(element).get(attr);
  },

  setAttr : function(element, attr, value) {
    this.element(element).set(attr, value);
  },

  fireEvent : function(element, event, args) {
    this.element(element).fireEvent('event', args);
  },

  addEvent : function(element, event, fn) {
    var that = this;
    this.element(element).addEvent(event, function(e) {
      e = that.getEvent(e);
      fn(e);
    });
  },

  onSubmit : function(form, fn) {
    this.addEvent('submit', fn);
  },

  delegate : function(element, selector, event, fn) {
    this.element(element).addEvent(event + ':relay('+selector+')', fn);
  },

  getWidth : function(element) {
    return this.element(element).getSize().x;
  },

  getHeight : function(element) {
    return this.element(element).getSize().y;
  },

  removeEvent : function(element, event, fn) {
    this.element(element).removeEvent(event, fn);
  },

  getEvent : function(event) {
    return event;
  },

  addClass : function() {
    this.element(element).addClass(klass);
  },

  removeClass : function(element, klass) {
    this.element(element).removeClass(klass);
  },

  hasClass : function(element, klass) {
    return this.element(element).hasClass(klass);
  },

  toggleClass : function(element, klass) {
    this.hasClass(element, klass) ? this.removeClass(element, klass) : this.addClass(element, klass);
  },

  getElements : function(selector) {
    return $$(selector);
  },

  getElementParent : function(element, selector) {
    return this.element(element).getParent(selector);
  },

  getStyle : function(element, css) {
    return this.element(element).getStyle(css);
  },

  setStyle : function(element, css, value) {
    this.element(element).setStyle(css,value);
  },

  fadeIn : function(element, fn) {
    var morph = this.id(element).get('morph');
    morph.start({ opacity : 1 ).chain(fn);
  },

  fadeOut : function(element, fn) {
    var morph = this.id(element).get('morph');
    morph.start({ opacity : 0 ).chain(fn);
  },

  animate : function(element, properties, startFn, endFn) {
    var key = 'morph';
    var element = this.element(element);
    element.get(key).cancel();
    var morph = new Fx.Morph(element);
    element.set(key, morph);
    morph.addEvent('start', startFn);
    morph.addEvent('complete', endFn);
    morph.start(properties);
  },

  request : function(url, data, method, properties, onSuccess, onFailure) {
    var options = properties;
    options.url = url;
    options.data = data;
    moptions.method = method;
    var xhr = new Request(options);
    xhr.addEvent('success', onSuccess);
    xhr.addEvent('failure', onFailure);
    xhr.send();
  },

  destroyElement : function(element) {
    this.element(element).destroy();
  },

  createElement : function(tag, properties) {
    return new Element(tag, properties)
  },

  inject : function(element, par, position) {
    this.element(element).inject(par, position);
  },

  append : function(element, par, position) {
    this.inject(par, element, position);
  },

  store : function(element, key, value) {
    this.element(element).store(key,value);
  },

  retrieve : function(element, key) {
    return this.element(element).retrieve(key);
  },

  eliminate : function(element, key) {
    this.element(element).eliminate(key);
  }

});
