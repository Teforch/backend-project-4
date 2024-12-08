import fs from 'fs/promises';
import path from 'path';
import debug from 'debug';

const log = debug('page-loader');

export default class Creator {
  constructor(outputDir, fileName) {
    this.outputDir = outputDir;
    this.fileName = fileName;
  }

  async createHTMLFile(data) {
    const filePath = path.join(this.outputDir, `${this.fileName}.html`);
    try {
      await fs.writeFile(filePath, data);
    } catch (error) {
      throw error;
    }
  }

  async createDirectory() {
    const dirPath = path.join(this.outputDir, `${this.fileName}_files`);
    try {
      await fs.mkdir(dirPath);
    } catch (error) {
      throw error;
    }

    this.dirPath = dirPath;
  }

  async createAssets(data, name) {
    const filePath = path.join(this.dirPath, `${name}`);
    try {
      await fs.writeFile(filePath, data);
    } catch (error) {
      throw error;
    }
  }
}
