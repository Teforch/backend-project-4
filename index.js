import DownloadHTML from './src/DownloadHTML.js'

export default class PageLoader {
  constructor(url, outputDir) {
    this.url = url
    this.outputDir = outputDir
  }

  async load() {
    const loaderHTML = new DownloadHTML(this.url, this.outputDir)
    await loaderHTML.download()
  }
}
