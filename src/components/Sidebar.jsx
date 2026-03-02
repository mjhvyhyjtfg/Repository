import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const { t } = useLanguage();
    const { logout } = useAuth();
    return (
        <aside className="glass-panel sidebar">
            <div className="brand">
                <h2>Gusto</h2>
                <span className="brand-subtitle">{t('brandSubtitle')}</span>
            </div>

            <nav className="nav-menu">
                <button
                    className={`nav-item ${activeTab === 'pos' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pos')}
                >
                    <span className="icon">🍔</span>
                    <span className="label">{t('pos')}</span>
                </button>
                <button
                    className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                >
                    <span className="icon">📊</span>
                    <span className="label">{t('dashboard')}</span>
                </button>
                <button
                    className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
                    onClick={() => setActiveTab('inventory')}
                >
                    <span className="icon">📝</span>
                    <span className="label">{t('inventory.title')}</span>
                </button>
            </nav>

            <div className="user-profile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="avatar">A</div>
                    <div className="user-info">
                        <h4>{t('admin')}</h4>
                        <p>{t('cashier')}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="btn btn-ghost icon-btn"
                    title={t('auth.logout') || 'Logout'}
                    style={{ color: 'var(--accent-danger)' }}
                >
                    🚪
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
