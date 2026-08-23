'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        alert('Cảm ơn bạn đã đăng ký nhận bản tin từ Shop Sley!');
    };

    return (
        <footer className="site-footer">
            <div className="container footer-content-grid">
                {/* Brand Info Column */}
                <div className="footer-col brand-col">
                    <Link href="/" className="brand-logo footer-logo">
                        <svg className="logo-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 24C12 18 16 13 22 12C21 17 18 22 12 24Z" fill="currentColor"/>
                            <path d="M24 12C24 18 20 23 14 24C15 19 18 14 24 12Z" fill="currentColor" opacity="0.6"/>
                        </svg>
                        <div className="logo-text">
                            <span className="brand-name">SHOP SLEY</span>
                            <span className="brand-tagline">Decor & Handicraft</span>
                        </div>
                    </Link>
                    <p className="brand-description">
                        Shop Sley chuyên cung cấp các sản phẩm trang trí nội thất thủ công tinh tế từ gốm mộc, gỗ tự nhiên và sợi cotton thiên nhiên. Mang hơi thở bình yên vào không gian sống của bạn.
                    </p>
                </div>

                {/* Navigation Quick Links */}
                <div className="footer-col links-col">
                    <h3 className="footer-heading">Danh Mục</h3>
                    <ul className="footer-links-list">
                        <li><Link href="/products?cat=gom-su">Gốm Sứ Thổ Cảm</Link></li>
                        <li><Link href="/products?cat=nen-thom">Nến Thơm Đậu Nành</Link></li>
                        <li><Link href="/products?cat=do-det">Thảm Macrame Dệt Tay</Link></li>
                        <li><Link href="/products?cat=do-go">Khay Gỗ Decor</Link></li>
                        <li><Link href="/products">Bộ Sưu Tập Mới</Link></li>
                    </ul>
                </div>

                {/* Contact Info Column */}
                <div className="footer-col contact-col">
                    <h3 className="footer-heading">Liên Hệ</h3>
                    <ul className="footer-contact-list">
                        <li>
                            <svg className="contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>123 Phố Cổ, Q. Hoàn Kiếm, Hà Nội</span>
                        </li>
                        <li>
                            <svg className="contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span>0908 123 456</span>
                        </li>
                        <li>
                            <svg className="contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <span>contact@shopsley.vn</span>
                        </li>
                    </ul>
                </div>

                {/* Newsletter Column */}
                <div className="footer-col newsletter-col">
                    <h3 className="footer-heading">Đăng Ký Nhận Ưu Đãi</h3>
                    <p className="newsletter-subtext">Nhận ngay voucher giảm giá 10% cho đơn hàng đầu tiên và cập nhật mẫu decor mới nhất.</p>
                    <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                        <input type="email" className="newsletter-input" placeholder="Nhập email của bạn..." required aria-label="Địa chỉ email" />
                        <button type="submit" className="btn btn-primary newsletter-btn">Đăng ký</button>
                    </form>
                </div>
            </div>

            {/* Copyright Bottom Sub-footer */}
            <div className="sub-footer">
                <div className="container sub-footer-content">
                    <p className="copyright-text">© 2026 Shop Sley. Tất cả quyền được bảo lưu.</p>
                    <div className="policy-links">
                        <a href="#">Chính sách bảo mật</a>
                        <a href="#">Điều khoản dịch vụ</a>
                        <a href="#">Chính sách đổi trả</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
