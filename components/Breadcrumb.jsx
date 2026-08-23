import React from 'react';
import Link from 'next/link';

export default function Breadcrumb({ items }) {
    return (
        <nav className="breadcrumb" aria-label="Đường dẫn trang">
            <Link href="/">Trang chủ</Link>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <span className="separator">/</span>
                    {item.link ? (
                        <Link href={item.link}>{item.label}</Link>
                    ) : (
                        <span className="current">{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
}
