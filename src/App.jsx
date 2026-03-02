import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import POS from './pages/POS';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('pos');

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <Header activeTab={activeTab} />
        <div className="page-container">
          {activeTab === 'pos' && <POS />}
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'inventory' && <Inventory />}
        </div>
      </main>
    </div>
  )
}

export default App
