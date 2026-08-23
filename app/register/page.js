'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import Breadcrumb from '@/components/Breadcrumb';

export default function RegisterPage() {
    const router = useRouter();
    const { login, showToast } = useShop();

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Mật khẩu nhập lại không trùng khớp! Vui lòng kiểm tra lại.');
            return;
        }

        login({
            name: fullname.trim() || 'Khách Hàng',
            email: email.trim(),
            role: 'user'
        });

        showToast('Đăng ký tài khoản thành công!');
        setTimeout(() => { router.push('/'); }, 500);
    };

    return (
        <main id="main-content">
            <section className="page-banner compact-banner">
                <div className="container">
                    <Breadcrumb items={[{ label: 'Đăng ký tài khoản' }]} />
                    <h1 className="page-title">Đăng Ký Tài Khoản</h1>
                </div>
            </section>

            <section className="auth-page-section">
                <div className="container">
                    <div className="auth-box">
                        <div className="auth-header">
                            <h2>Tạo Tài Khoản Mới</h2>
                            <p>Tham gia gia đình Mộc & Gốm Studio để nhận ngay ưu đãi hấp dẫn.</p>
                        </div>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="reg-fullname" className="form-label">Họ và tên (*)</label>
                                <input
                                    type="text"
                                    id="reg-fullname"
                                    className="form-control"
                                    placeholder="Ví dụ: Nguyễn Văn An"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reg-email" className="form-label">Địa chỉ Email (*)</label>
                                <input
                                    type="email"
                                    id="reg-email"
                                    className="form-control"
                                    placeholder="yourname@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reg-password" className="form-label">Mật khẩu (*)</label>
                                <input
                                    type="password"
                                    id="reg-password"
                                    className="form-control"
                                    placeholder="Nhập mật khẩu..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reg-confirm-password" className="form-label">Xác nhận mật khẩu (*)</label>
                                <input
                                    type="password"
                                    id="reg-confirm-password"
                                    className="form-control"
                                    placeholder="Nhập lại mật khẩu..."
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary auth-submit-btn">
                                Tạo Tài Khoản
                            </button>
                        </form>

                        <div className="auth-footer-link">
                            Đã có tài khoản? <Link href="/login">Đăng nhập tại đây</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
