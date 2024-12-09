import Loader from './src/Loader.js';
import Listr from 'listr';
import axios from 'axios';

class PageLoader {
  constructor(url, outputDir) {
    this.url = url.slice(-1) === '/' ? url.slice(0, -1) : url;
    this.outputDir = outputDir;
  }

  async load() {
    const loader = new Loader(this.url, this.outputDir);
    await loader.downloadHTML();
    await loader.downloadPictures();
    await loader.downloadLinks();
    await loader.downloadScripts();

    const tasks = new Listr(loader.tasks, { concurrent: true });
    try {
      await tasks.run();
    } catch (error) {
      throw error;
    }
  }
}

export default async (url, outputDir = process.cwd()) => {
  const pageLoader = new PageLoader(url, outputDir);

  const response = await axios.get(url);
  if (response.status !== 200) {
    throw new Error('Page not found');
  }

  try {
    await pageLoader.load();
  } catch (error) {
    throw error;
  }
};
