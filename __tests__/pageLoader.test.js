import nock from 'nock';
import pageLoader from '../index.js';

test('pageLoader with rootDirPath', async () => {
  const url = 'https://localhost:8080';
  nock(url).get('/').reply(200, '<html></html>');

  await expect(pageLoader(url, '/sys')).rejects.toThrow();
});

test('pageLoader with invalidUrl', async () => {
  const url = 'https://localhost:8080';
  nock(url).get('/').reply(400, '<html></html>');

  await expect(
    pageLoader('http://sadflksaf', '/home/user/test1/'),
  ).rejects.toThrow();
});
