class Background {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.h = this.canvas.height;
    this.w = this.canvas.width;
    this.chunks = [];
    this.image = new Image();
  }
  explorer() {
    return new Promise((res, rej) => {
      const b = document.createElement("input");
      b.type = "file";
      b.click();
      const self = this;
      b.addEventListener("change", function () {
        if (this.files.lenth < 1)
          return rej(new Error("Please select an image"));
        res(this.files[0]);
        self.file = this.files[0];
      });
    });
  }

  writeImage(file) {
    let fr = new FileReader();
    fr.onload = () => {
      this.image.src = fr.result;
    };
    fr.readAsDataURL(file);

    this.image.onload = async () => {
      this.ctx.clearRect(0, 0, this.w, this.h);

      this.ctx.drawImage(this.image, 0, 0, this.w, this.h);
      await this.getSlices();
    };
  }
  getSlices() {
    return new Promise(async (res, rej) => {
      const slices = [];
      const size = 100;
      const gap = 50;
      const w = this.w; ///size;
      const h = this.h; ///size;
      /*for (let i = 0; i < w; i += gap) {
        for (let j = 0; j < h; j += gap) {
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          canvas.style.flex = "45% 0 0";
          const context = canvas.getContext("2d");
          context.drawImage(
            this.canvas,
            i,
            j,
            size,
            size,
            0,
            0,
            canvas.width,
            canvas.height
          );*/
      const data = await this.alterData(
        this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
      );
      this.ctx.putImageData(data, 0, 0);
      //this.ctx.drawImage(canvas,i,j,size,size)
      //document.getElementById('chunks').appendChild(canvas)

      // slices.push(canvas);
      /*  }
      }*/
      res(slices);
    });
  }
  alterData(imageData) {
    return new Promise((res) => {
      let edgeColor = 0;
      let count = 0,
        re = 0,
        ge = 0,
        be = 0;
      for (let i = 0; i < imageData.data.length; i += 4) {
        const data = imageData.data;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const total = (r + g + b) / 3;
        if (count <= 1) {
          re += r;
          be += b;
          ge += g;
          
          
         // edgeColor = (re + ge + be) / 3;
        }
        count ++;
       // if (data[i + 3] < 200) continue;
        
        const off = 44;
        if (total <= 110){
    //    || (g > ge - off && g < ge + off)||
       // (b > be - off && b < be + off)){
          data[i + 3] = 0;
        }
      }
      res(imageData);
    });
  }
}

export default Background;
