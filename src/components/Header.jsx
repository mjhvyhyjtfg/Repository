import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Header = ({ activeTab }) => {
    const [time, setTime] = useState(new Date());
    const { language, toggleLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = time.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const titleMap = {
        'pos': t('pos'),
        'dashboard': t('dashboardOverview'),
        'inventory': t('inventory.title')
    };

    return (
        <header className="glass-panel top-header">
            <div className="header-title">
                <h1>{titleMap[activeTab] || t('pos')}</h1>
            </div>

            <div className="header-actions">
                <div className="clock">
                    <span className="time">{formattedTime}</span>
                    <span className="date">{formattedDate}</span>
                </div>
                <button className="btn btn-ghost icon-btn" onClick={toggleTheme} title="Toggle Theme">
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                <button className="btn btn-ghost icon-btn" onClick={toggleLanguage} title="Toggle Language">
                    {language === 'ar' ? 'En' : 'ع'}
                </button>
                <button className="btn btn-ghost icon-btn" onClick={() => alert(t('dashboard') + ' Notifications')}>
                    🔔
                </button>
                <button className="btn btn-primary" onClick={() => alert(t('newOrder') + ' feature coming soon!')}>
                    {t('newOrder')}
                </button>
            </div>
        </header>
    );
};

export default Header;
