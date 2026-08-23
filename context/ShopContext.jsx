'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const INITIAL_CATALOG = {
    'p1': {
        id: 'p1',
        title: 'Bình Gốm Mộc Thổ Cảm',
        category: 'Gốm Sứ Thủ Công',
        catKey: 'gom-su',
        priceNum: 450000,
        price: '450.000đ',
        oldPrice: '520.000đ',
        badge: 'Bán chạy',
        image: '/assets/binh-gom-tho-cam.jpg',
        desc: 'Bình gốm mộc được chế tác thủ công 100% từ đất sét nung tự nhiên với bề mặt nhám thô mộc thổ cảm. Thích hợp cắm hoa pampas, cành khô trang trí phòng khách và bàn làm việc.',
        reviews: '(24 đánh giá của khách hàng)',
        specs: {
            material: 'Đất sét nung tự nhiên, phủ men thổ cảm mộc',
            size: '18 cm (Rộng) x 25 cm (Cao)'
        }
    },
    'p2': {
        id: 'p2',
        title: 'Nến Thơm Đậu Nành Amber',
        category: 'Nến Thơm Tự Nhiên',
        catKey: 'nen-thom',
        priceNum: 290000,
        price: '290.000đ',
        oldPrice: '',
        badge: 'Mới',
        image: '/assets/nen-thom-dau-nanh.jpg',
        desc: 'Nến thơm từ 100% sáp đậu nành thực vật nguyên chất kết hợp tinh dầu thiên nhiên (Hổ phách & Gỗ đàn hương). Hũ thuỷ tinh amber nắp gỗ tinh tế, thời gian đốt lên đến 45 giờ.',
        reviews: '(18 đánh giá của khách hàng)',
        specs: {
            material: 'Sáp đậu nành thực vật, hũ thuỷ tinh hổ phách, nắp gỗ sồi',
            size: 'Trọng lượng: 220g (Thời gian đốt ~45h)'
        }
    },
    'p3': {
        id: 'p3',
        title: 'Thảm Macrame Dệt Tay',
        category: 'Đồ Trang Trí Dệt',
        catKey: 'do-det',
        priceNum: 380000,
        price: '380.000đ',
        oldPrice: '450.000đ',
        badge: 'Hot',
        image: '/assets/tham-macrame.jpg',
        desc: 'Thảm treo tường dệt tay phong cách Bohemian được đan tỉ mỉ từ sợi cotton mộc tự nhiên gắn trên cành gỗ mộc. Điểm nhấn hoàn hảo cho mảng tường phòng ngủ và góc đọc sách.',
        reviews: '(31 đánh giá của khách hàng)',
        specs: {
            material: 'Sợi cotton mộc 100%, cành gỗ tự nhiên',
            size: '40 cm (Rộng) x 70 cm (Dài)'
        }
    },
    'p4': {
        id: 'p4',
        title: 'Khay Gỗ Sồi Decor Tự Nhiên',
        category: 'Đồ Gỗ Decor',
        catKey: 'do-go',
        priceNum: 320000,
        price: '320.000đ',
        oldPrice: '',
        badge: 'Mới',
        image: '/assets/khay-go-decor.jpg',
        desc: 'Khay gỗ sồi nguyên khối cắt gọt đường nét bo tròn mềm mại, bề mặt xử lý dầu lau thực vật an toàn. Dùng đựng nến thơm, hũ gốm hoặc phục vụ trà chiều tinh tế.',
        reviews: '(14 đánh giá của khách hàng)',
        specs: {
            material: 'Gỗ sồi nhập khẩu cao cấp, lau dầu thực vật',
            size: '30 cm x 20 cm x 2.5 cm'
        }
    },
    'p5': {
        id: 'p5',
        title: 'Cốc Gốm Chấm Thổ Cảm',
        category: 'Gốm Sứ Thủ Công',
        catKey: 'gom-su',
        priceNum: 180000,
        price: '180.000đ',
        oldPrice: '',
        badge: 'Bán chạy',
        image: '/assets/coc-gom-tho-cam.jpg',
        desc: 'Cốc gốm xoay tay hoạ tiết chấm thủ công màu kem sữa ấm áp. Men hỏa biến tự nhiên cho cảm giác cầm nắm chắc tay, dùng uống cà phê, trà chiều thư giãn.',
        reviews: '(42 đánh giá của khách hàng)',
        specs: {
            material: 'Gốm men hỏa biến tự nhiên',
            size: 'Dung tích: 350ml'
        }
    },
    'p6': {
        id: 'p6',
        title: 'Bình Gốm Dáng Cổ Thô Mộc',
        category: 'Gốm Sứ Thủ Công',
        catKey: 'gom-su',
        priceNum: 520000,
        price: '520.000đ',
        oldPrice: '',
        badge: 'Mới',
        image: '/assets/binh-gom-tho-cam.jpg',
        desc: 'Bình gốm thủ công dáng cổ điển với chất men thô nhám độc bản, tạo vẻ đẹp vượt thời gian cho không gian sống hiện đại.',
        reviews: '(9 đánh giá của khách hàng)',
        specs: {
            material: 'Đất sét thô mộc nung nhiệt độ cao',
            size: '20 cm x 30 cm'
        }
    },
    'p7': {
        id: 'p7',
        title: 'Nến Thơm Gỗ Tuyết Tùng',
        category: 'Nến Thơm Tự Nhiên',
        catKey: 'nen-thom',
        priceNum: 340000,
        price: '340.000đ',
        oldPrice: '390.000đ',
        badge: 'Hot',
        image: '/assets/nen-thom-dau-nanh.jpg',
        desc: 'Nến thơm hương gỗ tuyết tùng và thông ấm áp, mang không khí rừng nguyên sinh thanh bình vào căn phòng của bạn.',
        reviews: '(22 đánh giá của khách hàng)',
        specs: {
            material: 'Sáp thực vật, bấc gỗ nhập khẩu',
            size: 'Trọng lượng: 250g'
        }
    },
    'p8': {
        id: 'p8',
        title: 'Khay Gỗ Tròn Decor Trà',
        category: 'Đồ Gỗ Decor',
        catKey: 'do-go',
        priceNum: 260000,
        price: '260.000đ',
        oldPrice: '',
        badge: 'Mới',
        image: '/assets/khay-go-decor.jpg',
        desc: 'Khay gỗ tròn thiết kế tối giản, hoa văn vân gỗ sồi tự nhiên sang trọng.',
        reviews: '(16 đánh giá của khách hàng)',
        specs: {
            material: 'Gỗ sồi nguyên khối',
            size: 'Đường kính: 25 cm'
        }
    }
};

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
    return (amount || 0).toLocaleString('vi-VN') + 'đ';
}

const ShopContext = createContext();

export function ShopProvider({ children }) {
    const [catalog, setCatalog] = useState(INITIAL_CATALOG);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState(INITIAL_ORDERS);
    const [toasts, setToasts] = useState([]);

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
        const item = catalog[productId] || INITIAL_CATALOG[productId];
        if (!item) return;

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
        const item = catalog[productId] || INITIAL_CATALOG[productId] || { title: 'Sản phẩm' };
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

    const saveProduct = (productObj) => {
        setCatalog(prev => ({
            ...prev,
            [productObj.id]: productObj
        }));
    };

    const deleteProduct = (productId) => {
        const item = catalog[productId];
        setCatalog(prev => {
            const copy = { ...prev };
            delete copy[productId];
            return copy;
        });
        if (item) showToast(`Đã xóa sản phẩm "${item.title}" khỏi cửa hàng.`);
    };

    const updateOrderStatus = (index, newStatus) => {
        setOrders(prev => {
            const next = [...prev];
            next[index] = { ...next[index], status: newStatus };
            return next;
        });
        showToast(`Đã cập nhật trạng thái đơn ${orders[index]?.code}`);
    };

    const addOrder = (newOrderObj) => {
        setOrders(prev => [newOrderObj, ...prev]);
    };

    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartSubtotal = cart.reduce((sum, item) => sum + item.priceNum * item.qty, 0);
    const shippingFee = cartSubtotal >= 500000 || cartSubtotal === 0 ? 0 : 30000;
    const cartGrandTotal = cartSubtotal + shippingFee;

    return (
        <ShopContext.Provider value={{
            catalog,
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
