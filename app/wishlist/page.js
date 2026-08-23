'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';

export default function WishlistPage() {
    const { catalog, wishlist } = useShop();

    const wishlistProducts = wishlist
        .map(id => catalog[id])
        .filter(Boolean);

    return (
        <main id="main-content">
            <section className="page-banner compact-banner">
                <div className="container">
                    <Breadcrumb items={[{ label: 'Sản phẩm yêu thích' }]} />
                    <h1 className="page-title">Sản Phẩm Yêu Thích</h1>
                </div>
            </section>

            <section className="wishlist-page-section">
                <div className="container" id="wishlist-content-wrapper">
                    {wishlistProducts.length === 0 ? (
                        <div className="empty-wishlist-state">
                            <div className="empty-wishlist-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="#e53e3e" stroke="#e53e3e">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </div>
                            <h2>Chưa Có Sản Phẩm Yêu Thích</h2>
                            <p>Bạn chưa thả tim lưu sản phẩm nào. Hãy khám phá các thiết kế gốm mộc, nến thơm và đồ trang trí thủ công tinh tế!</p>
                            <Link href="/products" className="btn btn-primary" style={{ marginTop: '10px' }}>
                                <span>Khám phá sản phẩm ngay</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {wishlistProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
