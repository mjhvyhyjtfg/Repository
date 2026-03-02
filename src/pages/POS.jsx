import React, { useState } from 'react';
import MenuGrid from '../components/MenuGrid';
import OrderSidebar from '../components/OrderSidebar';
import { useMenu } from '../context/MenuContext';

const POS = () => {
    const { categories, menuItems } = useMenu();
    const [activeCategory, setActiveCategory] = useState(categories[0]?.id || null);
    const [cart, setCart] = useState([]);

    const safeActiveCategory = categories.find(c => c.id === activeCategory) ? activeCategory : categories[0]?.id;

    const addToCart = (item) => {
        setCart(prevCart => {
            const existing = prevCart.find(cartItem => cartItem.id === item.id);
            if (existing) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const updateQuantity = (id, change) => {
        setCart(prevCart =>
            prevCart.map(item => {
                if (item.id === id) {
                    const newQty = item.quantity + change;
                    return newQty > 0 ? { ...item, quantity: newQty } : item;
                }
                return item;
            }).filter(item => item.quantity > 0)
        );
    };

    const clearCart = () => setCart([]);

    return (
        <div className="pos-layout">
            <div className="menu-container">
                <MenuGrid
                    categories={categories}
                    menuItems={menuItems}
                    activeCategory={safeActiveCategory}
                    setActiveCategory={setActiveCategory}
                    addToCart={addToCart}
                />
            </div>

            <OrderSidebar
                cart={cart}
                updateQuantity={updateQuantity}
                clearCart={clearCart}
            />
        </div>
    );
};

export default POS;
