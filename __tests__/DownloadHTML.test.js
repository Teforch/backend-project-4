import fs from 'fs/promises'
import path from 'path'
import os from 'os'
import DownloadHTML from '../src/DownloadHTML.js'
import nock from 'nock'

nock.disableNetConnect()

let tempDir
const expected = '<html></html>'

beforeEach(async () => {
  tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'))
})

test('DownloadHTML', async () => {
  nock('https://example.com').get('/').reply(200, expected)
  const loader = new DownloadHTML('https://example.com', tempDir)
  await loader.download()
  const result = await fs.readFile(
    path.join(tempDir, 'example-com.html'),
    'utf8'
  )

  expect(result).toBe(expected)
})
