import './App.css'
import { Toaster } from 'sonner'
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className='container'>
      <Toaster richColors />
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default App
