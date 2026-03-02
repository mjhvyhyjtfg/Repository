import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMenu } from '../context/MenuContext';

const MenuGrid = ({ categories, menuItems, activeCategory, setActiveCategory, addToCart }) => {
    const { t } = useLanguage();
    const { deleteItem, addItem } = useMenu();
    const [isEditMode, setIsEditMode] = useState(false);

    const filteredItems = menuItems.filter(item => item.category === activeCategory);

    const handleAddItem = () => {
        const name = prompt(t('inventory.itemName'));
        const price = parseFloat(prompt(t('inventory.price')));
        if (name && !isNaN(price)) {
            addItem({
                name,
                price,
                category: activeCategory,
                image: '/images/1.png' // Default image
            });
        }
    };

    const handleDelete = (e, id) => {
        e.stopPropagation();
        if (confirm(t('inventory.delete') + '?')) {
            deleteItem(id);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            height: '100%',
            width: '100%',
            overflow: 'hidden'
        }}>
            {/* Minimal Category Pills Filter + Edit Toggle */}
            <div style={{
                display: 'flex',
                gap: '10px',
                padding: '4px 4px 12px',
                overflowX: 'auto',
                borderBottom: '1px solid var(--border-subtle)',
                MsOverflowStyle: 'none',
                scrollbarWidth: 'none',
                flexShrink: 0,
                alignItems: 'center'
            }}>
                {categories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        style={{
                            whiteSpace: 'nowrap',
                            padding: '10px 18px',
                            borderRadius: 'var(--radius-full)',
                            background: activeCategory === category.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                            color: activeCategory === category.id ? '#000' : 'var(--text-secondary)',
                            border: '1px solid ' + (activeCategory === category.id ? 'var(--accent-primary)' : 'var(--border-subtle)'),
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <span>{category.icon}</span>
                        <span>{t(`categories.${category.id}`)}</span>
                    </button>
                ))}

                <div style={{ flex: 1 }} />

                <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className="btn btn-ghost"
                    style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-full)',
                        background: isEditMode ? 'var(--accent-danger)' : 'rgba(255,255,255,0.05)',
                        color: isEditMode ? '#fff' : 'var(--accent-primary)',
                        border: '1px solid ' + (isEditMode ? 'var(--accent-danger)' : 'var(--accent-primary)'),
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '44px',
                        height: '44px'
                    }}
                    title={isEditMode ? "Exit Edit Mode" : "Manage Menu"}
                >
                    {isEditMode ? '✅' : '⚙️'}
                </button>
            </div>

            {/* Ultra-Simple Scrollable Grid */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                paddingRight: '4px'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
                    gap: '16px',
                    paddingBottom: '20px'
                }}>
                    {filteredItems.map(item => (
                        <div
                            key={item.id}
                            style={{
                                background: 'var(--bg-elevated)',
                                border: '1px solid ' + (isEditMode ? 'var(--accent-danger)' : 'var(--border-subtle)'),
                                borderRadius: 'var(--radius-md)',
                                padding: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                                position: 'relative',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                            onClick={() => !isEditMode && addToCart(item)}
                        >
                            {isEditMode && (
                                <button
                                    onClick={(e) => handleDelete(e, item.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '-8px',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: 'var(--accent-danger)',
                                        color: '#fff',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        zIndex: 10,
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    ✕
                                </button>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{
                                        margin: '0',
                                        fontSize: '0.95rem',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)',
                                        lineHeight: '1.2'
                                    }}>
                                        {item.name}
                                    </h4>
                                    <p style={{
                                        margin: '4px 0 0',
                                        color: 'var(--accent-primary)',
                                        fontWeight: '700',
                                        fontSize: '1rem'
                                    }}>
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>
                                {!isEditMode && (
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        background: 'var(--accent-primary)',
                                        color: '#000',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.4rem',
                                        fontWeight: 'bold',
                                        boxShadow: '0 2px 8px rgba(234, 179, 8, 0.3)'
                                    }}>
                                        +
                                    </div>
                                )}
                            </div>
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                    width: '100%',
                                    height: '100px',
                                    objectFit: 'cover',
                                    borderRadius: 'var(--radius-sm)',
                                    opacity: 0.8
                                }}
                            />
                        </div>
                    ))}

                    {isEditMode && (
                        <div
                            style={{
                                border: '2px dashed var(--accent-primary)',
                                borderRadius: 'var(--radius-md)',
                                padding: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                cursor: 'pointer',
                                minHeight: '170px',
                                background: 'rgba(234, 179, 8, 0.05)',
                                color: 'var(--accent-primary)',
                                transition: 'all 0.2s ease'
                            }}
                            onClick={handleAddItem}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(234, 179, 8, 0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(234, 179, 8, 0.05)'}
                        >
                            <span style={{ fontSize: '2rem' }}>➕</span>
                            <span style={{ fontWeight: '600' }}>{t('inventory.addItem')}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuGrid;
