'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop, formatVND } from '@/context/ShopContext';
import { createClient } from '@/utils/supabase/client';

export default function AdminPage() {
    const router = useRouter();
    const { catalog, orders, user, logout, saveProduct, deleteProduct, updateOrderStatus, showToast } = useShop();

    const [isMounted, setIsMounted] = useState(false);
    const hasRedirectedRef = useRef(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            if (!user || user.role !== 'admin') {
                if (!hasRedirectedRef.current) {
                    hasRedirectedRef.current = true;
                    showToast('Vui lòng đăng nhập quyền Quản trị viên để truy cập!');
                    router.push('/login');
                }
            }
        }
    }, [isMounted, user, router, showToast]);

    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'products', 'orders'

    const [adminSearch, setAdminSearch] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [editId, setEditId] = useState('');
    const [formTitle, setFormTitle] = useState('');
    const [formCategory, setFormCategory] = useState('Gốm Sứ Thủ Công');
    const [formBadge, setFormBadge] = useState('Mới');
    const [formPrice, setFormPrice] = useState('');
    const [formOldPrice, setFormOldPrice] = useState('');
    const [formImage, setFormImage] = useState('/assets/binh-gom-tho-cam.jpg');
    const [formDesc, setFormDesc] = useState('');

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            showToast('Đang xử lý ảnh tải lên...');
            const supabase = createClient();
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
            const filePath = `product_images/${fileName}`;

            const { data, error } = await supabase.storage
                .from('products')
                .upload(filePath, file);

            if (!error && data) {
                const { data: publicUrlData } = supabase.storage.from('products').getPublicUrl(filePath);
                if (publicUrlData?.publicUrl) {
                    setFormImage(publicUrlData.publicUrl);
                    showToast('Đã tải ảnh lên Supabase Storage thành công!');
                    return;
                }
            }

            // Fallback: Read file as Data URL
            const reader = new FileReader();
            reader.onload = (evt) => {
                if (evt.target?.result) {
                    setFormImage(evt.target.result);
                    showToast('Đã chọn ảnh sản phẩm thành công!');
                }
            };
            reader.readAsDataURL(file);
        } catch (err) {
            console.error('Upload error:', err);
        }
    };

    if (!isMounted || !user || user.role !== 'admin') {
        return (
            <div style={{ textAlign: 'center', padding: '100px 20px', color: '#64748B' }}>
                <h2>Đang kiểm tra quyền truy cập...</h2>
                <p>Bạn sẽ được tự động chuyển hướng đến trang đăng nhập nếu chưa có quyền Quản trị viên.</p>
            </div>
        );
    }

    const openAddModal = () => {
        setEditId('');
        setFormTitle('');
        setFormCategory('Gốm Sứ Thủ Công');
        setFormBadge('Mới');
        setFormPrice('');
        setFormOldPrice('');
        setFormImage('/assets/binh-gom-tho-cam.jpg');
        setFormDesc('');
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditId(item.id);
        setFormTitle(item.title);
        setFormCategory(item.category);
        setFormBadge(item.badge || 'Mới');
        setFormPrice(item.priceNum || '');
        setFormOldPrice(item.oldPrice ? parseInt(item.oldPrice.replace(/\D/g, ''), 10) || '' : '');
        setFormImage(item.image);
        setFormDesc(item.desc || '');
        setModalOpen(true);
    };

    const handleSaveProduct = (e) => {
        e.preventDefault();
        if (!formTitle.trim() || !formPrice) return;

        const priceNum = parseInt(formPrice, 10) || 0;
        const oldPriceVal = formOldPrice ? parseInt(formOldPrice, 10) || 0 : 0;

        let catKey = 'gom-su';
        if (formCategory === 'Nến Thơm Tự Nhiên') catKey = 'nen-thom';
        if (formCategory === 'Thảm Macrame' || formCategory === 'Đồ Trang Trí Dệt') catKey = 'do-det';
        if (formCategory === 'Đồ Gỗ Decor') catKey = 'do-go';

        const targetId = editId || ('p_' + Date.now());

        const productObj = {
            id: targetId,
            title: formTitle.trim(),
            category: formCategory,
            catKey: catKey,
            priceNum: priceNum,
            price: formatVND(priceNum),
            oldPrice: oldPriceVal ? formatVND(oldPriceVal) : '',
            badge: formBadge,
            image: formImage.trim() || '/assets/binh-gom-tho-cam.jpg',
            desc: formDesc.trim() || 'Sản phẩm decor thủ công cao cấp.',
            reviews: '(0 đánh giá)',
            specs: { material: 'Thủ công', size: 'Tiêu chuẩn' }
        };

        saveProduct(productObj);
        setModalOpen(false);
        showToast(editId ? `Đã cập nhật sản phẩm "${formTitle}"!` : `Đã thêm mới sản phẩm "${formTitle}"!`);
    };

    const catalogArray = Object.values(catalog);
    const filteredProducts = catalogArray.filter(p => {
        if (!adminSearch) return true;
        const q = adminSearch.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    });

    return (
        <div className="admin-body">
            <div className="admin-wrapper">
                {/* Admin Sidebar Navigation */}
                <aside className="admin-sidebar">
                    <div className="admin-brand">
                        <svg className="admin-logo-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 24C12 18 16 13 22 12C21 17 18 22 12 24Z" fill="currentColor"/>
                            <path d="M24 12C24 18 20 23 14 24C15 19 18 14 24 12Z" fill="currentColor" opacity="0.6"/>
                        </svg>
                        <div className="brand-text">
                            <span className="name">SHOP SLEY</span>
                            <span className="role-badge">ADMIN DASHBOARD</span>
                        </div>
                    </div>

                    <nav className="admin-nav" id="admin-sidebar-nav">
                        <button
                            type="button"
                            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                            <span>Tổng quan báo cáo</span>
                        </button>
                        <button
                            type="button"
                            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
                            onClick={() => setActiveTab('products')}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                            <span>Quản lý sản phẩm</span>
                        </button>
                        <button
                            type="button"
                            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                            <span>Quản lý đơn hàng</span>
                        </button>
                        <Link href="/" className="admin-nav-item">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            <span>Xem website cửa hàng</span>
                        </Link>
                    </nav>

                    <div className="admin-sidebar-footer">
                        <div className="admin-profile">
                            <div className="avatar-box">A</div>
                            <div className="profile-info">
                                <span className="p-name">{user?.name || 'Quản Trị Viên'}</span>
                                <span className="p-email">{user?.email || 'admin@shopsley.vn'}</span>
                            </div>
                        </div>
                        <button type="button" className="admin-logout-btn" onClick={() => { logout(); router.push('/login'); }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            <span>Đăng xuất</span>
                        </button>
                    </div>
                </aside>

                {/* Admin Main Content Area */}
                <main className="admin-main">
                    {/* TAB 1: OVERVIEW */}
                    {activeTab === 'overview' && (
                        <div className="admin-tab-view active">
                            <header className="admin-topbar">
                                <div className="admin-page-title">
                                    <h1>Tổng Quan Kinh Doanh</h1>
                                    <p>Theo dõi các chỉ số doanh thu, số lượng đơn hàng và khách hàng của Shop Sley.</p>
                                </div>
                                <div className="admin-actions">
                                    <Link href="/" className="btn btn-secondary">Xem cửa hàng</Link>
                                    <button className="btn btn-primary" onClick={() => { setActiveTab('products'); openAddModal(); }}>
                                        + Thêm sản phẩm mới
                                    </button>
                                </div>
                            </header>

                            <div className="admin-stats-grid">
                                <div className="admin-stat-card">
                                    <div className="stat-icon revenue-bg">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-label">Doanh thu tháng này</span>
                                        <span className="stat-val">24.500.000đ</span>
                                        <span className="stat-trend trend-up">↑ +18% so với tháng trước</span>
                                    </div>
                                </div>

                                <div className="admin-stat-card">
                                    <div className="stat-icon orders-bg">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-label">Tổng đơn hàng</span>
                                        <span className="stat-val">{orders.length} đơn</span>
                                        <span className="stat-trend trend-up">↑ +12 đơn mới hôm nay</span>
                                    </div>
                                </div>

                                <div className="admin-stat-card">
                                    <div className="stat-icon products-bg">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-label">Sản phẩm trong kho</span>
                                        <span className="stat-val">{catalogArray.length} mẫu</span>
                                        <span className="stat-trend">Đang kinh doanh</span>
                                    </div>
                                </div>

                                <div className="admin-stat-card">
                                    <div className="stat-icon users-bg">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-label">Khách hàng đăng ký</span>
                                        <span className="stat-val">120 thành viên</span>
                                        <span className="stat-trend trend-up">↑ +5 thành viên mới</span>
                                    </div>
                                </div>
                            </div>

                            <div className="admin-card-section">
                                <div className="admin-card-header">
                                    <h2>Đơn Hàng Gần Đây</h2>
                                    <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('orders')}>Xem tất cả đơn hàng &rarr;</button>
                                </div>
                                <div className="table-responsive">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>MÃ ĐƠN</th>
                                                <th>KHÁCH HÀNG</th>
                                                <th>SẢN PHẨM</th>
                                                <th>TỔNG TIỀN</th>
                                                <th>TRẠNG THÁI</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.slice(0, 4).map((order, idx) => (
                                                <tr key={idx}>
                                                    <td><strong className="code-highlight">{order.code}</strong></td>
                                                    <td>
                                                        <div className="cust-info">
                                                            <span className="cust-name">{order.customer}</span>
                                                            <span className="cust-phone">{order.phone}</span>
                                                        </div>
                                                    </td>
                                                    <td>{order.itemsStr}</td>
                                                    <td><strong className="price-val">{order.totalFormatted}</strong></td>
                                                    <td>
                                                        {order.status === 'pending' && <span className="status-badge badge-pending">Chờ xử lý</span>}
                                                        {order.status === 'shipping' && <span className="status-badge badge-shipping">Đang giao</span>}
                                                        {order.status === 'completed' && <span className="status-badge badge-completed">Hoàn thành</span>}
                                                        {order.status === 'cancelled' && <span className="status-badge badge-cancelled">Đã hủy</span>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: PRODUCT MANAGEMENT */}
                    {activeTab === 'products' && (
                        <div className="admin-tab-view active">
                            <header className="admin-topbar">
                                <div className="admin-page-title">
                                    <h1>Quản Lý Danh Mục Sản Phẩm</h1>
                                    <p>Thêm mới, chỉnh sửa thông tin hoặc xóa các sản phẩm đồ thủ công & decor.</p>
                                </div>
                                <div className="admin-actions">
                                    <button className="btn btn-primary" onClick={openAddModal}>+ Thêm Sản Phẩm Mới</button>
                                </div>
                            </header>

                            <div className="admin-card-section">
                                <div className="admin-table-toolbar">
                                    <div className="search-box">
                                        <input
                                            type="text"
                                            className="search-input"
                                            placeholder="Tìm tên sản phẩm..."
                                            value={adminSearch}
                                            onChange={(e) => setAdminSearch(e.target.value)}
                                        />
                                    </div>
                                    <span className="toolbar-info">Tổng cộng: <strong>{filteredProducts.length}</strong> sản phẩm</span>
                                </div>

                                <div className="table-responsive">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>SẢN PHẨM</th>
                                                <th>DANH MỤC</th>
                                                <th>GIÁ BÁN (VND)</th>
                                                <th>GIÁ GỐC</th>
                                                <th>NHÃN (BADGE)</th>
                                                <th>THAO TÁC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProducts.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: 'center', color: '#94A3B8', padding: '24px' }}>
                                                        Không tìm thấy sản phẩm nào.
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredProducts.map(item => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <div className="product-title-cell">
                                                                <img src={item.image} alt={item.title} className="admin-product-thumb" />
                                                                <span className="product-cell-name">{item.title}</span>
                                                            </div>
                                                        </td>
                                                        <td>{item.category}</td>
                                                        <td><strong className="price-val">{item.price}</strong></td>
                                                        <td><span style={{ color: '#94A3B8', textDecoration: 'line-through' }}>{item.oldPrice || '-'}</span></td>
                                                        <td><span className="badge badge-hot">{item.badge || 'Mới'}</span></td>
                                                        <td>
                                                            <div className="action-btns-group">
                                                                <button type="button" className="btn-edit-prod" onClick={() => openEditModal(item)}>Sửa</button>
                                                                <button type="button" className="btn-delete-prod" onClick={() => {
                                                                    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${item.title}"?`)) {
                                                                        deleteProduct(item.id);
                                                                    }
                                                                }}>Xóa</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 3: ORDER MANAGEMENT */}
                    {activeTab === 'orders' && (
                        <div className="admin-tab-view active">
                            <header className="admin-topbar">
                                <div className="admin-page-title">
                                    <h1>Quản Lý Đơn Hàng Cửa Hàng</h1>
                                    <p>Theo dõi và cập nhật trạng thái các đơn hàng của khách hàng.</p>
                                </div>
                            </header>

                            <div className="admin-card-section">
                                <div className="table-responsive">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>MÃ ĐƠN</th>
                                                <th>KHÁCH HÀNG</th>
                                                <th>SẢN PHẨM MUA</th>
                                                <th>TỔNG TIỀN</th>
                                                <th>THANH TOÁN</th>
                                                <th>TRẠNG THÁI</th>
                                                <th>HÀNH ĐỘNG</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order, idx) => (
                                                <tr key={idx}>
                                                    <td><strong className="code-highlight">{order.code}</strong></td>
                                                    <td>
                                                        <div className="cust-info">
                                                            <span className="cust-name">{order.customer}</span>
                                                            <span className="cust-phone">{order.phone}</span>
                                                        </div>
                                                    </td>
                                                    <td>{order.itemsStr}</td>
                                                    <td><strong className="price-val">{order.totalFormatted}</strong></td>
                                                    <td>{order.payment}</td>
                                                    <td>
                                                        <select
                                                            className="status-badge-select"
                                                            value={order.status}
                                                            onChange={(e) => updateOrderStatus(idx, e.target.value)}
                                                        >
                                                            <option value="pending">Chờ xử lý</option>
                                                            <option value="shipping">Đang giao</option>
                                                            <option value="completed">Hoàn thành</option>
                                                            <option value="cancelled">Đã hủy</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <button className="btn-sm btn-outline" onClick={() => alert(`Xem chi tiết đơn ${order.code}`)}>Chi tiết</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Add / Edit Product Modal */}
            {modalOpen && (
                <div className="modal-overlay" style={{ display: 'flex' }}>
                    <div className="modal-card admin-modal-card">
                        <div className="modal-header-row">
                            <h2 className="modal-title">{editId ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h2>
                            <button type="button" className="close-modal-btn" onClick={() => setModalOpen(false)}>&times;</button>
                        </div>

                        <form className="modal-form" onSubmit={handleSaveProduct}>
                            <div className="form-group">
                                <label className="form-label">Tên sản phẩm <span className="required">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ví dụ: Bình Gốm Hoa Hỏa Biến"
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Danh mục <span className="required">*</span></label>
                                    <select className="form-control" value={formCategory} onChange={(e) => setFormCategory(e.target.value)} required>
                                        <option value="Gốm Sứ Thủ Công">Gốm Sứ Thủ Công</option>
                                        <option value="Nến Thơm Tự Nhiên">Nến Thơm Tự Nhiên</option>
                                        <option value="Đồ Trang Trí Dệt">Thảm Macrame</option>
                                        <option value="Đồ Gỗ Decor">Đồ Gỗ Decor</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Nhãn sản phẩm</label>
                                    <select className="form-control" value={formBadge} onChange={(e) => setFormBadge(e.target.value)}>
                                        <option value="Mới">Mới</option>
                                        <option value="Bán chạy">Bán chạy</option>
                                        <option value="Hot">Hot</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Giá bán (VND) <span className="required">*</span></label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="450000"
                                        value={formPrice}
                                        onChange={(e) => setFormPrice(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Giá cũ (nếu có giảm giá)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="520000"
                                        value={formOldPrice}
                                        onChange={(e) => setFormOldPrice(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Ảnh sản phẩm <span className="required">*</span></label>
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên file hoặc URL ảnh (/assets/binh-gom-tho-cam.jpg)..."
                                        value={formImage}
                                        onChange={(e) => setFormImage(e.target.value)}
                                        required
                                    />
                                    <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
                                        📁 Tải ảnh lên
                                        <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                                    </label>
                                </div>
                                {formImage && (
                                    <div style={{ marginTop: '6px' }}>
                                        <img src={formImage} alt="Xem trước" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Mô tả ngắn sản phẩm</label>
                                <textarea
                                    className="form-control textarea-control"
                                    rows="3"
                                    placeholder="Mô tả chất liệu, kiểu dáng sản phẩm..."
                                    value={formDesc}
                                    onChange={(e) => setFormDesc(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="modal-footer-btns">
                                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Hủy bỏ</button>
                                <button type="submit" className="btn btn-primary">Lưu Sản Phẩm</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
