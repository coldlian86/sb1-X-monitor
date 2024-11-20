import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MonitoredUser, TwitterConfig } from '../types';
import { twitterService } from '../services/twitter';
import { getErrorMessage } from '../utils/errorMessages';

interface State {
  users: MonitoredUser[];
  twitterConfig: TwitterConfig | null;
  errors: Record<string, string>;
  addUser: (user: MonitoredUser) => void;
  removeUser: (id: string) => void;
  toggleMonitor: (id: string, type: 'tweets' | 'retweets') => void;
  setTwitterConfig: (config: TwitterConfig) => void;
  getLatestTweet: (username: string) => Promise<string>;
  clearError: (key: string) => void;
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      users: [],
      twitterConfig: null,
      errors: {},
      
      clearError: (key) => 
        set((state) => ({
          errors: Object.fromEntries(
            Object.entries(state.errors).filter(([k]) => k !== key)
          ),
        })),

      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      
      removeUser: (id) => set((state) => ({ 
        users: state.users.filter((u) => u.id !== id) 
      })),
      
      toggleMonitor: (id, type) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id
              ? {
                  ...user,
                  [type === 'tweets' ? 'monitorTweets' : 'monitorRetweets']:
                    !user[type === 'tweets' ? 'monitorTweets' : 'monitorRetweets'],
                }
              : user
          ),
        })),

      setTwitterConfig: (config) => {
        twitterService.setConfig(config);
        set({ twitterConfig: config });
      },

      getLatestTweet: async (username) => {
        try {
          const user = await twitterService.getUser(username);
          const tweet = await twitterService.getLatestTweet(user.id);
          return tweet || '无最新推文';
        } catch (error) {
          const errorMessage = getErrorMessage(error);
          set((state) => ({
            errors: {
              ...state.errors,
              [username]: errorMessage,
            },
          }));
          throw error;
        }
      },
    }),
    {
      name: 'twitter-monitor-storage',
    }
  )
);