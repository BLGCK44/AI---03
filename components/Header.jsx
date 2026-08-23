'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { cartCount, wishlistCount, user, logout } = useShop();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault();
        if (searchValue.trim().length > 0) {
            router.push(`/products?search=${encodeURIComponent(searchValue.trim())}`);
        }
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    let userActionEl = (
        <Link href="/login" className={`icon-action-btn ${pathname === '/login' ? 'active' : ''}`} title="Đăng nhập / Tài khoản">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        </Link>
    );

    if (user && user.role === 'admin') {
        userActionEl = (
            <Link href="/admin" className="admin-header-badge-btn" title="Khu Quản Trị Admin">
                <span>🔑 Admin</span>
            </Link>
        );
    } else if (user && user.name) {
        userActionEl = (
            <div className="user-logged-box" title={user.name}>
                <span className="user-greeting-text">Chào, <strong>{user.name.split(' ').pop()}</strong></span>
                <button type="button" className="user-logout-small-btn" onClick={logout} title="Đăng xuất">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                </button>
            </div>
        );
    }

    return (
        <header className="site-header">
            {/* Announcement Top Bar */}
            <div className="top-announcement-bar">
                <div className="container announcement-content">
                    <span>Miễn phí giao hàng cho đơn hàng từ 500.000đ</span>
                    <span className="divider">•</span>
                    <span>Hotline tư vấn: <strong>0908 123 456</strong></span>
                </div>
            </div>

            {/* Main Navigation Header */}
            <div className="main-navbar-wrapper">
                <div className="container main-navbar">
                    {/* Brand Logo */}
                    <Link href="/" className="brand-logo" aria-label="Trang chủ Shop Sley">
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

                    {/* Desktop Navigation Links */}
                    <nav className="desktop-nav" aria-label="Menu chính">
                        <ul className="nav-list">
                            <li><Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Trang chủ</Link></li>
                            <li><Link href="/products" className={`nav-link ${pathname === '/products' ? 'active' : ''}`}>Sản phẩm</Link></li>
                            <li><Link href="/wishlist" className={`nav-link ${pathname === '/wishlist' ? 'active' : ''}`}>Yêu thích</Link></li>
                            <li><Link href="/#about" className="nav-link">Giới thiệu</Link></li>
                            <li><Link href="/#contact" className="nav-link">Liên hệ</Link></li>
                        </ul>
                    </nav>

                    {/* Search Bar & User Actions */}
                    <div className="nav-actions">
                        {/* Search Box */}
                        <form className="search-box" onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Tìm sản phẩm gốm, nến..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyDown={handleSearchKeyDown}
                                aria-label="Tìm kiếm sản phẩm"
                            />
                            <button type="submit" className="search-btn" aria-label="Tìm kiếm">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                        </form>

                        {/* User Account Icon / Session Button */}
                        {userActionEl}

                        {/* Wishlist Link with Counter */}
                        <Link href="/wishlist" className={`icon-action-btn wishlist-header-btn ${pathname === '/wishlist' ? 'active' : ''}`} title="Xem yêu thích">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            <span className="cart-badge wishlist-badge">{wishlistCount}</span>
                        </Link>

                        {/* Cart Link with Counter */}
                        <Link href="/cart" className={`icon-action-btn cart-btn ${pathname === '/cart' ? 'active' : ''}`} title="Xem giỏ hàng">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            <span className="cart-badge">{cartCount}</span>
                        </Link>

                        {/* Mobile Hamburger Button */}
                        <button className="mobile-menu-toggle" onClick={() => setIsDrawerOpen(true)} aria-label="Mở menu di động">
                            <svg className="hamburger-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Slide-out Mobile Menu Navigation */}
            <div className={`mobile-nav-drawer ${isDrawerOpen ? 'is-open' : ''}`}>
                <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}></div>
                <div className="drawer-content">
                    <div className="drawer-header">
                        <span className="drawer-title">Danh Mục Menu</span>
                        <button className="drawer-close-btn" onClick={() => setIsDrawerOpen(false)} aria-label="Đóng menu">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <nav className="mobile-nav-links">
                        <Link href="/" className={`mobile-nav-link ${pathname === '/' ? 'active' : ''}`} onClick={() => setIsDrawerOpen(false)}>Trang chủ</Link>
                        <Link href="/products" className={`mobile-nav-link ${pathname === '/products' ? 'active' : ''}`} onClick={() => setIsDrawerOpen(false)}>Tất cả sản phẩm</Link>
                        <Link href="/wishlist" className={`mobile-nav-link ${pathname === '/wishlist' ? 'active' : ''}`} onClick={() => setIsDrawerOpen(false)}>Sản phẩm yêu thích</Link>
                        <Link href="/cart" className={`mobile-nav-link ${pathname === '/cart' ? 'active' : ''}`} onClick={() => setIsDrawerOpen(false)}>Giỏ hàng của bạn</Link>
                        <Link href="/login" className={`mobile-nav-link ${pathname === '/login' ? 'active' : ''}`} onClick={() => setIsDrawerOpen(false)}>Đăng nhập / Đăng ký</Link>
                        <Link href="/#about" className="mobile-nav-link" onClick={() => setIsDrawerOpen(false)}>Câu chuyện thương hiệu</Link>
                        <Link href="/#contact" className="mobile-nav-link" onClick={() => setIsDrawerOpen(false)}>Liên hệ & Cửa hàng</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
