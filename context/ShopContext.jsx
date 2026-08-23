'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

import { createClient } from '@/utils/supabase/client';

const INITIAL_ORDERS = [
    {
        code: '#MG-849201',
        customer: 'Nguyễn Văn An',
        phone: '0908 123 456',
        itemsStr: 'Bình Gốm Mộc, Nến Thơm Amber',
        totalFormatted: '740.000đ',
        payment: 'COD (Tiền mặt)',
        status: 'pending'
    },
    {
        code: '#MG-849200',
        customer: 'Trần Thị Mai',
        phone: '0912 345 678',
        itemsStr: 'Thảm Macrame Dệt Tay',
        totalFormatted: '380.000đ',
        payment: 'Chuyển khoản QR',
        status: 'shipping'
    },
    {
        code: '#MG-849199',
        customer: 'Lê Hoàng Nam',
        phone: '0987 654 321',
        itemsStr: 'Khay Gỗ Sồi Decor Tự Nhiên (x2)',
        totalFormatted: '640.000đ',
        payment: 'Chuyển khoản QR',
        status: 'completed'
    },
    {
        code: '#MG-849198',
        customer: 'Phạm Quỳnh Anh',
        phone: '0933 111 222',
        itemsStr: 'Cốc Gốm Chấm Thổ Cảm (x3)',
        totalFormatted: '540.000đ',
        payment: 'COD (Tiền mặt)',
        status: 'completed'
    }
];

export function formatVND(amount) {
    if (amount === undefined || amount === null) return '';
    return amount.toLocaleString('vi-VN') + 'đ';
}

const ShopContext = createContext();

export function ShopProvider({ children }) {
    const [catalog, setCatalog] = useState({});
    const [categories, setCategories] = useState([]);
    const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState(INITIAL_ORDERS);
    const [toasts, setToasts] = useState([]);

    // Fetch products and categories from Supabase
    useEffect(() => {
        async function fetchFromSupabase() {
            try {
                setIsLoadingCatalog(true);
                const supabase = createClient();

                // 1. Fetch categories
                const { data: catData, error: catErr } = await supabase
                    .from('categories')
                    .select('*')
                    .order('created_at', { ascending: true });

                const catMap = {};
                if (!catErr && catData) {
                    setCategories(catData);
                    catData.forEach(c => {
                        catMap[c.slug] = c.name;
                    });
                }

                // 2. Fetch products
                const { data: prodData, error: prodErr } = await supabase
                    .from('products')
                    .select('*')
                    .order('created_at', { ascending: true });

                if (!prodErr && prodData) {
                    const catalogMap = {};
                    prodData.forEach(item => {
                        catalogMap[item.id] = {
                            id: item.id,
                            title: item.title,
                            category: catMap[item.category_slug] || item.category_slug,
                            catKey: item.category_slug,
                            priceNum: item.price,
                            price: formatVND(item.price),
                            oldPrice: item.old_price ? formatVND(item.old_price) : '',
                            badge: item.badge || '',
                            image: item.image,
                            desc: item.description,
                            reviews: item.reviews_count ? `(${item.reviews_count} đánh giá của khách hàng)` : '(0 đánh giá)',
                            specs: item.specs || {},
                            stock: item.stock_quantity !== undefined && item.stock_quantity !== null ? item.stock_quantity : 50
                        };
                    });
                    setCatalog(catalogMap);
                }

                // 3. Fetch orders
                const { data: orderData, error: orderErr } = await supabase
                    .from('orders')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (!orderErr && orderData && orderData.length > 0) {
                    const mappedOrders = orderData.map(item => ({
                        id: item.id,
                        code: item.code,
                        customer: item.customer_name,
                        phone: item.customer_phone,
                        itemsStr: item.items_summary || item.itemsStr || 'Sản phẩm trang trí & decor',
                        totalAmount: item.total_amount,
                        totalFormatted: formatVND(item.total_amount),
                        payment: item.payment_method || 'COD (Tiền mặt)',
                        status: item.status || 'pending'
                    }));
                    setOrders(mappedOrders);
                }
            } catch (err) {
                console.error('Error fetching Supabase data:', err);
            } finally {
                setIsLoadingCatalog(false);
            }
        }

        fetchFromSupabase();
    }, []);

    // Load state from localStorage on client side mount
    useEffect(() => {
        try {
            const storedCart = localStorage.getItem('moc_gom_cart_v1');
            if (storedCart) setCart(JSON.parse(storedCart));

            const storedWishlist = localStorage.getItem('moc_gom_wishlist_v1');
            if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

            const storedUser = localStorage.getItem('moc_gom_user_session');
            if (storedUser) setUser(JSON.parse(storedUser));
        } catch (e) {
            console.error("Error reading localStorage", e);
        }
    }, []);

    const saveCart = (newCart) => {
        setCart(newCart);
        try {
            localStorage.setItem('moc_gom_cart_v1', JSON.stringify(newCart));
        } catch (e) {
            console.error("Error saving cart", e);
        }
    };

    const saveWishlist = (newWishlist) => {
        setWishlist(newWishlist);
        try {
            localStorage.setItem('moc_gom_wishlist_v1', JSON.stringify(newWishlist));
        } catch (e) {
            console.error("Error saving wishlist", e);
        }
    };

    const showToast = (message) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    const addToCart = (productId, qty = 1) => {
        const item = catalog[productId];
        if (!item) return;

        if (item.stock !== undefined && item.stock <= 0) {
            showToast(`Sản phẩm "${item.title}" hiện đang tạm hết hàng.`);
            return;
        }

        const existingIndex = cart.findIndex(c => c.id === productId);
        let newCart = [...cart];
        if (existingIndex > -1) {
            newCart[existingIndex].qty += qty;
        } else {
            newCart.push({
                id: item.id,
                title: item.title,
                category: item.category,
                priceNum: item.priceNum,
                priceFormatted: item.price,
                image: item.image,
                qty: qty
            });
        }
        saveCart(newCart);
        showToast(`Đã thêm ${qty} x "${item.title}" vào giỏ hàng!`);
    };

    const updateCartQty = (productId, newQty) => {
        if (newQty <= 0) {
            removeCartItem(productId);
        } else {
            const newCart = cart.map(item => item.id === productId ? { ...item, qty: newQty } : item);
            saveCart(newCart);
        }
    };

    const removeCartItem = (productId) => {
        const item = cart.find(c => c.id === productId);
        const newCart = cart.filter(c => c.id !== productId);
        saveCart(newCart);
        if (item) showToast(`Đã xóa "${item.title}" khỏi giỏ hàng.`);
    };

    const clearCart = () => {
        saveCart([]);
    };

    const toggleWishlist = (productId) => {
        const item = catalog[productId] || { title: 'Sản phẩm' };
        let newWishlist = [...wishlist];
        if (newWishlist.includes(productId)) {
            newWishlist = newWishlist.filter(id => id !== productId);
            showToast(`Đã bỏ "${item.title}" khỏi danh sách yêu thích.`);
        } else {
            newWishlist.push(productId);
            showToast(`Đã thêm "${item.title}" vào danh sách yêu thích!`);
        }
        saveWishlist(newWishlist);
    };

    const login = (userData) => {
        setUser(userData);
        try {
            localStorage.setItem('moc_gom_user_session', JSON.stringify(userData));
        } catch (e) {}
    };

    const logout = () => {
        setUser(null);
        try {
            localStorage.removeItem('moc_gom_user_session');
        } catch (e) {}
        showToast('Đã đăng xuất thành công.');
    };

    const saveProduct = async (productObj) => {
        // Update local React state immediately
        setCatalog(prev => ({
            ...prev,
            [productObj.id]: productObj
        }));

        // Persist change to Supabase database
        try {
            const supabase = createClient();
            const payload = {
                id: productObj.id,
                title: productObj.title,
                category_slug: productObj.catKey || 'gom-su',
                price: productObj.priceNum,
                old_price: productObj.oldPrice ? parseInt(productObj.oldPrice.replace(/\D/g, ''), 10) || null : null,
                badge: productObj.badge || '',
                image: productObj.image,
                description: productObj.desc || '',
                specs: productObj.specs || {}
            };

            const { error } = await supabase
                .from('products')
                .upsert(payload, { onConflict: 'id' });

            if (error) {
                console.error('Lỗi khi lưu sản phẩm lên Supabase:', error);
            }
        } catch (err) {
            console.error('Error saving product to Supabase:', err);
        }
    };

    const deleteProduct = async (productId) => {
        const item = catalog[productId];
        setCatalog(prev => {
            const copy = { ...prev };
            delete copy[productId];
            return copy;
        });

        // Delete from Supabase database
        try {
            const supabase = createClient();
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', productId);

            if (error) {
                console.error('Lỗi khi xóa sản phẩm trên Supabase:', error);
            } else if (item) {
                showToast(`Đã xóa sản phẩm "${item.title}" khỏi Supabase.`);
            }
        } catch (err) {
            console.error('Error deleting product from Supabase:', err);
        }
    };

    const updateOrderStatus = async (index, newStatus) => {
        const targetOrder = orders[index];
        setOrders(prev => {
            const next = [...prev];
            next[index] = { ...next[index], status: newStatus };
            return next;
        });

        if (targetOrder) {
            showToast(`Đã cập nhật trạng thái đơn ${targetOrder.code}`);
            try {
                const supabase = createClient();
                await supabase
                    .from('orders')
                    .update({ status: newStatus })
                    .eq('code', targetOrder.code);
            } catch (err) {
                console.error('Error updating order status in Supabase:', err);
            }
        }
    };

    const addOrder = async (newOrderObj) => {
        setOrders(prev => [newOrderObj, ...prev]);

        try {
            const supabase = createClient();
            const payload = {
                code: newOrderObj.code,
                customer_name: newOrderObj.customer,
                customer_phone: newOrderObj.phone,
                items_summary: newOrderObj.itemsStr || 'Sản phẩm trang trí & decor',
                total_amount: newOrderObj.totalAmount || parseInt((newOrderObj.totalFormatted || '').replace(/\D/g, ''), 10) || 0,
                payment_method: newOrderObj.payment || 'COD (Tiền mặt)',
                status: newOrderObj.status || 'pending'
            };

            const { error } = await supabase.from('orders').insert([payload]);
            if (error) {
                console.error('Error inserting order to Supabase:', error);
            }
        } catch (err) {
            console.error('Error adding order to Supabase:', err);
        }
    };

    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartSubtotal = cart.reduce((sum, item) => sum + item.priceNum * item.qty, 0);
    const shippingFee = cartSubtotal >= 500000 || cartSubtotal === 0 ? 0 : 30000;
    const cartGrandTotal = cartSubtotal + shippingFee;

    return (
        <ShopContext.Provider value={{
            catalog,
            categories,
            isLoadingCatalog,
            cart,
            cartCount,
            cartSubtotal,
            shippingFee,
            cartGrandTotal,
            addToCart,
            updateCartQty,
            removeCartItem,
            clearCart,

            wishlist,
            wishlistCount: wishlist.length,
            toggleWishlist,

            user,
            login,
            logout,

            orders,
            updateOrderStatus,
            addOrder,

            saveProduct,
            deleteProduct,

            toasts,
            showToast
        }}>
            {children}
        </ShopContext.Provider>
    );
}

export function useShop() {
    return useContext(ShopContext);
}
