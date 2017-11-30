import { NewsApi } from "./newsapi";

export class CNN {
  private source = new NewsApi();

  public async search(keyWord: string[], count) {
    try {
      const firstPage = await this.source.searchCNN(keyWord, 1);
      const secondPage = await this.source.searchCNN(keyWord, 2);
      const articles = firstPage.articles.concat(secondPage.articles);
      return articles.slice(0, count);
    } catch (error) {
      return Promise.reject("Cannot get news");
    }
  }
}
