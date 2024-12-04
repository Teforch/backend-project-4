import fs from 'fs/promises'
import path from 'path'
import os from 'os'
import Loader from '../src/Loader.js'
import nock from 'nock'
import * as cheerio from 'cheerio'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

nock.disableNetConnect()
const __dirname = dirname(fileURLToPath(import.meta.url))
let tempDir

beforeEach(async () => {
  tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'))
})

test('DownloadHTML', async () => {
  const beforeHTML = await fs.readFile(
    path.join(__dirname, '../__fixtures__/beforeChange.html'),
    'utf8'
  )
  const afterHTML = await fs.readFile(
    path.join(__dirname, '../__fixtures__/afterChange.html'),
    'utf8'
  )
  const png = await fs.readFile(
    path.join(__dirname, '../__fixtures__/nodejs.png'),
    'utf8'
  )
  const css = await fs.readFile(
    path.join(__dirname, '../__fixtures__/application.css'),
    'utf8'
  )
  const js = await fs.readFile(
    path.join(__dirname, '../__fixtures__/runtime.js'),
    'utf8'
  )
  const url = 'https://ru.hexlet.io'

  nock(url).get('/courses').reply(200, beforeHTML)
  nock(url).get('/assets/professions/nodejs.png').reply(200, png)
  nock(url).get('/assets/application.css').reply(200, css)
  nock(url).get('/packs/js/runtime.js').reply(200, js)
  const fileName = 'ru-hexlet-io-courses'
  const loader = new Loader(`${url}/courses`, tempDir, fileName)
  await loader.downloadHTML()
  await loader.downloadPictures()
  await loader.downloadLinks()
  //await loader.downloadScripts()
  const result = await fs.readFile(
    path.join(tempDir, 'ru-hexlet-io-courses.html'),
    'utf8'
  )
  const dir = await fs.readdir(path.join(tempDir, 'ru-hexlet-io-courses_files'))
  console.log(dir)
  const $result = cheerio.load(result)
  const $after = cheerio.load(afterHTML)

  expect($result.html()).toBe($after.html())
})
