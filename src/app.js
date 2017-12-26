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
    let ul = document.createElement("ul");
    for (var i = 0; i < dt.items.length; i++) {
      if (dt.items[i].kind == "file") {
        let li = document.createElement("li");
        var f = dt.items[i].getAsFile();
        calculateMd5(f)
          .then(md5 => {
            let text = `File:${f.name} : md5=[${md5}]`;
            li.appendChild(document.createTextNode(text));
          })
          .catch(err => {
            let text = `File:${f.name} : IO error=[${err}]`;
            li.appendChild(document.createTextNode(text));
          });
        ul.appendChild(li);
      }
    }
    window.md5.appendChild(ul);
  }
}

function preventDefault(event) {
  event.preventDefault();
}

function calculateMd5(file) {
  return new Promise((ok, nok) => {
    let pos = 0;
    let buf = 4096;
    let prevReadChunk = null;
    let firstRead = null;
    while (pos < file.size) {
      let fileReader = new FileReader();
      let size = Math.min(pos + buf, file.size);
      let blob = file.slice(pos, size);
      // chaining file reads
      let readFileFn = () => {
        fileReader.readAsArrayBuffer(blob);
      };
      pos += size;
      if (prevReadChunk) {
        prevReadChunk.onload = e => {
          //update MD5 
          //TODO: implement MD5 calculation

          // continue reading the file
          readFileFn();
        };
      } else firstRead = readFileFn;
      prevReadChunk = fileReader;
      prevReadChunk.onerror = nok;
    }
    prevReadChunk.onload = ok("test");
    firstRead();
  });
}
