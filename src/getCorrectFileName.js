import path from 'path';

export default (url, changeOnDotLastSymbol = false) => {
  const parsedUrl = new URL(url);
  let urlWithoutProtocol = url.replace(`${parsedUrl.protocol}//`, '');

  if (path.extname(urlWithoutProtocol) === '' && changeOnDotLastSymbol) {
    urlWithoutProtocol += '.html';
  }

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
