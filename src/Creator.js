import fs from 'fs/promises';
import path from 'path';

export default class Creator {
  constructor(outputDir, fileName) {
    this.outputDir = outputDir;
    this.fileName = fileName;
  }

  async createHTMLFile(data) {
    const filePath = path.join(this.outputDir, `${this.fileName}.html`);
    await fs.writeFile(filePath, data);
  }

  async createDirectory() {
    const dirPath = path.join(this.outputDir, `${this.fileName}_files`);
    await fs.mkdir(dirPath);

    this.dirPath = dirPath;
  }

  async createAssets(data, name) {
    const filePath = path.join(this.dirPath, `${name}`);
    await fs.writeFile(filePath, data);
  }
}
