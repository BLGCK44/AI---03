'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params?.id || 'p1';
    const { catalog, addToCart, wishlist, toggleWishlist } = useShop();

    const product = catalog[productId] || catalog['p1'];
    const [qty, setQty] = useState(1);

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
                                <span className="badge badge-hot detail-badge">{product.badge || 'Hot'}</span>
                                <img src={product.image} alt={product.title} className="detail-main-img" />
                            </div>
                            <div className="thumb-images-grid">
                                <img src={product.image} alt="Góc chụp 1" className="thumb-img active" />
                                <img src={product.image} alt="Góc chụp 2" className="thumb-img" />
                            </div>
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
                                    <input type="number" className="qty-input" value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value, 10) || 1))} min="1" max="99" readOnly />
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
