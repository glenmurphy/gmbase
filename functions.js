// Third Party & Utilities
Function.prototype.bind = function(thisObj, var_args) {
  if (typeof(this) != "function") {
    throw new Error("Bind must be called as a method of a function object.");
  }

  var self = this;
  var staticArgs = Array.prototype.splice.call(arguments, 1, arguments.length);

  return function() {
    // make a copy of staticArgs (don't modify it because it gets reused for
    // every invocation).
    var args = staticArgs.concat();

    // add all the new arguments
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    // invoke the original function with the correct thisObj and the combined
    // list of static and dynamic arguments.
    return self.apply(thisObj, args);
  };
};

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

Array.prototype.contains = function(val) {
  return (this.indexOf(val) != -1);
};

function isEmpty(obj) {
  for (var i in obj) {
    return false;
  }
  return true;
}

function compare(a, b) {
  return (a > b ? -1 : (a < b ? 1 : 0));
}

function createElement(type, className, parent) {
  var node = document.createElement(type);
  if (className)
    node.className = className;
  if (parent)
    parent.appendChild(node);
  return node;
}

function getPosition(node) {
  var x = 0, y = 0;
  
  while(node) {
    x += parseInt(node.offsetLeft);
    y += parseInt(node.offsetTop);
    node = node.offsetParent;
  }
  
  return {
    x : x,
    y : y
  }
}

function collapseMap(map) {
  var list = [];
  for (var id in map) {
    list.push(id);
  }
  return list;
}

function generateListFromMap(map) {
  var list = [];
  for (var id in map) {
    list.push(map[id]);
  }
  return list;
}

function generateMap(list) {
  var map = {};
  for (var i = 0, item; item = list[i]; i++) {
    map[item] = item;
  }
  return map;
}

function generateModelMap(list) {
  var map = {};
  for (var i = 0, item; item = list[i]; i++) {
    map[item.key] = item;
  }
  return map;
}

if (typeof exports != 'undefined') {
  exports.collapseMap = collapseMap;
  exports.generateListFromMap = generateListFromMap;
  exports.generateMap = generateMap;
  exports.generateModelMap = generateModelMap;
}