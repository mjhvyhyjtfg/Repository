import React, { createContext, useState, useContext, useEffect } from 'react';

// Initial Dummy Data
const initialCategories = [
    { id: 'burgers', name: 'Burgers', icon: '🍔' },
    { id: 'pizzas', name: 'Pizzas', icon: '🍕' },
    { id: 'drinks', name: 'Drinks', icon: '🥤' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
];

const initialMenuItems = [
    { id: 1, category: 'burgers', name: 'Classic Burger', price: 8.99, image: '/images/1.png' },
    { id: 2, category: 'burgers', name: 'Double Cheese', price: 12.99, image: '/images/2.png' },
    { id: 3, category: 'burgers', name: 'Spicy Chicken', price: 10.99, image: '/images/3.png' },
    { id: 4, category: 'pizzas', name: 'Margherita', price: 14.99, image: '/images/4.png' },
    { id: 5, category: 'pizzas', name: 'Pepperoni', price: 16.99, image: '/images/5.png' },
    { id: 6, category: 'drinks', name: 'Cola', price: 2.99, image: '/images/6.png' },
    { id: 7, category: 'drinks', name: 'Iced Tea', price: 3.49, image: '/images/6.png' },
    { id: 8, category: 'desserts', name: 'Cheesecake', price: 6.99, image: '/images/4.png' },
    { id: 9, category: 'desserts', name: 'Brownie', price: 5.99, image: '/images/2.png' },
];

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    // Initialize from localStorage or initial data
    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem('pos_categories');
        return saved ? JSON.parse(saved) : initialCategories;
    });

    const [menuItems, setMenuItems] = useState(() => {
        const saved = localStorage.getItem('pos_menu_items');
        return saved ? JSON.parse(saved) : initialMenuItems;
    });

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('pos_categories', JSON.stringify(categories));
    }, [categories]);

    useEffect(() => {
        localStorage.setItem('pos_menu_items', JSON.stringify(menuItems));
    }, [menuItems]);

    // Categories CRUD
    const addCategory = (category) => {
        setCategories(prev => [...prev, { ...category, id: category.id.toLowerCase().replace(/\s+/g, '-') }]);
    };

    const deleteCategory = (id) => {
        setCategories(prev => prev.filter(c => c.id !== id));
        setMenuItems(prev => prev.filter(item => item.category !== id));
    };

    // Menu Items CRUD
    const addItem = (item) => {
        setMenuItems(prev => [...prev, { ...item, id: Date.now() }]);
    };

    const deleteItem = (id) => {
        setMenuItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <MenuContext.Provider value={{
            categories,
            menuItems,
            addCategory,
            deleteCategory,
            addItem,
            deleteItem
        }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);
