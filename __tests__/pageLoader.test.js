import pageLoader from '../index.js';
import nock from 'nock';

test('pageLoader with rootDirPath', async () => {
  const url = 'https://localhost:8080';
  nock(url).get('/').reply(200, '<html></html>');

  expect(await pageLoader(url, '/sys')).rejects.toThrow();
});
