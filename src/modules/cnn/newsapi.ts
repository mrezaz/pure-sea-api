import * as config from "config";
import * as request from "request";

interface IEverything {
  status: string;
  articles: {
    source: {
      id: string;
      name: string;
    },
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
  }[]
}

export class NewsApi {
  private apiKey = config.get<string>("news_api_key");

  constructor() {
  }

  public async searchCNN(keyWord: string[], page?: number) {
    if (page === undefined) {
      page = 1;
    }
    const q = keyWord.join(" AND ");
    return new Promise<IEverything>((resolve, reject) => {
      request.get(
        `https://newsapi.org/v2/everything?q=${q}&apiKey=${this.apiKey}&sources=cnn&page=${page}`,
        {
          json: true
        }, (err, response, body) => {
          if (err) {
            return reject(err);
          } else if (response.statusCode !== 200) {
            return reject(err);
          } else {
            return resolve(body);
          }
        })
    });
  }
}
