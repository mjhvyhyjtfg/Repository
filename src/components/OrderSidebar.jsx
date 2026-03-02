import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useOrders } from '../context/OrdersContext';

const OrderSidebar = ({ cart, updateQuantity, clearCart }) => {
    const { t } = useLanguage();
    const { addOrder } = useOrders();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxRate = 0.08; // 8% tax
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return (
        <aside className="order-sidebar glass-panel">
            <div className="order-header">
                <h2>{t('cart.currentOrder')}</h2>
                <span className="order-number">#0042</span>
            </div>

            <div className="order-items-list">
                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <span className="icon">🛒</span>
                        <p>{t('cart.empty')}</p>
                    </div>
                ) : (
                    cart.map(item => (
                        <div key={item.id} className="order-item">
                            <div className="item-details">
                                <span className="item-name">{t(`categories.${item.category}`)} - {item.name}</span>
                                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <div className="quantity-controls">
                                <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                                <span className="qty">{item.quantity}</span>
                                <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="order-summary">
                <div className="summary-row">
                    <span>{t('cart.subtotal')}</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                    <span>{t('cart.tax')}</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                    <span>{t('cart.total')}</span>
                    <span className="text-gradient">${total.toFixed(2)}</span>
                </div>

                <div className="checkout-actions">
                    <button className="btn btn-danger" onClick={clearCart} disabled={cart.length === 0}>
                        {t('cart.clear')}
                    </button>
                    <button className="btn btn-primary checkout-btn" onClick={() => { addOrder(cart, total); alert(t('cart.checkoutSuccess') || 'Order placed successfully!'); clearCart(); }} disabled={cart.length === 0}>
                        {t('cart.checkout')}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default OrderSidebar;
