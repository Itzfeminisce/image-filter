const doc = (elem) => document.querySelector(elem);
const log = console.log.bind(console);
const activeFilter = doc('#activeFilter')
const filters = document.querySelectorAll('.filter')
const uploader = doc('#file')
let hasImage = false,
  image;
const canvas = doc('#canvas')
const WIDTH = canvas.width = window.innerWidth;
const HEIGHT = canvas.height = 200
const ctx = canvas.getContext('2d')
let filterRate = 10 * Math.sin(WIDTH);

filters.forEach(filter => {
  filter.addEventListener('click', function() {
    if (!hasImage) {
      activeFilter.textContent = "No file has been uploaded!";
      return;
    }

    activeFilter.textContent = this.dataset.filter;
    switch (this.dataset.filter) {
      case 'original':
        filterOriginal();
        break;
      case 'greyscale':
        filterGreyscale();
        break;
      case 'inverted':
        filterInverted();
        break;
      case 'serpia':
        filterSerpia()
        break;
      case 'manual':
        switch (this.dataset.filterType) {
          case 'minus':
            filterManual(filterRate--);
            break;
          case 'plus':
            filterManual(filterRate++);
            break;

        }
        break;
    }
  })
})



uploader.addEventListener('change', function(e) {
  let file = this.files[0]
  if (file) hasImage = true;
  image = new Image()
  const fileReader = new FileReader()
  fileReader.onload = function(ev) {
    image.src = ev.target.result;
  }
  fileReader.readAsDataURL(file)
  image.onload = function() {
    filterOriginal()
    activeFilter.textContent = 'original';
  }
})



function filterManual(dd) {
  ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
  const scannedImage = ctx.getImageData(0, 0, WIDTH, HEIGHT)
  const imageData = scannedImage.data;
  for (var i = 0; i < imageData.length; i += 4) {
    const totalPx = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3
    imageData[i] = totalPx * dd;
    imageData[i + 1] = totalPx * Math.floor(dd / 2)
    imageData[i + 2] = totalPx + (dd * 2)
  }
  scannedImage.data = imageData;
  ctx.putImageData(scannedImage, 0, 0)
  log('Greyscale Filter')
}



function filterOriginal() {
  ctx.drawImage(image, 0, 0, WIDTH, HEIGHT)
  log('Original Filter')
}




function filterGreyscale() {
  ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
  const scannedImage = ctx.getImageData(0, 0, WIDTH, HEIGHT)
  const imageData = scannedImage.data;
  for (var i = 0; i < imageData.length; i += 4) {
    const totalPx = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
    imageData[i] = totalPx;
    imageData[i + 1] = totalPx
    imageData[i + 2] = totalPx
  }
  scannedImage.data = imageData;
  ctx.putImageData(scannedImage, 0, 0)
  log('Greyscale Filter')
}



function filterInverted() {
  ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
  const scannedImage = ctx.getImageData(0, 0, WIDTH, HEIGHT)
  const imageData = scannedImage.data;
  for (var i = 0; i < imageData.length; i += 4) {
    const totalPx = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3
    imageData[i] = 255 - totalPx;
    imageData[i + 1] = 255 - totalPx
    imageData[i + 2] = 255 - totalPx
  }
  scannedImage.data = imageData;
  ctx.putImageData(scannedImage, 0, 0)
  log('Inverted Filter')
}




function filterSerpia() {
  ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
  const scannedImage = ctx.getImageData(0, 0, WIDTH, HEIGHT)
  const data = scannedImage.data;
  for (var i = 0; i < data.length; i += 4) {

    let red = data[i],
      green = data[i + 1],
      blue = data[i + 2];

    data[i] = Math.min(Math.round(0.393 * red + 0.769 * green + 0.189 * blue), 255);
    data[i + 1] = Math.min(Math.round(0.349 * red + 0.686 * green + 0.168 * blue), 255);
    data[i + 2] = Math.min(Math.round(0.272 * red + 0.534 * green + 0.131 * blue), 255);

  }
  scannedImage.data = data;
  ctx.putImageData(scannedImage, 0, 0)
  log('serpia Filter')
}
