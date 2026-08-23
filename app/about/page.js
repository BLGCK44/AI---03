'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export default function AboutPage() {
    return (
        <main id="main-content">
            {/* Banner Section */}
            <section className="page-banner">
                <div className="container">
                    <Breadcrumb items={[{ label: 'Giới thiệu & Câu chuyện thương hiệu' }]} />
                    <h1 className="page-title">Về Shop Sley</h1>
                    <p className="page-subtitle">Hơi thở thủ công mộc mạc mang lại sự bình yên và tinh tế cho không gian sống hiện đại.</p>
                </div>
            </section>

            {/* Main Brand Story Content */}
            <section className="about-content-section" style={{ padding: '60px 0' }}>
                <div className="container">
                    {/* Block 1: Story Intro */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center', marginBottom: '60px' }}>
                        <div>
                            <span style={{ color: '#C05621', textTransform: 'uppercase', fontSize: '13px', fontWeight: '700', letterSpacing: '1px' }}>HÀNH TRÌNH THỦ CÔNG</span>
                            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1E293B', marginTop: '8px', marginBottom: '16px' }}>Từ Đất Sét Mộc Đến Những Không Gian Ấm Áp</h2>
                            <p style={{ color: '#475569', lineHeight: '1.8', marginBottom: '16px' }}>
                                <strong>Shop Sley</strong> được thành lập từ tình yêu sâu sắc với các vật liệu tự nhiên và nghệ thuật thủ công truyền thống Việt Nam. Chúng tôi tin rằng một ngôi nhà đẹp không chỉ cần nội thất hiện đại, mà còn cần những vật dụng có "hồn" — mang cảm giác thô mộc, ấm áp và thư thái.
                            </p>
                            <p style={{ color: '#475569', lineHeight: '1.8' }}>
                                Mỗi bình gốm xoay tay, mỗi cốc men hỏa biến, hũ nến thơm sáp đậu nành hay chiếc thảm dệt Macrame tại Shop Sley đều được chế tác tỉ mỉ bởi các nghệ nhân giàu kinh nghiệm tại các làng nghề truyền thống.
                            </p>
                        </div>
                        <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
                            <img src="/assets/hero-banner.jpg" alt="Không gian làm việc thủ công" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                    </div>

                    {/* Block 2: Core Values Grid */}
                    <div style={{ background: '#F8FAFC', padding: '48px 32px', borderRadius: '20px', marginBottom: '60px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <span style={{ color: '#C05621', fontSize: '13px', fontWeight: '700', letterSpacing: '1px' }}>TRIẾT LÝ SẢN XUẤT</span>
                            <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#1E293B', marginTop: '6px' }}>Giá Trị Cốt Lõi Tại Shop Sley</h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                            <div style={{ background: '#fff', padding: '28px', borderRadius: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FFEDD5', color: '#C05621', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0F172A', marginBottom: '8px' }}>100% Thủ Công Tinh Xảo</h3>
                                <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Không sản xuất công nghiệp đại mass, mỗi tác phẩm là một độc bản riêng biệt có đường vân độc đáo.</p>
                            </div>

                            <div style={{ background: '#fff', padding: '28px', borderRadius: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"></path></svg>
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0F172A', marginBottom: '8px' }}>Nguyên Liệu Lành Tính</h3>
                                <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Đất sét nung tự nhiên, sáp đậu nành thực vật nguyên chất, gỗ sồi nhập khẩu và bấc nến gỗ thơm nức.</p>
                            </div>

                            <div style={{ background: '#fff', padding: '28px', borderRadius: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon></svg>
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0F172A', marginBottom: '8px' }}>Đóng Gói An Toàn 100%</h3>
                                <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Đóng hộp chống sốc 3 lớp cẩn thận, cam kết đổi mới 1:1 nếu có bất kỳ vỡ hỏng trong quá trình vận chuyển.</p>
                            </div>
                        </div>
                    </div>

                    {/* Block 3: Call to Action */}
                    <div style={{ textAlign: 'center', padding: '40px 20px', background: '#1E293B', borderRadius: '16px', color: '#fff' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>Sẵn Sàng Trang Trí Cho Ngôi Nhà Của Bạn?</h2>
                        <p style={{ color: '#94A3B8', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
                            Khám phá các thiết kế mới nhất trong Bộ sưu tập Gốm mộc, Nến thơm và Đồ gỗ decor thủ công của Shop Sley.
                        </p>
                        <Link href="/products" className="btn btn-primary">
                            Khám phá tất cả sản phẩm
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
