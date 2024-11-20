export interface MonitoredUser {
  id: string;
  url: string;
  note?: string;
  monitorTweets: boolean;
  monitorRetweets: boolean;
  username: string;
}

export interface TwitterConfig {
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessTokenSecret: string;
}