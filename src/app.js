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
  alert('1234');
  if (dt.items) {
    let ul = document.createElement("ul");
    for (var i = 0; i < dt.items.length; i++) {
      if (dt.items[i].kind == "file") {
        let li = document.createElement("li");
        var f = dt.items[i].getAsFile();
        let md5=calculateMd5(f);
        let text = `File:${f.name} : md5=[${md5}]`;
        li.appendChild(document.createTextNode(text));
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
  let pos = 0;
  let buf = 4096;
  while (pos < file.size) {
    let fileReader = new FileReader();
    let size = Math.min(pos + buf, file.size);
    let blob = file.slice(pos, size);
    pos += size;
    fileReader.readAsBinaryString(blob);
  }
  return pos;
}
