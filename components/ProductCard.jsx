'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';

export default function ProductCard({ product }) {
    const { addToCart, wishlist, toggleWishlist } = useShop();

    if (!product) return null;

    const isFav = wishlist.includes(product.id);

    return (
        <article className="product-card">
            <div className="product-image-box">
                <div className="product-badge-group">
                    <span className={`badge ${product.badge === 'Mới' ? 'badge-new' : 'badge-hot'}`}>{product.badge || 'Hot'}</span>
                </div>
                <button
                    type="button"
                    className={`wishlist-btn ${isFav ? 'active' : ''}`}
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Thêm vào yêu thích"
                    title="Yêu thích"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill={isFav ? '#e53e3e' : 'none'}
                        stroke={isFav ? '#e53e3e' : 'currentColor'}
                        strokeWidth="2"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                <Link href={`/products/${product.id}`}>
                    <img src={product.image} alt={product.title} className="product-img" loading="lazy" />
                </Link>
            </div>
            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">
                    <Link href={`/products/${product.id}`}>{product.title}</Link>
                </h3>
                <div className="product-price-row">
                    <span className="price-current">{product.price}</span>
                    {product.oldPrice && <span className="price-old">{product.oldPrice}</span>}
                </div>
                <div className="product-card-actions">
                    <Link href={`/products/${product.id}`} className="btn btn-outline btn-detail">Xem chi tiết</Link>
                    <button
                        type="button"
                        className="add-to-cart-btn icon-only-cart"
                        onClick={() => addToCart(product.id, 1)}
                        title="Thêm vào giỏ"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    );
}
