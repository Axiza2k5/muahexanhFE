# MuaHeXanh Frontend

Giao diện của chiến dịch "Mùa hè xanh" được xây dựng với Vite + React + TypeScript và Tailwind CSS.

## 1. Yêu cầu môi trường
- **Node.js**: Phiên bản 18+ (khuyên dùng)
- **NPM**

## 2. Cài đặt các gói phụ thuộc (Dependencies)
Mở terminal tại thư mục gốc của dự án (`muahexanhFE`) và chạy lệnh sau để tải các thư viện cần thiết:
```bash
npm install
```

## 3. Chạy dự án (Môi trường Development)
Để khởi chạy ứng dụng với livereload ở môi trường dev:
```bash
npm run dev
```
Ứng dụng sẽ mặc định có thể truy cập tại: `http://localhost:5173/` (Vite cung cấp sẵn cổng này, vui lòng kiểm tra trên Terminal để lấy địa chỉ chính xác).

## 4. Build dự án (Môi trường Production)
Để tiến hành biên dịch và tối ưu hóa ứng dụng để triển khai (deploy) lên host/server:
```bash
npm run build
```
Quá trình này sẽ tạo ra một thư mục `dist` chứa code đã được build sẵn sàng cho production.
