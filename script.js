"use strict";
import ImageFile from './ImageResizer.js'

window.addEventListener(
  "load",
  () => {
    const canvas = document.getElementById("cv");
    canvas.width = document.getElementById('w').valueAsNumber || 900;
    canvas.height = document.getElementById('h').valueAsNumber || 900;
    const image = new ImageFile(canvas.getContext("2d"));
    image.welcome();

    const filePicker = document.querySelector("[type=file]");
    document
      .getElementById("picker")
      .addEventListener("click", () => filePicker.click());
    document.getElementById("download").addEventListener("change", function () {
      if (this.value == "never") return;
      const a = document.createElement("a");
      a.setAttribute(
        "href",
        canvas.toDataURL(this.value, this.value !== "image/png" ? 0.8 : 1000)
      );
      a.setAttribute(
        "download",
        image.file.name.indexOf(".") > 0
          ? image.file.name.split(".")[0]
          : image.file.name
      );
      a.setAttribute("target", "_blank");
      a.click();
    });

    filePicker.addEventListener("change", async function () {
      const file = await image.draw(this.files[0]);
      try {
        const variations = await image.getVariations();
        document.querySelector(".variants").innerHTML = "";
        variations.forEach((file) => {
          document.querySelector(".variants").appendChild(file);
        });
      } catch (e) {
        console.log(e);
      }
    });
  },
  false
);

/*
import Background from './Background.js'

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
*/