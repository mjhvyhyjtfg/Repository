import React, { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useOrders } from '../context/OrdersContext';

const StatCard = ({ title, value, trend, icon, isPositive }) => (
    <div className="stat-card glass-card">
        <div className="stat-header">
            <div className="stat-icon">{icon}</div>
            <div className={`stat-trend ${isPositive ? 'positive' : 'negative'}`}>
                {isPositive ? '↗' : '↘'} {Math.abs(trend)}%
            </div>
        </div>
        <div className="stat-body">
            <h3>{value}</h3>
            <p>{title}</p>
        </div>
    </div>
);

const Dashboard = () => {
    const { t } = useLanguage();
    const { orders, resetDashboard } = useOrders();

    // Dynamic calculations
    const totalRevenue = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);
    const totalOrders = orders.length;
    const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;
    const activeCustomers = new Set(orders.map(o => o.id)).size; // Unique orders approximate customers

    return (
        <div className="dashboard-container">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-16px' }}>
                <button className="btn btn-danger" onClick={() => {
                    if (window.confirm('Are you sure you want to reset all data?')) resetDashboard();
                }}>
                    {t('stats.reset')}
                </button>
            </div>
            {/* Stat Cards Row */}
            <div className="stats-grid">
                <StatCard title={t('stats.revenue')} value={`$${totalRevenue.toFixed(2)}`} trend={12.5} icon="💰" isPositive={true} />
                <StatCard title={t('stats.orders')} value={totalOrders} trend={8.2} icon="🛍️" isPositive={true} />
                <StatCard title={t('stats.avgValue')} value={`$${avgOrderValue.toFixed(2)}`} trend={-2.4} icon="📉" isPositive={false} />
                <StatCard title={t('stats.customers')} value={activeCustomers} trend={18.1} icon="👥" isPositive={true} />
            </div>

            {/* Main Content Area */}
            <div className="dashboard-content">
                {/* Chart Area Dummy */}
                <div className="chart-section glass-panel">
                    <div className="section-header">
                        <h3>{t('stats.revenue')}</h3>
                        <button className="btn btn-ghost" onClick={() => alert('Filter applied!')}>This Week</button>
                    </div>
                    <div className="chart-placeholder flex-center text-secondary">
                        <div className="bar-chart-dummy">
                            <div className="bar" style={{ height: '40%' }}></div>
                            <div className="bar" style={{ height: '60%' }}></div>
                            <div className="bar" style={{ height: '30%' }}></div>
                            <div className="bar" style={{ height: '80%' }}></div>
                            <div className="bar" style={{ height: '50%' }}></div>
                            <div className="bar" style={{ height: '90%', background: 'var(--accent-primary)' }}></div>
                            <div className="bar" style={{ height: '70%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="orders-section glass-panel">
                    <div className="section-header">
                        <h3>{t('recentOrders.title')}</h3>
                        <button className="btn btn-ghost" onClick={() => alert('Opening full orders list...')}>{t('recentOrders.viewAll')}</button>
                    </div>
                    <div className="table-responsive">
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>{t('recentOrders.orderId')}</th>
                                    <th>{t('recentOrders.time')}</th>
                                    <th>{t('recentOrders.items')}</th>
                                    <th>{t('recentOrders.total')}</th>
                                    <th>{t('recentOrders.status')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 ? (
                                    <tr><td colSpan="5" style={{ textAlign: 'center', padding: '24px' }}>No orders today yet.</td></tr>
                                ) : (
                                    orders.map(order => (
                                        <tr key={order.id}>
                                            <td className="font-heading font-medium">{order.id}</td>
                                            <td className="text-tertiary">{order.time}</td>
                                            <td>{order.items} items</td>
                                            <td className="font-bold">${order.total.toFixed(2)}</td>
                                            <td>
                                                <span className={`status-badge ${order.status}`}>
                                                    {t(`recentOrders.${order.status}`)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
