'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';

function ProductsContent() {
    const { catalog, categories, isLoadingCatalog } = useShop();
    const searchParams = useSearchParams();

    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('default');

    useEffect(() => {
        const search = searchParams.get('search');
        if (search) {
            setSearchQuery(search.trim().toLowerCase());
        }
        const cat = searchParams.get('cat');
        if (cat) {
            setActiveCategory(cat);
        }
    }, [searchParams]);

    const allProducts = Object.values(catalog);

    // Filtering logic
    const filteredProducts = allProducts.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.catKey === activeCategory;
        const query = searchQuery.toLowerCase();
        const matchesSearch = !searchQuery || item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    // Sorting logic
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === 'price-asc') return a.priceNum - b.priceNum;
        if (sortOption === 'price-desc') return b.priceNum - a.priceNum;
        if (sortOption === 'popular') return (b.priceNum % 100) - (a.priceNum % 100);
        return 0;
    });

    const ITEMS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, searchQuery, sortOption]);

    const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = sortedProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const resetFilters = () => {
        setActiveCategory('all');
        setSearchQuery('');
        setSortOption('default');
        setCurrentPage(1);
    };

    const categoryList = categories.length > 0 ? categories : [
        { slug: 'gom-su', name: 'Gốm Sứ Thủ Công' },
        { slug: 'nen-thom', name: 'Nến Thơm Tự Nhiên' },
        { slug: 'do-det', name: 'Thảm Macrame' },
        { slug: 'do-go', name: 'Đồ Gỗ Decor' }
    ];

    return (
        <main id="main-content">
            {/* 1. Page Header & Breadcrumb Banner */}
            <section className="page-banner">
                <div className="container">
                    <Breadcrumb items={[{ label: 'Tất cả sản phẩm' }]} />
                    <h1 className="page-title">Sản Phẩm Thủ Công & Decor</h1>
                    <p className="page-subtitle">Khám phá các thiết kế gốm mộc, nến thơm tự nhiên và đồ trang trí tinh tế cho không gian sống của bạn.</p>
                </div>
            </section>

            {/* 2. Products Section with Filters & Grid */}
            <section className="products-page-section">
                <div className="container">
                    {/* Filter & Search Control Bar */}
                    <div className="filter-sort-bar">
                        {/* Live Search Box */}
                        <div className="product-search-input-wrapper">
                            <svg className="search-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input
                                type="text"
                                className="product-search-input"
                                placeholder="Tìm kiếm theo tên sản phẩm (gốm, nến, thảm, khay...)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Tìm kiếm sản phẩm"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    className="clear-search-btn"
                                    onClick={() => setSearchQuery('')}
                                    style={{ display: 'block' }}
                                    title="Xóa tìm kiếm"
                                >
                                    &times;
                                </button>
                            )}
                        </div>

                        {/* Category Filter Tabs & Sorting */}
                        <div className="filter-controls-row">
                            <div className="category-tabs">
                                <button
                                    className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
                                    onClick={() => setActiveCategory('all')}
                                >
                                    Tất cả ({allProducts.length})
                                </button>
                                {categoryList.map(cat => (
                                    <button
                                        key={cat.slug}
                                        className={`category-tab ${activeCategory === cat.slug ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(cat.slug)}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>

                            {/* Sorting Dropdown */}
                            <div className="sort-wrapper">
                                <label htmlFor="sort-select" className="sort-label">Sắp xếp:</label>
                                <select
                                    id="sort-select"
                                    className="sort-select"
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    aria-label="Sắp xếp sản phẩm"
                                >
                                    <option value="default">Mới nhất</option>
                                    <option value="price-asc">Giá: Thấp đến Cao</option>
                                    <option value="price-desc">Giá: Cao đến Thấp</option>
                                    <option value="popular">Bán chạy nhất</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Loading state */}
                    {isLoadingCatalog && (
                        <div style={{ textAlign: 'center', padding: '50px 0', color: '#666' }}>
                            <p>Đang tải danh sách sản phẩm từ Supabase...</p>
                        </div>
                    )}

                    {/* No Results State Message */}
                    {!isLoadingCatalog && sortedProducts.length === 0 && (
                        <div className="no-results-msg" style={{ display: 'flex' }}>
                            <div className="no-results-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    <line x1="8" y1="11" x2="14" y2="11"></line>
                                </svg>
                            </div>
                            <h3>Không tìm thấy sản phẩm phù hợp</h3>
                            <p>Thử tìm kiếm với từ khóa khác hoặc chọn danh mục "Tất cả".</p>
                            <button className="btn btn-primary" onClick={resetFilters} style={{ marginTop: '12px' }}>
                                Xem tất cả sản phẩm
                            </button>
                        </div>
                    )}

                    {/* Products Grid */}
                    {!isLoadingCatalog && sortedProducts.length > 0 && (
                        <>
                            <div className="products-grid">
                                {paginatedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="pagination-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '40px' }}>
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                                    >
                                        &laquo; Trang trước
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            type="button"
                                            className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline'}`}
                                            onClick={() => setCurrentPage(page)}
                                            style={{ minWidth: '36px' }}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                                    >
                                        Trang sau &raquo;
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>Đang tải danh sách sản phẩm...</div>}>
            <ProductsContent />
        </Suspense>
    );
}
