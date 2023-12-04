import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import AuthProvider from './auth/AuthProvider';
import IsLogged from './auth/IsLogged.jsx'
import Register from './pages/Register.jsx'
import Chats2 from './pages/chats/Chats2';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<IsLogged />}>
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<AuthProvider />}>
          <Route path="/" element={<App />} >
            <Route path="/" element={<Chats2 />} />
            {/* <Route path="/settings" element={<Settings />} /> */}
            {/* <Route path="/chats" element={<Chats2 />} /> */}
            {/* <Route path="/users" element={<Users />} /> */}
          </Route>
        </Route>
        {/* <Route element={<AuthProvider />}>
          <Route path="/" element={<App />} >
            <Route path="/" element={<Room />} />
            <Route path="/chats" element={<Chats2 />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
