'use client';

import React, { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { useShop } from '@/context/ShopContext';

export default function ContactPage() {
    const { showToast } = useShop();

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmitContact = (e) => {
        e.preventDefault();
        if (!fullname.trim() || !email.trim() || !message.trim()) return;

        showToast('Cảm ơn bạn! Thông tin liên hệ đã được gửi thành công. Đội ngũ tư vấn sẽ phản hồi trong 2 giờ.');
        setFullname('');
        setEmail('');
        setPhone('');
        setMessage('');
    };

    return (
        <main id="main-content">
            {/* Banner Section */}
            <section className="page-banner">
                <div className="container">
                    <Breadcrumb items={[{ label: 'Liên hệ & Cửa hàng' }]} />
                    <h1 className="page-title">Liên Hệ & Ghé Thăm Showroom</h1>
                    <p className="page-subtitle">Shop Sley luôn sẵn sàng lắng nghe và tư vấn giải pháp trang trí tốt nhất cho không gian sống của bạn.</p>
                </div>
            </section>

            {/* Contact Layout Section */}
            <section className="contact-page-section" style={{ padding: '60px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
                        {/* Left Column: Contact Cards & Info */}
                        <div>
                            <span style={{ color: '#C05621', fontSize: '13px', fontWeight: '700', letterSpacing: '1px' }}>THÔNG TIN SHOWROOM</span>
                            <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#1E293B', marginTop: '6px', marginBottom: '24px' }}>Kết Nối Với Shop Sley</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', background: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#FFEDD5', color: '#C05621', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    </div>
                                    <div>
                                        <strong style={{ display: 'block', fontSize: '15px', color: '#0F172A' }}>Địa Chỉ Cửa Hàng:</strong>
                                        <span style={{ color: '#64748B', fontSize: '14px' }}>123 Phố Cổ, Q. Hoàn Kiếm, Hà Nội</span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', background: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                    </div>
                                    <div>
                                        <strong style={{ display: 'block', fontSize: '15px', color: '#0F172A' }}>Hotline Tư Vấn:</strong>
                                        <span style={{ color: '#64748B', fontSize: '14px' }}>0908 123 456 (Hỗ trợ 24/7)</span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', background: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    </div>
                                    <div>
                                        <strong style={{ display: 'block', fontSize: '15px', color: '#0F172A' }}>Email Hỗ Trợ:</strong>
                                        <span style={{ color: '#64748B', fontSize: '14px' }}>contact@shopsley.vn</span>
                                    </div>
                                </div>
                            </div>

                            {/* Map Preview Box */}
                            <div style={{ background: '#E2E8F0', height: '220px', borderRadius: '14px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <div style={{ textAlign: 'center', color: '#475569', padding: '20px' }}>
                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 8px', display: 'block', color: '#C05621' }}>
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    <strong style={{ display: 'block', fontSize: '16px', color: '#1E293B' }}>Bản Đồ Vị Trí Showroom Hà Nội</strong>
                                    <span style={{ fontSize: '13px' }}>123 Phố Cổ, Q. Hoàn Kiếm, Hà Nội</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Contact Message Form */}
                        <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>Gửi Tin Nhắn Tư Vấn</h3>
                            <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '24px' }}>Vui lòng điền thông tin bên dưới, nhân viên chăm sóc khách hàng của Shop Sley sẽ liên hệ phản hồi bạn sớm nhất.</p>

                            <form onSubmit={handleSubmitContact}>
                                <div className="form-group" style={{ marginBottom: '16px' }}>
                                    <label className="form-label" style={{ display: 'block', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>Họ và tên (*)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ví dụ: Nguyễn Văn An"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        required
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                                    />
                                </div>

                                <div className="form-group" style={{ marginBottom: '16px' }}>
                                    <label className="form-label" style={{ display: 'block', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>Địa chỉ Email (*)</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="youremail@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                                    />
                                </div>

                                <div className="form-group" style={{ marginBottom: '16px' }}>
                                    <label className="form-label" style={{ display: 'block', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>Số điện thoại liên hệ</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Ví dụ: 0908 123 456"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                                    />
                                </div>

                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label className="form-label" style={{ display: 'block', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>Nội dung cần tư vấn (*)</label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        placeholder="Nhập câu hỏi hoặc yêu cầu tư vấn mẫu decor của bạn..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
                                    Gửi Tin Nhắn Tư Vấn
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
