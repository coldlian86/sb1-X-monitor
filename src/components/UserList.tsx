import React, { useState } from 'react';
import { MessageCircle, Repeat2, Trash2, RefreshCw } from 'lucide-react';
import { useStore } from '../store/useStore';

export const UserList: React.FC = () => {
  const { users, toggleMonitor, removeUser, getLatestTweet } = useStore();
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [latestTweets, setLatestTweets] = useState<Record<string, string>>({});

  const handleGetLatestTweet = async (username: string, userId: string) => {
    setLoading((prev) => ({ ...prev, [userId]: true }));
    try {
      const tweet = await getLatestTweet(username);
      setLatestTweets((prev) => ({ ...prev, [userId]: tweet }));
    } catch (error) {
      setLatestTweets((prev) => ({ ...prev, [userId]: '获取失败' }));
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">监控列表</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="space-y-3 p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                  {user.note || '未备注'}
                </div>
                <span className="text-gray-600">@{user.username}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={user.monitorTweets}
                      onChange={() => toggleMonitor(user.id, 'tweets')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Repeat2 className="w-5 h-5 text-gray-400" />
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={user.monitorRetweets}
                      onChange={() => toggleMonitor(user.id, 'retweets')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                <button
                  onClick={() => handleGetLatestTweet(user.username, user.id)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  disabled={loading[user.id]}
                >
                  <RefreshCw className={`w-5 h-5 ${loading[user.id] ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={() => removeUser(user.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            {latestTweets[user.id] && (
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {latestTweets[user.id]}
              </div>
            )}
          </div>
        ))}
        {users.length === 0 && (
          <div className="text-center py-8 text-gray-500">暂无监控用户，请添加...</div>
        )}
      </div>
    </div>
  );
};