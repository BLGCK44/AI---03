'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params?.id || 'p1';
    const { catalog, addToCart, wishlist, toggleWishlist, showToast } = useShop();

    const product = catalog[productId] || catalog['p1'];
    const [qty, setQty] = useState(1);
    const [ratingStars, setRatingStars] = useState('5');

    const defaultReviews = [
        {
            id: 1,
            name: 'Nguyễn Thị Thu',
            rating: 5,
            date: '2 ngày trước',
            comment: 'Sản phẩm hoàn thiện rất tỉ mỉ, đóng gói cẩn thận chống sốc 3 lớp. Rất hài lòng!'
        },
        {
            id: 2,
            name: 'Trần Văn Hoàng',
            rating: 5,
            date: '1 tuần trước',
            comment: 'Gốm mộc màu tự nhiên rất đẹp, để góc bàn làm việc ngắm thư giãn vô cùng.'
        }
    ];

    const [reviewsList, setReviewsList] = useState(defaultReviews);

    // Load saved reviews from localStorage on client mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(`moc_gom_reviews_${productId}`);
            if (stored) {
                setReviewsList(JSON.parse(stored));
            } else {
                setReviewsList(defaultReviews);
            }
        } catch (e) {}
    }, [productId]);

    const saveReview = (newReview) => {
        setReviewsList(prev => {
            const updated = [newReview, ...prev];
            try {
                localStorage.setItem(`moc_gom_reviews_${productId}`, JSON.stringify(updated));
            } catch (e) {}
            return updated;
        });
    };

    if (!product) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <h2>Không tìm thấy sản phẩm</h2>
                <Link href="/products" className="btn btn-primary" style={{ marginTop: '16px' }}>Xem danh sách sản phẩm</Link>
            </div>
        );
    }

    const isFav = wishlist.includes(product.id);
    const relatedProducts = Object.values(catalog).filter(p => p.id !== product.id).slice(0, 4);

    return (
        <main id="main-content">
            {/* Page Breadcrumb Section */}
            <section className="page-banner compact-banner">
                <div className="container">
                    <Breadcrumb items={[
                        { label: 'Tất cả sản phẩm', link: '/products' },
                        { label: product.title }
                    ]} />
                </div>
            </section>

            {/* Product Detail Main Section */}
            <section className="product-detail-section">
                <div className="container">
                    <div className="product-detail-layout">
                        {/* Left Gallery Images */}
                        <div className="product-gallery">
                            <div className="main-image-box">
                                {product.badge && <span className={`badge ${product.badge === 'Mới' ? 'badge-new' : 'badge-hot'} detail-badge`}>{product.badge}</span>}
                                <img src={product.image} alt={product.title} className="detail-main-img" />
                            </div>
                            {product.images && product.images.length > 1 && (
                                <div className="thumb-images-grid">
                                    {product.images.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            alt={`Góc chụp ${idx + 1}`}
                                            className={`thumb-img ${idx === 0 ? 'active' : ''}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Product Information */}
                        <div className="product-details-content">
                            <span className="product-category-tag">{product.category}</span>
                            <h1 className="product-detail-title">{product.title}</h1>

                            <div className="product-detail-rating">
                                <span className="stars-svg">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                </span>
                                <span className="rating-count">{product.reviews || '(24 đánh giá)'}</span>
                            </div>

                            <div className="product-detail-price-box">
                                <span className="detail-price-current">{product.price}</span>
                                {product.oldPrice && <span className="detail-price-old">{product.oldPrice}</span>}
                            </div>

                            <p className="product-short-desc">{product.desc}</p>

                            <div className="specs-list">
                                <div className="spec-item">
                                    <strong className="spec-label">Chất liệu:</strong>
                                    <span>{product.specs?.material || 'Thủ công mộc tự nhiên'}</span>
                                </div>
                                <div className="spec-item">
                                    <strong className="spec-label">Kích thước:</strong>
                                    <span>{product.specs?.size || 'Tiêu chuẩn'}</span>
                                </div>
                            </div>

                            {/* Quantity & CTA Button Group */}
                            <div className="product-cta-row">
                                <div className="quantity-selector">
                                    <button type="button" className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                                    <input
                                        type="number"
                                        className="qty-input"
                                        value={qty}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value, 10);
                                            setQty(isNaN(val) || val < 1 ? 1 : val);
                                        }}
                                        min="1"
                                        max="99"
                                    />
                                    <button type="button" className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-primary detail-add-cart-btn"
                                    onClick={() => addToCart(product.id, qty)}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                        <line x1="3" y1="6" x2="21" y2="6"></line>
                                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                                    </svg>
                                    <span>Thêm Vào Giỏ Hàng</span>
                                </button>

                                <button
                                    type="button"
                                    className={`detail-wishlist-btn ${isFav ? 'active' : ''}`}
                                    onClick={() => toggleWishlist(product.id)}
                                    title="Lưu yêu thích"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill={isFav ? '#e53e3e' : 'none'} stroke={isFav ? '#e53e3e' : 'currentColor'} strokeWidth="2">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customer Reviews Section */}
            <section className="reviews-section" style={{ padding: '40px 0', borderTop: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '24px' }}>
                        <span className="section-subtitle">ĐÁNH GIÁ TỪ KHÁCH HÀNG</span>
                        <h2 className="section-title">Nhận Xét & Đánh Giá Sản Phẩm</h2>
                    </div>

                    <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'start' }}>
                        {/* Write a Review Form */}
                        <div className="review-form-card" style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1E293B' }}>Viết Đánh Giá Của Bạn</h3>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target;
                                const name = form.reviewerName.value.trim();
                                const comment = form.reviewerComment.value.trim();
                                if (!name || !comment) return;

                                saveReview({
                                    id: Date.now(),
                                    name,
                                    rating: parseInt(ratingStars, 10),
                                    date: 'Vừa xong',
                                    comment
                                });

                                form.reset();
                                showToast('Cảm ơn bạn đã gửi đánh giá sản phẩm!');
                            }}>
                                <div className="form-group" style={{ marginBottom: '12px' }}>
                                    <label className="form-label" style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Đánh giá của bạn (*)</label>
                                    <select
                                        className="form-control"
                                        value={ratingStars}
                                        onChange={(e) => setRatingStars(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                                    >
                                        <option value="5">⭐⭐⭐⭐⭐ (5/5 sao - Rất hài lòng)</option>
                                        <option value="4">⭐⭐⭐⭐ (4/5 sao - Hài lòng)</option>
                                        <option value="3">⭐⭐⭐ (3/5 sao - Bình thường)</option>
                                        <option value="2">⭐⭐ (2/5 sao - Chưa hài lòng)</option>
                                        <option value="1">⭐ (1/5 sao - Rất kém)</option>
                                    </select>
                                </div>

                                <div className="form-group" style={{ marginBottom: '12px' }}>
                                    <label className="form-label" style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Họ và tên (*)</label>
                                    <input
                                        type="text"
                                        name="reviewerName"
                                        className="form-control"
                                        placeholder="Ví dụ: Nguyễn Thị Mai"
                                        required
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                                    />
                                </div>

                                <div className="form-group" style={{ marginBottom: '16px' }}>
                                    <label className="form-label" style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Nội dung nhận xét (*)</label>
                                    <textarea
                                        name="reviewerComment"
                                        className="form-control"
                                        rows="3"
                                        placeholder="Chia sẻ cảm nhận thực tế của bạn về chất liệu, đóng gói và kiểu dáng..."
                                        required
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                    Gửi Đánh Giá Ngay
                                </button>
                            </form>
                        </div>

                        {/* Customer Reviews List */}
                        <div className="reviews-list-card" style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1E293B' }}>
                                Nhận Xét Đã Gửi ({reviewsList.length})
                            </h3>
                            <div className="reviews-items" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {reviewsList.map(rev => (
                                    <div key={rev.id} style={{ borderBottom: '1px dashed #E2E8F0', paddingBottom: '12px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                            <strong style={{ color: '#0F172A', fontSize: '15px' }}>{rev.name}</strong>
                                            <span style={{ color: '#94A3B8', fontSize: '12px' }}>{rev.date}</span>
                                        </div>
                                        <div style={{ color: '#F59E0B', fontSize: '14px', marginBottom: '6px' }}>
                                            {'⭐'.repeat(rev.rating)}
                                        </div>
                                        <p style={{ color: '#475569', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
                                            {rev.comment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products Section */}
            <section className="related-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">BỘ SƯU TẬP TƯƠNG TỰ</span>
                        <h2 className="section-title">Có Thể Bạn Cũng Thích</h2>
                    </div>

                    <div className="products-grid">
                        {relatedProducts.map(relProd => (
                            <ProductCard key={relProd.id} product={relProd} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
