import axios from 'axios'
import CreateFile from './CreateFile.js'

export default class DownloadHTML {
  constructor(url, outputDir) {
    this.url = url
    this.outputDir = outputDir
  }

  async download() {
    const parsedUrl = new URL(this.url)
    const urlWithoutProtocol = this.url.replace(`${parsedUrl.protocol}//`, '')
    const fileName = urlWithoutProtocol.replace(/[^a-z0-9]/gi, '-')

    const { data } = await axios.get(this.url)
    await CreateFile.createHTMLFile(data, this.outputDir, fileName)
  }
}
