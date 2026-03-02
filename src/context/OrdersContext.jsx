import React, { createContext, useState, useContext, useEffect } from 'react';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
    // Initialize from localStorage or empty array
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('pos_orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    // Persist to localStorage whenever orders change
    useEffect(() => {
        localStorage.setItem('pos_orders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (cart, total) => {
        const newOrder = {
            id: `#${Math.floor(1000 + Math.random() * 9000)}`,
            items: cart.reduce((acc, item) => acc + item.quantity, 0),
            total: total,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'completed'
        };
        setOrders(prev => [newOrder, ...prev]);
    };

    const resetDashboard = () => {
        setOrders([]);
        localStorage.removeItem('pos_orders');
    };

    return (
        <OrdersContext.Provider value={{
            orders,
            addOrder,
            resetDashboard
        }}>
            {children}
        </OrdersContext.Provider>
    );
};

export const useOrders = () => useContext(OrdersContext);
