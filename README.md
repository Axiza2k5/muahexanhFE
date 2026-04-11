# Mùa hè xanh FE (React + Vite + Tailwind + TypeScript)

## Bắt đầu ngay

### Yêu cầu hệ thống

- Node.js (khuyên dùng bản v18 trở lên)
- npm (hoặc yarn / pnpm)

### Cài đặt

Cài đặt các thư viện (dependencies):
```bash
npm i
```

### Môi trường Phát triển

Khởi động development server:

```bash
npm run dev
```

Ứng dụng sẽ chạy tại địa chỉ `http://localhost:5173`.

### Build (Triển khai Production)

Build ứng dụng để chạy môi trường production:

```bash
npm run build
```

## Công nghệ sử dụng

- **Framework**: React.js với Vite
- **Ngôn ngữ**: TypeScript
- **Tùy chỉnh giao diện**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **BaaS (Backend as a Service)**: Supabase
- **Icons**: Lucide React

## Cấu trúc frontend

```text
muahexanhFE/
├── src/
│   ├── api/             
│   ├── components/      
│   ├── features/       
│   ├── hooks/           
│   ├── layouts/         
│   ├── pages/           
│   ├── store/           
│   ├── types/           
│   ├── App.tsx          
│   ├── main.tsx         
│   ├── index.css        
│   └── vite-env.d.ts    
├── index.html           
├── package.json         
├── tailwind.config.js   
├── postcss.config.js    
├── vite.config.ts       
└── tsconfig.json        
```