class ImageResizer {
  #image = null;
  #size = 0;
  #reductionRate = 0.5;
  #originalImage = null;
  #initialSize = null;
  constructor(image, size = undefined) {
    if (!image)
      throw new Error(
        `${ImageResizer.name} requires a mandatory image and optional size arguments to begin`
      );
    this.#image =image // new Image(30, 40);
    this.canvas = document.createElement("canvas");

    this.#size = size;
    this.#initialSize = `${this.#image.width}×${this.#image.height}`;
    this.#computeSize();
    this.#image.addEventListener("load", () => {
      this.#computeImageData();
    });
    this.ctx = this.canvas.getContext("2d");
  }
  resize() {
    this.ctx.drawImage(
      this.#image,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    console.log(this.canvas.width, this.canvas.height);
    return this.canvas.toDataURL(this.canvas.width, this.canvas.height);
  }
  getOriginalImage() {
    let w, h;
   this.canvas.width = w = this.#image.width; // this.canvas.width +(this.canvas.width * this.#reductionRate)
    this.canvas.height = h = this.#image.height; // this.canvas.width +(this.canvas.height * this.#reductionRate)
    this.ctx.drawImage(
      this.#image,
      0,
      0,
      this.canvas.width,
      this.canvas.height, 0,0,w,h
    );
    console.log(this.canvas.width, this.canvas.height);
    return this.canvas.toDataURL(w, h);
  }
  #computeImageData() {
    let imageData;

    const fr = new FileReader();
    fr.addEventListener("load", (e) => {
      this.#image.src = fr.result;
    });
    fr.readAsDataURL(this.#image);
  }
  #computeSize() {
    let w, h;
    if (!this.#size) {
      w = this.#image.width * this.#reductionRate;
      h = this.#image.height * this.#reductionRate;
      this.#size = this.#initialSize;
    } else {
      switch (true) {
        case typeof this.#size == "string" && this.#size.includes("×"):
          [w, h] = this.#size.split("×");
          break;
        case Number.isInteger(this.#size):
          w = h = this.#size;
          break;
        default:
          throw new Error(
            "#size value must be in the form w×h <width*height> or size<Integer>"
          );
      }
    }
    this.canvas.width = w;
    this.canvas.height = h;
  }
  info() {
    let ow, oh, nw, nh, percentage;
    ow = oh = this.#size;
    nw = this.canvas.width;
    nh = this.canvas.height;
    percentage = this.#reductionRate;
    return `Image has been reduced from ${
      this.#initialSize
    } to ${nw}×${nh} by ${percentage}%`;
  }
}

export default ImageResizer;
