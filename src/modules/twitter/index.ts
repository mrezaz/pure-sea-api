import * as twitter from "twitter";
import * as config from "config";

export class Twitter {
  private client = new twitter({
    consumer_key: config.get<string>("consumer_key"),
    consumer_secret: config.get<string>("consumer_secret"),
    access_token_key: config.get<string>("access_token_key"),
    access_token_secret: config.get<string>("access_token_secret")
  });

  public async getTweets(displayName: string) {
    try {
      const tweets = await this.client.get('statuses/user_timeline', {
        screen_name: displayName,
        count: 25,
        tweet_mode: "extended"
      });
      return tweets;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
