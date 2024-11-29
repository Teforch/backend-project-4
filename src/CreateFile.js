import fs from 'fs/promises'
import path from 'path'

export default class CreateFile {
  static async createHTMLFile(data, outputDir, fileName) {
    const filePath = path.join(outputDir, `${fileName}.html`)
    await fs.writeFile(filePath, data)
  }
}
