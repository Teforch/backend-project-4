export default (url, changeOnDotLastSymbol) => {
  const parsedUrl = new URL(url);
  const urlWithoutProtocol = url.replace(`${parsedUrl.protocol}//`, '');

  if (changeOnDotLastSymbol) {
    const lastDotIndex = urlWithoutProtocol.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      const beforeLastDot = urlWithoutProtocol
        .slice(0, lastDotIndex)
        .replace(/[^a-z0-9]/gi, '-');
      const afterLastDot = urlWithoutProtocol.slice(lastDotIndex);
      return beforeLastDot + afterLastDot;
    }
  }
  const fileName = urlWithoutProtocol.replace(/[^a-z0-9]/gi, '-');
  return fileName;
};
