import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { t, language, toggleLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(username, password);
        if (!success) {
            setError(t('auth.invalidCreds') || 'Invalid username or password');
        }
    };

    return (
        <div style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-base)',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: 'var(--font-body)'
        }}>
            {/* Multi-layered Aurora/Mesh Background */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '120%',
                height: '120%',
                zIndex: 0,
                opacity: theme === 'dark' ? 0.6 : 1
            }}>
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '20%',
                    width: '40vw',
                    height: '40vw',
                    background: 'radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                    animation: 'float 20s infinite alternate'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '25%',
                    width: '35vw',
                    height: '35vw',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                    animation: 'float 25s infinite alternate-reverse'
                }} />
                {/* Overlay to ensure readability and blend */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    background: theme === 'dark'
                        ? 'radial-gradient(circle at center, transparent 0%, var(--bg-base) 80%)'
                        : 'radial-gradient(circle at center, transparent 0%, var(--bg-base) 90%)',
                    zIndex: 1
                }} />
            </div>

            <style>{`
                @keyframes float {
                    0% { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(5%, 5%) scale(1.1); }
                }
                .shimmer-card {
                    position: relative;
                    overflow: hidden;
                }
                .shimmer-card::after {
                    content: "";
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.03), transparent);
                    transform: rotate(45deg);
                    animation: shimmer 10s infinite linear;
                    pointer-events: none;
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%) rotate(45deg); }
                    100% { transform: translateX(100%) rotate(45deg); }
                }
                .premium-input {
                    background: var(--bg-surface) !important;
                    border: 1px solid var(--border-subtle) !important;
                    color: var(--text-primary) !important;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }
                .premium-input:focus {
                    background: var(--bg-elevated) !important;
                    border-color: var(--accent-primary) !important;
                    box-shadow: 0 0 20px rgba(234, 179, 8, 0.1), inset 0 2px 4px rgba(0,0,0,0.05) !important;
                    transform: translateY(-1px);
                }
                .btn-sweep {
                    position: relative;
                    overflow: hidden;
                }
                .btn-sweep::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    transition: 0.5s;
                }
                .btn-sweep:hover::after {
                    left: 100%;
                }
            `}</style>

            {/* Quick Toggles */}
            <div style={{ position: 'absolute', top: '32px', right: '32px', display: 'flex', gap: '12px', zIndex: 10 }}>
                <button className="btn icon-btn" onClick={toggleLanguage} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                    {language === 'ar' ? 'EN' : 'AR'}
                </button>
                <button className="btn icon-btn" onClick={toggleTheme} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                    {theme === 'dark' ? '🌙' : '☀️'}
                </button>
            </div>

            {/* Main Login Card */}
            <div className="shimmer-card glass-panel" style={{
                width: '90%',
                maxWidth: '420px',
                padding: '48px 40px',
                borderRadius: '32px',
                border: '1px solid var(--border-strong)',
                boxShadow: theme === 'dark'
                    ? '0 40px 100px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.1)'
                    : '0 20px 50px rgba(15, 23, 42, 0.1), inset 0 1px 1px rgba(255,255,255,0.8)',
                zIndex: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: '32px'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        margin: '0 auto 24px',
                        background: 'linear-gradient(135deg, var(--accent-primary), #ca8a04)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        boxShadow: '0 10px 20px rgba(234, 179, 8, 0.2)'
                    }}>
                        ✨
                    </div>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: 'var(--text-primary)',
                        margin: '0',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '-1.5px',
                        background: theme === 'dark'
                            ? 'linear-gradient(to right, #fff, #94a3b8)'
                            : 'linear-gradient(to right, var(--text-primary), var(--text-tertiary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Gusto
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0', fontSize: '0.95rem', fontWeight: '500' }}>
                        {t('auth.subtitle') || 'Restaurant Management System'}
                    </p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: 'var(--accent-danger)',
                        padding: '12px',
                        borderRadius: '16px',
                        fontSize: '0.85rem',
                        textAlign: 'center',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        animation: 'shake 0.4s ease'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder={t('auth.username') || 'Username'}
                            className="modern-input premium-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ width: '100%', height: '56px', padding: '0 20px', borderRadius: '18px', fontSize: '1rem' }}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="password"
                            placeholder={t('auth.password') || 'Password'}
                            className="modern-input premium-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', height: '56px', padding: '0 20px', borderRadius: '18px', fontSize: '1rem' }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-sweep" style={{
                        height: '60px',
                        borderRadius: '18px',
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        background: 'linear-gradient(135deg, var(--accent-primary), #ca8a04)',
                        color: theme === 'dark' ? '#000' : '#fff',
                        border: 'none',
                        boxShadow: '0 10px 25px rgba(234, 179, 8, 0.3)',
                        cursor: 'pointer'
                    }}>
                        {t('auth.loginBtn') || 'Sign In'}
                    </button>

                    <div style={{
                        marginTop: '16px',
                        textAlign: 'center',
                        padding: '16px',
                        borderRadius: '20px',
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-subtle)'
                    }}>
                        <p style={{ margin: '0 0 4px', fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Authorized Personnel Only
                        </p>
                        <code style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: '600' }}>
                            admin / admin
                        </code>
                    </div>
                </form>
            </div>

            {/* Decorative bottom text */}
            <div style={{ position: 'absolute', bottom: '32px', color: 'var(--text-tertiary)', fontSize: '0.8rem', fontWeight: '500' }}>
                © 2026 Gusto POS System • All Rights Reserved
            </div>
        </div>
    );
};

export default Login;
