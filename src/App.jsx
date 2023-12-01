import './App.css'
import { Toaster } from 'sonner'
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { appWriteGetChats, appWriteGetUsers } from './api/appWrite/api';
import { useEffect } from 'react';
import StatusBar from './components/StatusBar';
import Header from './components/Header';

function App() {
  useEffect(() => {
    return () => {
      appWriteGetChats()
      appWriteGetUsers()
    }
  }, []);

  return (
    <div className='container'>
      <Toaster richColors position="top-right" />
      <Header />
      <StatusBar />
      {/* <Sidebar /> */}
      <Outlet />
    </div>
  )
}

export default App
