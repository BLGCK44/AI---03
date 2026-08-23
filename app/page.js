'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
    const { catalog, isLoadingCatalog } = useShop();
    const productList = Object.values(catalog).slice(0, 6);

    return (
        <main id="main-content">
            {/* 1. Hero Banner Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-card">
                        <div className="hero-text-content">
                            <span className="hero-tag">Bộ Sưu Tập Thu Đông 2026</span>
                            <h1 className="hero-title">Thủ Công & <span>Không Gian Sống</span> Tinh Tế</h1>
                            <p className="hero-description">
                                Khám phá các sản phẩm gốm mộc, nến thơm tự nhiên và đồ trang trí dệt tay được chế tác tỉ mỉ, mang lại cảm giác ấm áp và bình yên cho ngôi nhà của bạn.
                            </p>
                            <div className="hero-cta-group">
                                <Link href="/products" className="btn btn-primary">Khám phá ngay</Link>
                                <Link href="/products" className="btn btn-secondary">Xem bộ sưu tập</Link>
                            </div>
                        </div>
                        <div className="hero-image-wrapper">
                            <img src="/assets/hero-banner.jpg" alt="Không gian sống mộc mạc với sản phẩm trang trí thủ công" className="hero-img" loading="eager" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Brand Value Highlights Section */}
            <section className="values-section">
                <div className="container">
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon-box">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <div className="value-info">
                                <h3 className="value-title">100% Thủ Công Tinh Xảo</h3>
                                <p className="value-desc">Mỗi sản phẩm đều được làm thủ công tỉ mỉ bởi các nghệ nhân lành nghề.</p>
                            </div>
                        </div>

                        <div className="value-card">
                            <div className="value-icon-box">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"></path>
                                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                                </svg>
                            </div>
                            <div className="value-info">
                                <h3 className="value-title">Nguyên Liệu Tự Nhiên</h3>
                                <p className="value-desc">Sử dụng đất sét mộc, sáp đậu nành thực vật và gỗ tự nhiên thân thiện môi trường.</p>
                            </div>
                        </div>

                        <div className="value-card">
                            <div className="value-icon-box">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <rect x="1" y="3" width="15" height="13" rx="2"></rect>
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                                </svg>
                            </div>
                            <div className="value-info">
                                <h3 className="value-title">Đóng Gói & Giao Tận Nơi</h3>
                                <p className="value-desc">Đóng hộp quà tặng chống sốc cẩn thận, đảm bảo sản phẩm nguyên vẹn đến tay bạn.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Featured Products Grid Section */}
            <section className="featured-section" id="featured-products">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">SẢN PHẨM CHỌN LỌC</span>
                        <h2 className="section-title">Đồ Decor Nổi Bật</h2>
                    </div>

                    {isLoadingCatalog ? (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
                            <p>Đang tải danh sách sản phẩm từ Supabase...</p>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {productList.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* 4. Brand Story Section (#about) */}
            <section className="about-home-section" id="about" style={{ padding: '60px 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '36px', alignItems: 'center' }}>
                        <div>
                            <span className="section-subtitle" style={{ color: '#C05621' }}>CÂU CHUYỆN THƯƠNG HIỆU</span>
                            <h2 className="section-title" style={{ fontSize: '26px', marginTop: '6px', marginBottom: '16px' }}>Về Shop Sley & Nghệ Thuật Mộc Mạc</h2>
                            <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '16px' }}>
                                Shop Sley được truyền cảm hứng từ khát khao mang không gian sống ấm áp, tinh tế và gần gũi với thiên nhiên đến từng gia đình Việt.
                            </p>
                            <Link href="/about" className="btn btn-primary btn-sm">Xem chi tiết câu chuyện</Link>
                        </div>
                        <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                            <img src="/assets/hero-banner.jpg" alt="Về Shop Sley" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Quick Contact Section (#contact) */}
            <section className="contact-home-section" id="contact" style={{ padding: '60px 0', borderTop: '1px solid #E2E8F0' }}>
                <div className="container">
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <span className="section-subtitle">GHÉ THĂM CỬA HÀNG</span>
                        <h2 className="section-title">Liên Hệ & Showroom Shop Sley</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                        <div style={{ padding: '24px', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>📍 Địa Chỉ Showroom</h3>
                            <p style={{ color: '#64748B', margin: 0, fontSize: '14px' }}>123 Phố Cổ, Q. Hoàn Kiếm, Hà Nội</p>
                        </div>

                        <div style={{ padding: '24px', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>📞 Hotline Tư Vấn</h3>
                            <p style={{ color: '#64748B', margin: 0, fontSize: '14px' }}>0908 123 456 (08:00 - 21:30)</p>
                        </div>

                        <div style={{ padding: '24px', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>✉️ Email Hỗ Trợ</h3>
                            <p style={{ color: '#64748B', margin: 0, fontSize: '14px' }}>contact@shopsley.vn</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
