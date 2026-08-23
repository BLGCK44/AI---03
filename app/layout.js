import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastContainer from "@/components/ToastContainer";

export const metadata = {
  title: "Shop Sley - Đồ Thủ Công & Trang Trí Nhà Cửa",
  description: "Shop Sley chuyên cung cấp bình gốm thủ công, nến thơm đậu nành, thảm Macrame và đồ trang trí phong cách Minimalist Scandinavian.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ShopProvider>
          <Header />
          {children}
          <Footer />
          <ToastContainer />
        </ShopProvider>
      </body>
    </html>
  );
}
