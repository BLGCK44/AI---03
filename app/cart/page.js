'use client';

import React from 'react';
import Link from 'next/link';
import { useShop, formatVND } from '@/context/ShopContext';
import Breadcrumb from '@/components/Breadcrumb';

export default function CartPage() {
    const {
        cart,
        cartCount,
        cartSubtotal,
        shippingFee,
        cartGrandTotal,
        updateCartQty,
        removeCartItem,
        clearCart
    } = useShop();

    return (
        <main id="main-content">
            {/* Page Header Banner */}
            <section className="page-banner compact-banner">
                <div className="container">
                    <Breadcrumb items={[{ label: 'Giỏ hàng' }]} />
                    <h1 className="page-title">Giỏ Hàng Của Bạn</h1>
                </div>
            </section>

            {/* Cart Main Content */}
            <section className="cart-page-section">
                <div className="container" id="cart-content-wrapper">
                    {cart.length === 0 ? (
                        <div className="empty-cart-state">
                            <div className="empty-cart-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                            </div>
                            <h2>Giỏ Hàng Của Bạn Đang Trống</h2>
                            <p>Bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy khám phá các thiết kế gốm mộc, nến thơm và đồ trang trí thủ công tinh tế!</p>
                            <Link href="/products" className="btn btn-primary" style={{ marginTop: '10px' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                                <span>Tiếp tục mua sắm ngay</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="cart-grid">
                            <div className="cart-items-column">
                                <div className="cart-header-row">
                                    <span className="col-product">Sản Phẩm</span>
                                    <span className="col-price">Đơn Giá</span>
                                    <span className="col-qty">Số Lượng</span>
                                    <span className="col-subtotal">Thành Tiền</span>
                                    <span className="col-remove"></span>
                                </div>

                                <div className="cart-items-list">
                                    {cart.map(item => {
                                        const itemSubtotal = item.priceNum * item.qty;
                                        return (
                                            <div key={item.id} className="cart-item-row" data-id={item.id}>
                                                <div className="cart-item-info">
                                                    <img src={item.image} alt={item.title} className="cart-item-img" />
                                                    <div className="cart-item-details">
                                                        <span className="cart-item-cat">{item.category}</span>
                                                        <h3 className="cart-item-title">
                                                            <Link href={`/products/${item.id}`}>{item.title}</Link>
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div className="cart-item-price">{item.priceFormatted}</div>
                                                <div className="cart-qty-selector">
                                                    <button className="cart-qty-btn qty-decrease" onClick={() => updateCartQty(item.id, item.qty - 1)} aria-label="Giảm số lượng">-</button>
                                                    <span className="cart-qty-val">{item.qty}</span>
                                                    <button className="cart-qty-btn qty-increase" onClick={() => updateCartQty(item.id, item.qty + 1)} aria-label="Tăng số lượng">+</button>
                                                </div>
                                                <div className="cart-item-subtotal">{formatVND(itemSubtotal)}</div>
                                                <button className="remove-item-btn" onClick={() => removeCartItem(item.id)} title="Xóa món" aria-label="Xóa sản phẩm">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="3 6 5 6 21 6"></polyline>
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="cart-actions-bar">
                                    <Link href="/products" className="btn btn-secondary">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="19" y1="12" x2="5" y2="12"></line>
                                            <polyline points="12 19 5 12 12 5"></polyline>
                                        </svg>
                                        <span>Tiếp tục mua hàng</span>
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-outline"
                                        onClick={() => {
                                            if (confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
                                                clearCart();
                                            }
                                        }}
                                    >
                                        Xóa tất cả giỏ hàng
                                    </button>
                                </div>
                            </div>

                            <div className="cart-summary-column">
                                <div className="cart-summary-card">
                                    <h2 className="summary-title">Tóm Tắt Đơn Hàng</h2>

                                    <div className="summary-row">
                                        <span>Tạm tính ({cartCount} món)</span>
                                        <span className="summary-val">{formatVND(cartSubtotal)}</span>
                                    </div>

                                    <div className="summary-row">
                                        <span>Phí vận chuyển</span>
                                        <span className={`summary-val ${shippingFee === 0 ? 'text-green' : ''}`}>
                                            {shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}
                                        </span>
                                    </div>

                                    <div className="promo-box">
                                        <input type="text" className="promo-input" placeholder="Mã giảm giá (nếu có)..." aria-label="Mã giảm giá" />
                                        <button type="button" className="btn btn-secondary promo-btn" onClick={() => alert('Mã giảm giá không hợp lệ hoặc đã hết hạn!')}>
                                            Áp dụng
                                        </button>
                                    </div>

                                    <div className="summary-divider"></div>

                                    <div className="summary-row total-row">
                                        <span>Tổng thanh toán</span>
                                        <span className="summary-val total-price">{formatVND(cartGrandTotal)}</span>
                                    </div>

                                    <Link href="/checkout" className="btn btn-primary checkout-btn" id="checkout-btn">
                                        <span>Tiến Hành Thanh Toán</span>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </Link>

                                    <div className="guarantee-box">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                        </svg>
                                        <span>Tự động bảo tồn giỏ hàng qua bộ nhớ trình duyệt (localStorage)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
