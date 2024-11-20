import React from 'react';
import { Header } from './components/Header';
import { TwitterConfig } from './components/TwitterConfig';
import { AddUser } from './components/AddUser';
import { UserList } from './components/UserList';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto p-6">
        <Header />
        <TwitterConfig />
        <AddUser />
        <UserList />
      </div>
    </div>
  );
}

export default App;