import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMenu } from '../context/MenuContext';

const Inventory = () => {
    const { t } = useLanguage();
    const { categories, menuItems, addCategory, deleteCategory, addMenuItem, deleteMenuItem } = useMenu();

    const [activeTab, setActiveTab] = useState('items'); // 'items' or 'categories'

    // Multi-Form States
    const [newCatId, setNewCatId] = useState('');
    const [newCatName, setNewCatName] = useState('');

    const [newItemName, setNewItemName] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
    const [newItemCat, setNewItemCat] = useState(categories[0]?.id || '');
    const [newItemImage, setNewItemImage] = useState('');

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (!newCatId || !newCatName) return;
        addCategory({ id: newCatId, name: newCatName, icon: '🍽️' });
        setNewCatId('');
        setNewCatName('');
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        if (!newItemName || !newItemPrice || !newItemCat) return;
        const fallbackImage = `https://loremflickr.com/300/200/${encodeURIComponent(newItemName)},food/all`;
        const finalImage = newItemImage.trim() !== '' ? newItemImage : fallbackImage;
        addMenuItem({
            category: newItemCat,
            name: newItemName,
            price: parseFloat(newItemPrice),
            image: finalImage
        });
        setNewItemName('');
        setNewItemPrice('');
        setNewItemImage('');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', height: '100%' }}>

            {/* Top Navigation Tabs */}
            <div style={{ display: 'flex', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: 'var(--radius-lg)', width: 'fit-content', border: '1px solid var(--border-subtle)' }}>
                <button
                    onClick={() => setActiveTab('items')}
                    style={{
                        padding: '10px 24px',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: activeTab === 'items' ? 'var(--accent-primary)' : 'transparent',
                        color: activeTab === 'items' ? '#000' : 'var(--text-secondary)',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontSize: '1rem'
                    }}
                >
                    {t('inventory.menuItems')}
                </button>
                <button
                    onClick={() => setActiveTab('categories')}
                    style={{
                        padding: '10px 24px',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: activeTab === 'categories' ? 'var(--accent-primary)' : 'transparent',
                        color: activeTab === 'categories' ? '#000' : 'var(--text-secondary)',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontSize: '1rem'
                    }}
                >
                    {t('inventory.categories')}
                </button>
            </div>

            <div className="glass-panel" style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

                {activeTab === 'items' ? (
                    <>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                            <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>{t('inventory.addItem')}</h3>
                            <form onSubmit={handleAddItem} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                                <input
                                    type="text"
                                    placeholder={t('inventory.itemName')}
                                    value={newItemName}
                                    onChange={e => setNewItemName(e.target.value)}
                                    className="modern-input"
                                    required
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder={t('inventory.price')}
                                    value={newItemPrice}
                                    onChange={e => setNewItemPrice(e.target.value)}
                                    className="modern-input"
                                    required
                                />
                                <select
                                    value={newItemCat}
                                    onChange={e => setNewItemCat(e.target.value)}
                                    className="modern-input"
                                    required
                                >
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                <button type="submit" className="btn btn-primary" style={{ fontWeight: '700' }}>{t('inventory.addItem')}</button>
                            </form>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            <table className="modern-table">
                                <thead>
                                    <tr>
                                        <th>{t('inventory.name')}</th>
                                        <th>{t('inventory.price')}</th>
                                        <th>{t('inventory.cat')}</th>
                                        <th style={{ textAlign: 'center' }}>{t('inventory.action')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {menuItems.map(item => (
                                        <tr key={item.id}>
                                            <td style={{ fontWeight: '600' }}>{item.name}</td>
                                            <td style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>${item.price.toFixed(2)}</td>
                                            <td><span style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem' }}>{item.category}</span></td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className="btn btn-danger" onClick={() => deleteMenuItem(item.id)} style={{ padding: '6px 12px' }}>
                                                    🗑️ {t('inventory.delete')}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                            <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>{t('inventory.addCategory')}</h3>
                            <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                <input
                                    type="text"
                                    placeholder={t('inventory.catId')}
                                    value={newCatId}
                                    onChange={e => setNewCatId(e.target.value)}
                                    className="modern-input"
                                    style={{ flex: 1, minWidth: '150px' }}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder={t('inventory.catName')}
                                    value={newCatName}
                                    onChange={e => setNewCatName(e.target.value)}
                                    className="modern-input"
                                    style={{ flex: 2, minWidth: '200px' }}
                                    required
                                />
                                <button type="submit" className="btn btn-primary" style={{ padding: '0 32px', fontWeight: '700' }}>+</button>
                            </form>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            <table className="modern-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>{t('inventory.name')}</th>
                                        <th style={{ textAlign: 'center' }}>{t('inventory.action')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map(cat => (
                                        <tr key={cat.id}>
                                            <td style={{ opacity: 0.6, fontSize: '0.9rem' }}>{cat.id}</td>
                                            <td style={{ fontWeight: '600' }}>{cat.icon} {cat.name}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className="btn btn-danger" onClick={() => deleteCategory(cat.id)} style={{ padding: '6px 12px' }}>
                                                    🗑️ {t('inventory.delete')}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Inventory;
