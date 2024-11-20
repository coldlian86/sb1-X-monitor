import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Settings, AlertCircle, X } from 'lucide-react';

export const TwitterConfig: React.FC = () => {
  const { twitterConfig, setTwitterConfig, errors, clearError } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    apiKey: twitterConfig?.apiKey || '',
    apiSecret: twitterConfig?.apiSecret || '',
    accessToken: twitterConfig?.accessToken || '',
    accessTokenSecret: twitterConfig?.accessTokenSecret || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTwitterConfig(config);
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <Settings className="w-5 h-5" />
        Twitter API 配置
      </button>

      {Object.entries(errors).map(([key, error]) => (
        <div
          key={key}
          className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-700 text-sm font-medium">API 错误 - {key}</p>
              <p className="text-red-600 text-sm mt-1 whitespace-pre-wrap">{error}</p>
            </div>
            <button
              onClick={() => clearError(key)}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}

      {isOpen && (
        <div className="mt-4 p-6 bg-white rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Twitter API 设置</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Bearer Token</label>
              <input
                type="password"
                value={config.apiKey}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入 Twitter API Bearer Token"
              />
              <p className="mt-2 text-sm text-gray-500">
                请确保 Token 具有读取用户和推文的权限
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                保存配置
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};