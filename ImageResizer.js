class ImageFile {
  constructor(ctx, w, h, blur = 4.05) {
    if (blur && (blur > 10 || blur < 0.1))
      throw new Error("Blur value cannot be less than 0.1 or greater than 10");
    this.x = 0;
    this.y = 0;
    this.w = w || ctx.canvas.width || 900;
    this.h = h || ctx.canvas.height || 900;
    const px = (100 / blur) * 0.01;
    this.ratio = Math.floor((this.h / 100 + this.w / 100) * px);
    this.ctx = ctx;
    this.canvas = this.ctx.canvas;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.image = new Image();
    this.file = {};
    document.querySelector('.variants').querySelectorAll('canvas').forEach(v=>(v.addEventListener('click',e=>(!e.target.dataset?.id &&  alert('Please upload a photo first!')))))
  }
  async welcome() {
    const image = document.getElementById("welcome");
    this.ctx.drawImage(image, 0, 0, this.w, this.h);
    this.createWaterMark(this.ctx.canvas);
  }

  draw(image) {
    return new Promise(
      (res, rej) => {
        const fr = new FileReader();
        fr.onload = () => {
          this.image.src = fr.result;
        };
        this.file = image;
        fr.readAsDataURL(image);

        this.image.onload = () => {
          this.ctx.drawImage(this.image, 0, 0, this.w, this.h);
          this.createWaterMark(this.ctx.canvas);
          res(this.image);
        };
      },
      () => rej(new Error("Error creating Image"))
    );
  }
  getVariations({ len = 12, size = this.ratio } = {}) {
    return new Promise(
      (res, rej) => {
        if (len > 12)
          rej(
            new Error(
              "number of Variantions to be created cannot be more than 12 "
            )
          );
        const variations = new Array(len).fill(null);
        const arr = [];
        variations.forEach(async (variation, i) => {
          const cv = document.createElement("canvas");
          const self = this;
          cv.addEventListener(
            "click",
            async function () {
              document
                .querySelectorAll("canvas")
                .forEach((cv) => cv.classList.remove("active"));
              this.classList.toggle("active");
              this.dataset.id = i;
              await self.applyVariation(this);
            },
            false
          );
          cv.width = cv.height = size;
          const ctx = cv.getContext("2d");
          ctx.drawImage(this.image, 0, 0, size, size);
          arr.push(await this.createVariations(cv, i));
        });
        res(arr);
      },
      () => rej(new Error("Error creating variations"))
    );
  }
  createVariations(canvas, variation) {
    return new Promise(
      (res, rej) => {
        const ctx = canvas.getContext("2d");
        const imageData = ctx.getImageData(0, 0, canvas.height, canvas.width);
        let av;
        for (let i = 0; i < imageData.data.length; i += 4) {
          const data = imageData.data;
          switch (variation) {
            case 0: //"greyscale":
              av = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] = av;
              data[i + 1] = av;
              data[i + 2] = av;
              break;

            case 1: // "sepia":
              av = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] = av;
              data[i + 1] = av;
              data[i + 2] = av + 200;
              break;
            case 2: // "sepia":
              av = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] = av;
              data[i + 1] = av + 200;
              data[i + 2] = av;
              break;

            case 3: // "sepia":
              av = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] = av + 200;
              data[i + 1] = av;
              data[i + 2] = av;
              break;
            case 4: // "sepia":
              av = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] = av - 200;
              data[i + 1] = av;
              data[i + 2] = av;
              break;
            case 5: // "sepia":
              av = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] = av;
              data[i + 1] = av - 200;
              data[i + 2] = av;
              break;
            case 6: // "sepia":
              av = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] = av;
              data[i + 1] = av;
              data[i + 2] = av - 200;
              break;
            case 7: // "sepia":
              av = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] = av * 2;
              data[i + 1] = av;
              data[i + 2] = av;
              break;
            case 8: // "sepia":
              av = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] = av;
              data[i + 1] = av * 2;
              data[i + 2] = av;
              break;
            case 9: // "sepia":
              av = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] = av;
              data[i + 1] = av;
              data[i + 2] = av * 2;
              break;
            case 10: // "sepia":
              av = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] = av;
              data[i + 1] = av;
              data[i + 2] = av / 2;
              break;
            default:
              break;
          }
        }

        ctx.putImageData(imageData, 0, 0);
        //  this.map.set('key_'+[variation],imageData)

        res(ctx.canvas);
      },
      () => rej(new Error("Could not create variable"))
    );
  }
  applyVariation(variant) {
    return new Promise(async (res, rej) => {
      const img = new Image();
      img.src = this.image.src;
      img.width = this.w;
      img.height = this.h;
      this.ctx.clearRect(0, 0, this.w, this.h);

      this.ctx.drawImage(
        this.image,
        0,
        0,
        this.w, //.ctx.canvas.width,
        this.h //ctx.canvas.height
      );

      const cv = await this.createVariations(
        this.canvas,
        Number.parseInt(variant.dataset.id)
      );
      this.createWaterMark(cv);
      this.ctx.drawImage(cv, 0, 0);

      // document.getElementById('cv').getContext('2d').drawImage(cv,0,0,100,100)
    });
  }
  createWaterMark(canvas) {
    //  const canvas = cv
    // || document.getElementById("cv");
    const mw = 100;
    const ctx = canvas.getContext("2d");
    const text = (new URL(window.location.href)).hostname || "Filterize";

    const x = canvas.width - 250;
    const y = canvas.height - canvas.height / 100 - 10;

    ctx.font = "20px monospace";
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.lineWidth = 5;
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
    //  document.body.appendChild(canvas)
    //this.ctx.drawImage(canvas,0,0,100,50)
  }
}
export default ImageFile

/**
window.addEventListener(
  "load",
  () => {
    const canvas = document.getElementById("cv");
    canvas.width = 900;
    canvas.height = 900;
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

*/