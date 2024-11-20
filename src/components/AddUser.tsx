import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { MonitoredUser } from '../types';

export const AddUser: React.FC = () => {
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const addUser = useStore((state) => state.addUser);

  const handleAddUser = () => {
    if (!url) return;

    // Extract username from URL
    const username = url.split('/').pop() || '';
    
    const newUser: MonitoredUser = {
      id: crypto.randomUUID(),
      url,
      note,
      username,
      monitorTweets: true,
      monitorRetweets: true,
    };
    
    addUser(newUser);
    setUrl('');
    setNote('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">添加 KOL</h2>
      <div className="flex gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="输入 Twitter 用户链接"
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="添加备注（选填）"
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleAddUser}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          添加监控
        </button>
      </div>
    </div>
  );
};