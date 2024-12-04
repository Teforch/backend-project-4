import Loader from './src/Loader.js';

export default class PageLoader {
  constructor(url, outputDir) {
    this.url = url.slice(-1) === '/' ? url.slice(0, -1) : url;
    this.outputDir = outputDir;
  }

  async load() {
    const loader = new Loader(this.url, this.outputDir);
    await loader.downloadHTML();
    await loader.downloadPictures();
    await loader.downloadLinks();
    await loader.downloadScripts();
  }
}
