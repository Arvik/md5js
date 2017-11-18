import * as ui from "./ui";
import * as md5 from "./md5";

const log = console.log;

ui.onWindowLoad(function() {
  window.md5check.ondragover = preventDefault;
  window.md5check.ondragend = preventDefault;
  window.md5check.ondrop = dropHandler;
});

function dropHandler(event) {
  log("drop");
  event.preventDefault();
  var dt = event.dataTransfer;
  if (dt.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < dt.items.length; i++) {
      if (dt.items[i].kind == "file") {
        var f = dt.items[i].getAsFile();
        alert(calculateMd5(f));
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < dt.files.length; i++) {
      console.log("... file[" + i + "].name = " + dt.files[i].name);
    }
  }
}

function preventDefault(event) {
  event.preventDefault();
}

function calculateMd5(file) {
  let pos = 0;
  let buf = 4096;
  while (pos < file.size) {
    let fileReader = new FileReader();
    let size = Math.min(pos+buf,file.size);
    let blob = file.slice(pos,size);
    pos+=size;
    fileReader.readAsBinaryString(blob);
  }
  return pos;
}
