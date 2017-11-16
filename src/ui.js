"use strict";
export function onWindowLoad(fn) {
  if (!fn) return;
  if (window.attachEvent) {
    window.attachEvent("onload", fn);
  } else {
    if (window.onload) {
      var curronload = window.onload;
      var newonload = function(evt) {
        curronload(evt);
        fn(evt);
      };
      window.onload = newonload;
    } else {
      window.onload = fn;
    }
  }
}
