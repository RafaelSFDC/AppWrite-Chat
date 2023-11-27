import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import AuthProvider from './auth/AuthProvider';
import IsLogged from './auth/IsLogged.jsx'
import Room from './pages/Room.jsx'
import Chats from './pages/Chats';
import Settings from './pages/Settings';
import Users from './pages/Users';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<IsLogged />}>
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<AuthProvider />}>
          <Route path="/" element={<App />} >
            <Route path="/" element={<Room />} />
            <Route path="/chat" element={<Chats />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
