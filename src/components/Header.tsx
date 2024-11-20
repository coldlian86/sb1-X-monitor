import React from 'react';
import { Twitter } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
        <Twitter className="w-8 h-8 text-blue-500" />
        Twitter Monitor
      </h1>
    </div>
  );
};