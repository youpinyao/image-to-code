const fs = require('fs');
const PNG = require('pngjs').PNG;
const chalk = require('chalk');

fs.createReadStream('1.png')
  .pipe(new PNG({
    filterType: 4
  }))
  .on('parsed', function () {
    const width = this.width;
    const space = parseInt(this.width / width, 10) || 1;
    let str = '';

    for (var y = 0; y < this.height; y+= space) {
      let colors = [];
      str += '<div>';
      for (var x = 0; x < this.width; x+= space) {
        const idx = this.width * y * 4 + x * 4;
        // const grey = (this.data[idx + 0] + this.data[idx + 1] + this.data[idx + 2]) / 3;
        // const idx = (this.width * y + x) << 2;
        // const color = chalk.rgb(grey, grey, grey);
        const r = this.data[idx + 0];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const a = this.data[idx + 3];
        const color = chalk.rgb(this.data[idx + 0], this.data[idx + 1], this.data[idx + 2]);

        // process.stdout.write(color('G'));
        str += `<span style="color:rgba(${r},${g},${b},${a})">G</span>`;
      }
      // process.stdout.write('\n');
      str += '</div>';
    }

    fs.writeFileSync('out.html', `${fs.readFileSync('./template.html')}`.replace(/\${content}/g, str));

    // this.pack().pipe(fs.createWriteStream('out.png'));
  });
