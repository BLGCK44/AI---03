'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop, formatVND } from '@/context/ShopContext';
import Breadcrumb from '@/components/Breadcrumb';

export default function CheckoutPage() {
    const { cart, cartSubtotal, shippingFee, cartGrandTotal, clearCart, addOrder } = useShop();

    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const [orderSuccessData, setOrderSuccessData] = useState(null);

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        if (!fullname.trim() || !phone.trim() || !address.trim()) {
            alert('Vui lòng điền đầy đủ các trường thông tin bắt buộc (*)!');
            return;
        }

        const vnPhoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
        if (!vnPhoneRegex.test(phone.trim())) {
            alert('Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại Việt Nam gồm 10 chữ số (bắt đầu bằng 03, 05, 07, 08, 09).');
            return;
        }

        const randomCode = '#MG-' + Math.floor(100000 + Math.random() * 900000);
        const orderData = {
            code: randomCode,
            customer: fullname.trim(),
            phone: phone.trim(),
            address: address.trim(),
            note: note.trim(),
            payment: paymentMethod === 'cod' ? 'COD (Tiền mặt)' : 'Chuyển khoản QR',
            itemsStr: cart.map(i => `${i.title} (${i.qty})`).join(', '),
            totalFormatted: formatVND(cartGrandTotal),
            status: 'pending'
        };

        addOrder(orderData);
        setOrderSuccessData(orderData);
        clearCart();
    };

    return (
        <main id="main-content">
            <section className="page-banner compact-banner">
                <div className="container">
                    <Breadcrumb items={[
                        { label: 'Giỏ hàng', link: '/cart' },
                        { label: 'Thanh toán đơn hàng' }
                    ]} />
                    <h1 className="page-title">Thanh Toán Đơn Hàng</h1>
                </div>
            </section>

            <section className="checkout-page-section">
                <div className="container" id="checkout-content-wrapper">
                    {cart.length === 0 && !orderSuccessData ? (
                        <div className="empty-cart-state">
                            <div className="empty-cart-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                            </div>
                            <h2>Giỏ Hàng Của Bạn Đang Trống</h2>
                            <p>Bạn cần thêm ít nhất một sản phẩm vào giỏ hàng trước khi tiến hành thanh toán.</p>
                            <Link href="/products" className="btn btn-primary" style={{ marginTop: '10px' }}>
                                <span>Khám phá sản phẩm ngay</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="checkout-grid">
                            {/* Shipping Information Form Column */}
                            <div className="checkout-form-column">
                                <form id="checkout-form" onSubmit={handleSubmitOrder}>
                                    <div className="checkout-card">
                                        <h2 className="card-title">1. Thông Tin Giao Hàng</h2>
                                        <div className="form-group">
                                            <label htmlFor="fullname" className="form-label">Họ và tên người nhận (*)</label>
                                            <input
                                                type="text"
                                                id="fullname"
                                                className="form-control"
                                                placeholder="Ví dụ: Nguyễn Văn An"
                                                value={fullname}
                                                onChange={(e) => setFullname(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="phone" className="form-label">Số điện thoại liên hệ (*)</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                className="form-control"
                                                placeholder="Ví dụ: 0908 123 456"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="address" className="form-label">Địa chỉ nhận hàng chi tiết (*)</label>
                                            <input
                                                type="text"
                                                id="address"
                                                className="form-control"
                                                placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành..."
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="note" className="form-label">Ghi chú cho đơn hàng (không bắt buộc)</label>
                                            <textarea
                                                id="note"
                                                className="form-control"
                                                rows="3"
                                                placeholder="Giao ngoài giờ hành chính, gọi trước khi giao..."
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="checkout-card" style={{ marginTop: '24px' }}>
                                        <h2 className="card-title">2. Phương Thức Thanh Toán</h2>
                                        <div className="payment-options">
                                            <div
                                                className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}
                                                onClick={() => setPaymentMethod('cod')}
                                            >
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    id="pay-cod"
                                                    value="cod"
                                                    checked={paymentMethod === 'cod'}
                                                    onChange={() => setPaymentMethod('cod')}
                                                />
                                                <label htmlFor="pay-cod">
                                                    <strong>Thanh toán khi nhận hàng (COD)</strong>
                                                    <p>Nhận hàng, kiểm tra sản phẩm và thanh toán tiền mặt cho nhân viên giao hàng.</p>
                                                </label>
                                            </div>

                                            <div
                                                className={`payment-option ${paymentMethod === 'qr' ? 'active' : ''}`}
                                                onClick={() => setPaymentMethod('qr')}
                                            >
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    id="pay-qr"
                                                    value="qr"
                                                    checked={paymentMethod === 'qr'}
                                                    onChange={() => setPaymentMethod('qr')}
                                                />
                                                <label htmlFor="pay-qr">
                                                    <strong>Chuyển khoản ngân hàng quét mã QR</strong>
                                                    <p>Chuyển khoản nhanh 24/7 qua ứng dụng ngân hàng hoặc ví điện tử (Momo, ZaloPay).</p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary submit-order-btn" style={{ marginTop: '24px', width: '100%' }}>
                                        <span>Xác Nhận Đặt Hàng ({formatVND(cartGrandTotal)})</span>
                                    </button>
                                </form>
                            </div>

                            {/* Order Items Preview Summary */}
                            <div className="checkout-summary-column">
                                <div className="checkout-card summary-card">
                                    <h2 className="card-title">Đơn Hàng Của Bạn ({cart.length} món)</h2>
                                    <div className="checkout-items-preview">
                                        {cart.map(item => (
                                            <div key={item.id} className="preview-item-row">
                                                <div className="preview-item-info">
                                                    <img src={item.image} alt={item.title} className="preview-item-img" />
                                                    <div>
                                                        <div className="preview-item-title">{item.title}</div>
                                                        <div className="preview-item-qty">Số lượng: {item.qty}</div>
                                                    </div>
                                                </div>
                                                <div className="preview-item-price">{formatVND(item.priceNum * item.qty)}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="summary-divider"></div>

                                    <div className="summary-row">
                                        <span>Tạm tính</span>
                                        <span>{formatVND(cartSubtotal)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Phí vận chuyển</span>
                                        <span className={shippingFee === 0 ? 'text-green' : ''}>
                                            {shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}
                                        </span>
                                    </div>

                                    <div className="summary-divider"></div>

                                    <div className="summary-row total-row">
                                        <span>Tổng tiền</span>
                                        <span className="total-price">{formatVND(cartGrandTotal)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Order Success Modal */}
            {orderSuccessData && (
                <div className="modal-backdrop" style={{ display: 'flex' }}>
                    <div className="modal-box success-modal">
                        <div className="success-icon-box">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h2 className="modal-title">Đặt Hàng Thành Công!</h2>
                        <p className="modal-desc">
                            Cảm ơn bạn đã tin tưởng lựa chọn Shop Sley. Đơn hàng của bạn đã được tiếp nhận và xử lý.
                        </p>

                        <div className="order-details-summary">
                            <div className="info-row">
                                <span>Mã đơn hàng:</span>
                                <strong style={{ color: '#c05621' }}>{orderSuccessData.code}</strong>
                            </div>
                            <div className="info-row">
                                <span>Người nhận:</span>
                                <strong>{orderSuccessData.customer}</strong>
                            </div>
                            <div className="info-row">
                                <span>Số điện thoại:</span>
                                <strong>{orderSuccessData.phone}</strong>
                            </div>
                            <div className="info-row">
                                <span>Địa chỉ nhận:</span>
                                <strong>{orderSuccessData.address}</strong>
                            </div>
                        </div>

                        <div className="modal-actions" style={{ marginTop: '20px' }}>
                            <Link href="/products" className="btn btn-primary">
                                Tiếp tục mua sắm
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
