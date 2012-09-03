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
JS.Driver.extend({

  driver : function() {
    return 'jQuery';
  },

  test : function() {
    return !!window.jQuery;
  },

  id : function(element) {
    var selector = typeof element == 'string' ? '#' + element : element;
    return this.element(selector);
  },

  element : function(element) {
    element = element.jsDriverExtended ? element.getElement() : element;
    return jQuery(element);
  },

  onReady : function(fn) {
    this.element(document).ready(fn);
  },

  typeOf : function(element) {
    return typeof element;
  },

  forEach : function(array, fn) {
    jQuery.each(array, fn);
  },

  getKeys : function(hash, fn) {
    var keys = [];
    for(var i in hash) keys.push(i);
    return keys;
  },

  getValues : function(hash) {
    var values = [];
    for(var i in hash) values.push(hash[i]);
    return values;
  },

  getAttr : function(element, attr) {
    return this.element(element).attr(attr);
  },

  setAttr : function(element, attr, value) {
    this.element(element).attr(attr, value);
  },

  getWidth : function(element) {
    return this.element(element).width();
  },

  getHeight : function(element) {
    return this.element(element).height();
  },

  fireEvent : function(element, event, args) {
    this.element(element).trigger('event', args);
  },

  onSubmit : function(form, fn) {
    this.element(form).submit(fn);
  },

  addEvent : function(element, event, fn) {
    var that = this;
    this.element(element).addEvent(event, function(e) {
      e = that.getEvent(e);
      fn(e);
    });
  },

  removeEvent : function(element, event, fn) {
    this.element(element).unbind(event, fn);
  },

  getEvent : function(event) {
    var e = window.event ? window.event : event;
    e.stop = function() {
      this.preventDefault();
      this.stopPropagation();
    }
    return e;
  },

  delegate : function(element, selector, event, fn) {
    this.element(element).on(selector, event, fn);
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
    this.element(element).toggleClass(klass);
  },

  getElements : function(selector) {
    return $$(selector);
  },

  getChildren : function(element, selector) {
    return this.element(element).children(selector);
  },

  getElementParent : function(element, selector) {
    return this.element(element).parent(selector);
  },

  getStyle : function(element, value) {
    return this.element(element).css(css);
  },

  setStyle : function(element, css, value) {
    this.element(element).css(css,value);
  },

  fadeIn : function(element, fn, duration) {
    this.element(element).fadeIn(duration || 500, fn);
  },

  fadeOut : function(element, fn, duration) {
    this.element(element).fadeOut(duration || 500, fn);
  },

  animate : function(element, properties, startFn, endFn) {
    var element = this.element(element);
    element.animate(properties, null, null, endFn);
    startFn();
  },

  request : function(url, data, method, properties, onSuccess, onFailure) {
    var options = properties || {};
    options.data = data;
    options.url = url;
    options.type = method;
    jQuery.ajax(options).success(onSuccess).fail(onFailure);
  },

  inject : function(element, par, position) {
    this.element(element).inject(par, position);
  },

  append : function(element, par, position) {
    this.element(element).append(par);
  },

  destroyElement : function(element) {
    this.element(element).remove();
  },

  createElement : function(tag, properties) {
    var element = jQuery(tag);
    for(var i in properties) {
      this.setAttr(element, i, properties[i]);
    }
    return element;
  },

  store : function(element, key, value) {
    this.element(element).data(key,value);
  },

  retrieve : function(element, key) {
    return this.element(element).data(key);
  },

  eliminate : function(element, key) {
    this.element(element).removeData(key);
  }

});
