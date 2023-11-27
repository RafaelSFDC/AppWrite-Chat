import './App.css'
import { Toaster } from 'sonner'
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <main>
      <Toaster richColors />
      <Sidebar />
      <Outlet />
    </main>
  )
}

export default App
