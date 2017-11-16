"use strict";

var log = console.log;

function drop_handler(event) {
  log("drop");
  event.preventDefault();
  var dt = event.dataTransfer;
  if (dt.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < dt.items.length; i++) {
      if (dt.items[i].kind == "file") {
        var f = dt.items[i].getAsFile();
        log("... file[" + i + "].name = " + f.name + " size=" + f.size);
        calculateMd5(file);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < dt.files.length; i++) {
      console.log("... file[" + i + "].name = " + dt.files[i].name);
    }
  }
}

function dragend_handler(event) {
  log("dragend_handler");
  event.preventDefault();
}

function dragover_handler(event) {
  log("dragover_handler");
  event.preventDefault();
}

function calculateMd5(file) {
  var pos = 0;
  var buf = 4096;
}