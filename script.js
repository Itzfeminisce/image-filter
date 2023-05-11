"use strict";
import Background from './Background.js'
/** @type (HTMLCanvasElement) */


window.addEventListener(
  "load",
  async ()=>{
  const canvas = document.getElementById("cv");
    canvas.width = 900;
    canvas.height = 900;
    
    const bg = new Background(canvas);

const filePicker = document.querySelector("[type=file]");
    document
      .getElementById("picker")
      .addEventListener("click", async () => {
    await bg.writeImage(await bg.explorer())
      })
      
      
    document.getElementById("download").addEventListener("change", function () {
      if (this.value == "never") return;
      const a = document.createElement("a");
      a.setAttribute(
        "href",
        canvas.toDataURL(this.value, this.value !== "image/png" ? 0.8 : 1000)
      );
      a.setAttribute(
        "download",
        bg.file.name.indexOf(".") > 0
          ? bg.file.name.split(".")[0]
          : bg.file.name
      );
      a.setAttribute("target", "_blank");
      a.click();
    });

    
  },
  false
);
