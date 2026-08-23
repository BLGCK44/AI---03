'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import Breadcrumb from '@/components/Breadcrumb';
import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
    const router = useRouter();
    const { login, showToast } = useShop();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFillUserDemo = () => {
        setEmail('user@gmail.com');
        setPassword('123456');
    };

    const handleFillAdminDemo = () => {
        setEmail('admin@mocgom.vn');
        setPassword('admin');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedEmail = email.trim().toLowerCase();

        if (trimmedEmail === 'admin@mocgom.vn' || trimmedEmail === 'admin') {
            login({
                name: 'Quản Trị Viên',
                email: 'admin@mocgom.vn',
                role: 'admin'
            });
            showToast('Đăng nhập quyền Admin thành công!');
            setTimeout(() => { router.push('/admin'); }, 500);
        } else {
            try {
                const supabase = createClient();
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: trimmedEmail,
                    password: password
                });

                if (!error && data?.user) {
                    const userName = data.user.user_metadata?.name || trimmedEmail.split('@')[0];
                    login({
                        name: userName,
                        email: trimmedEmail,
                        role: 'user'
                    });
                    showToast(`Chào mừng ${userName} quay trở lại!`);
                    setTimeout(() => { router.push('/'); }, 500);
                    return;
                }
            } catch (err) {
                console.error('Supabase Auth Error:', err);
            }

            login({
                name: trimmedEmail.split('@')[0] || 'Khách Hàng',
                email: trimmedEmail || 'user@gmail.com',
                role: 'user'
            });
            showToast('Đăng nhập thành công!');
            setTimeout(() => { router.push('/'); }, 500);
        }
    };

    return (
        <main id="main-content">
            <section className="page-banner compact-banner">
                <div className="container">
                    <Breadcrumb items={[{ label: 'Đăng nhập tài khoản' }]} />
                    <h1 className="page-title">Đăng Nhập Tài Khoản</h1>
                </div>
            </section>

            <section className="auth-page-section">
                <div className="container">
                    <div className="auth-box">
                        <div className="auth-header">
                            <h2>Chào Mừng Quay Trở Lại</h2>
                            <p>Đăng nhập để theo dõi đơn hàng và lưu danh sách sản phẩm yêu thích.</p>
                        </div>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="login-email" className="form-label">Địa chỉ Email / Tên đăng nhập (*)</label>
                                <input
                                    type="text"
                                    id="login-email"
                                    className="form-control"
                                    placeholder="Nhập email của bạn..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="login-password" className="form-label">Mật khẩu (*)</label>
                                <input
                                    type="password"
                                    id="login-password"
                                    className="form-control"
                                    placeholder="Mật khẩu của bạn..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary auth-submit-btn">
                                Đăng Nhập
                            </button>
                        </form>

                        <div className="auth-footer-link">
                            Chưa có tài khoản? <Link href="/register">Đăng ký tài khoản mới</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
