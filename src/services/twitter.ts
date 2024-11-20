import type { TwitterConfig } from '../types';

class TwitterService {
  private static instance: TwitterService;
  private config: TwitterConfig | null = null;

  private constructor() {}

  static getInstance(): TwitterService {
    if (!this.instance) {
      this.instance = new TwitterService();
    }
    return this.instance;
  }

  setConfig(config: TwitterConfig) {
    this.config = config;
  }

  async fetchWithTimeout(url: string, options: RequestInit, timeout = 5000): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  private async makeRequest(url: string) {
    if (!this.config?.apiKey) {
      throw new Error('API_NOT_CONFIGURED');
    }

    try {
      const response = await this.fetchWithTimeout(url, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Accept': 'application/json',
        },
      });

      const text = await response.text();
      let data;
      
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error(`PARSE_ERROR:${text}`);
      }

      if (!response.ok) {
        throw new Error(`API_ERROR:${response.status}:${JSON.stringify(data)}`);
      }

      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('TIMEOUT');
      }
      throw error;
    }
  }

  async getUser(username: string) {
    const data = await this.makeRequest(
      `https://api.twitter.com/2/users/by/username/${username}`
    );
    
    if (!data.data?.id) {
      throw new Error('USER_NOT_FOUND');
    }
    
    return data.data;
  }

  async getLatestTweet(userId: string) {
    const data = await this.makeRequest(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=1`
    );
    
    return data.data?.[0]?.text;
  }
}

export const twitterService = TwitterService.getInstance();