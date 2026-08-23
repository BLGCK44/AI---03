'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
    const { catalog } = useShop();
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

                    <div className="products-grid">
                        {productList.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
