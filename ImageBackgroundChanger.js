class ImageBackgroundChanger {
  variants = [
    "transparent",
    "red",
    "green",
    "original",
    "white",
    "blue",
    "black",
  ];
  #filterRate = 230;
  file = null;
  constructor(file) {
    this.file = file;
  }
  async createVariations(variant) {
    const map = new Map();
    const file = new ImageFile(this.file, 200, 200);
    const res = await file.create(variant);
    map.set("green", res);
    return map;
  }
}

class ImageFile {
  #cv = null;
  #ctx = null;
  #blob = null;
  ready = false;
  constructor(img, w, h) {
    //  if (!img) throw new Error("Invalid image file to create new image");
    this.w = w;
    this.h = h;

    this.#cv = document.createElement("canvas");
    this.#ctx = this.#cv.getContext("2d");

    this.image = new Image();
    this.image.width = this.w;
    this.image.height = this.h;

    const fr = new FileReader();
    fr.onload = () => {
      this.image.src = fr.result;
    };
    fr.readAsDataURL(img);
  }
  create(variant) {
    return new Promise((res, rej) => {
      this.image.onload = () => {
        this.#cv.width = this.w;
        this.#cv.height = this.h;
        this.#ctx.drawImage(this.image, 0, 0, this.w, this.h);
        switch (variant.toLowerCase()) {
          case "original":
            break;
          case "transparent":
            data[i + 3] = 0;
            break;
          case "green":
            const image = this.#ctx.getImageData(0, 0, this.w, this.h);
            const gap = 20;
            const chunks = [];
            let _a =0
            let _b =0
            for (let a = 0; a < this.#cv.width; a += gap) {
              _a+=a
              for (let b = a; b < this.#cv.height; a += gap) {
              _b+=b
console.log([[_a,_b],[a,b]].toString())
             
      /*          const g = this.#ctx.getImageData(_a,_b,a,b)
                const im = document.createElement("canvas").getContext("2d");
                im.drawImage()
chunks.push(im.canvas.toDataURL())*/

              }
            }
            console.log(g);
            /*
            for (let i = 0; i < image.data.length; i += 4) {
              const data = image.data
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const alpha = data[i + 3];
              
              const av = (r + b + g) / 3;
            // if(av>230){
            data[i] = av;
            data[i + 1] = av;
            data[i + 2] = av;
          //  data[i + 3] = av;
            
          //  }
            }
            */
            //  this.#ctx.putImageData(image, 0, 0);
            break;
          case "blue":
            //
            break;
          case "white":
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
            break;
          case "black":
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
            break;
          case "red":
            data[i] = 255;
            data[i + 1] = 0;
            data[i + 2] = 0;
            break;

          default:
            break;
        }

        res(this.#ctx.canvas);
      };
    });
  }
}

export default ImageBackgroundChanger;
