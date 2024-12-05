import axios from 'axios'
import debug from 'debug'
import Listr from 'listr'
import * as cheerio from 'cheerio'
import CreateFile from './Creator.js'
import getCorrectFileName from './getCorrectFileName.js'

const log = debug('page-loader')

export default class Loader {
  constructor(url, outputDir) {
    this.url = new URL(url)
    this.outputDir = outputDir
    this.correctFileName = getCorrectFileName(url)
    this.creator = new CreateFile(this.outputDir, this.correctFileName)
  }

  async downloadHTML() {
    const { data } = await axios.get(this.url.href)
    await this.creator.createHTMLFile(data)
    this.htmlFile = data
    log('HTML file downloaded')
  }

  async downloadPictures() {
    await this.creator.createDirectory()
    log('Created directory')
    const $ = cheerio.load(this.htmlFile)
    const images = $('img')
    const imagesArrayWithSrc = []
    images.each((i, image) => {
      const src = $(image).attr('src')
      if (src) {
        imagesArrayWithSrc.push(src)
      }
    })

    imagesArrayWithSrc.forEach(async (image) => {
      let url = image
      if (!url.startsWith('http')) {
        url = new URL(url, this.url.href).href
      } else if (new URL(image).hostname !== this.url.hostname) {
        return
      }
      const name = getCorrectFileName(url, true)

      const tasks = new Listr(
        [
          {
            title: url,
            task: async () => {
              const { data } = await axios.get(url, {
                responseType: 'arraybuffer',
              })
              await this.creator.createAssets(data, name)
            },
          },
        ],
        { concurrent: true }
      )

      await tasks.run()
      // const { data } = await axios.get(url, { responseType: 'arraybuffer' })
      // await this.creator.createAssets(data, name)
    })

    images.each((i, img) => {
      const srcPath = $(img).attr('src')
      if (srcPath.startsWith('http')) {
        if (new URL(srcPath).hostname !== this.url.hostname) {
          return
        }
      }
      const formattedPath = getCorrectFileName(
        new URL(srcPath, this.url.href).href,
        true
      )
      $(img).attr('src', `${this.creator.fileName}_files/${formattedPath}`)
    })

    const html = $.html()
    this.htmlFile = html
  }

  async downloadLinks() {
    const $ = cheerio.load(this.htmlFile)
    const links = $('link')
    const linksArrayWithHref = []

    links.each((i, link) => {
      const href = $(link).attr('href')
      if (href) {
        linksArrayWithHref.push(href)
      }
    })

    linksArrayWithHref.forEach(async (link) => {
      let url = link
      if (!url.startsWith('http')) {
        url = new URL(url, this.url.href).href
      } else if (new URL(link).hostname !== this.url.hostname) {
        return
      }
      const name = getCorrectFileName(url, true)

      const tasks = new Listr(
        [
          {
            title: url,
            task: async () => {
              const { data } = await axios.get(url, {
                responseType: 'arraybuffer',
              })
              await this.creator.createAssets(data, name)
            },
          },
        ],
        { concurrent: true }
      )

      await tasks.run()
      // const { data } = await axios.get(url, { responseType: 'arraybuffer' })
      // await this.creator.createAssets(data, name)
    })

    links.each((i, link) => {
      const hrefPath = $(link).attr('href')
      if (hrefPath.startsWith('http')) {
        if (new URL(hrefPath).hostname !== this.url.hostname) {
          return
        }
      }

      const newHrefPath = hrefPath.includes('.') ? hrefPath : `${hrefPath}.html`
      const formattedPath = getCorrectFileName(
        new URL(newHrefPath, this.url.href).href,
        true
      )
      $(link).attr('href', `${this.creator.fileName}_files/${formattedPath}`)
    })

    const html = $.html()
    this.htmlFile = html
    await this.creator.createHTMLFile(html)
  }

  async downloadScripts() {
    const $ = cheerio.load(this.htmlFile)
    const script = $('script')
    const scriptsArrayWithSrc = []

    script.each((i, script) => {
      const src = $(script).attr('src')
      if (src) {
        scriptsArrayWithSrc.push(src)
      }
    })

    scriptsArrayWithSrc.forEach(async (script) => {
      let url = script
      if (!url.startsWith('http')) {
        url = new URL(url, this.url.href).href
      } else if (new URL(script).hostname !== this.url.hostname) {
        return
      }
      const name = getCorrectFileName(url, true)

      const tasks = new Listr(
        [
          {
            title: url,
            task: async () => {
              const { data } = await axios.get(url, {
                responseType: 'arraybuffer',
              })
              await this.creator.createAssets(data, name)
            },
          },
        ],
        { concurrent: true }
      )

      await tasks.run()
      // const { data } = await axios.get(url, { responseType: 'arraybuffer' })
      // await this.creator.createAssets(data, name)
    })

    scriptsArrayWithSrc.forEach((script) => {
      if (script.startsWith('http')) {
        if (new URL(script).hostname !== this.url.hostname) {
          return
        }
      }
      const formattedPath = getCorrectFileName(
        new URL(script, this.url.href).href,
        true
      )
      $(script).attr('src', `${this.creator.fileName}_files/${formattedPath}`)
    })

    const html = $.html()
    this.htmlFile = html
    await this.creator.createHTMLFile(html)
  }
}