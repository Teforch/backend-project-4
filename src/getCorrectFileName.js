import debug from 'debug';
const log = debug('page-loader');

export default (url, changeOnDotLastSymbol = false) => {
  const parsedUrl = new URL(url);
  let urlWithoutProtocol = url.replace(`${parsedUrl.protocol}//`, '');

  if (urlWithoutProtocol.endsWith('/')) {
    urlWithoutProtocol = urlWithoutProtocol.slice(0, -1) + '.html';
  }
  log(urlWithoutProtocol);

  if (changeOnDotLastSymbol) {
    const lastDotIndex = urlWithoutProtocol.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      const beforeLastDot = urlWithoutProtocol
        .slice(0, lastDotIndex)
        .replace(/[^a-z0-9]/gi, '-');
      const afterLastDot = urlWithoutProtocol.slice(lastDotIndex);
      const fileName = `${beforeLastDot}${afterLastDot}`;
      return fileName;
    }
  }
  const fileName = urlWithoutProtocol.replace(/[^a-z0-9]/gi, '-');
  return fileName;
};
