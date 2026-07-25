# AI Hashtag Generator

AI Hashtag Generator adalah aplikasi web full-stack yang cerdas dan modern, dirancang untuk menghasilkan hashtag yang relevan, berpotensi viral, dan terukur menggunakan kehebatan AI (Google Gemini). Aplikasi ini sangat cocok untuk content creator dan social media strategist untuk berbagai platform seperti Instagram, TikTok, LinkedIn, Twitter/X, dan YouTube.

## ✨ Fitur Utama

- **🧠 Generate Hashtags Berbasis AI**: Membuat kombinasi hashtag yang optimal berdasarkan topik, gambar, niche, dan strategi audiens yang dipilih.
- **📊 Analisis Mendalam (Deep Analysis)**: Menganalisis sebuah hashtag spesifik untuk mendapatkan insight berharga, seperti estimasi volume postingan, tingkat persaingan, target audiens, hingga ide konten terkait.
- **🎯 Berbagai Strategi Pertumbuhan**: Mendukung berbagai strategi hashtag seperti *Balanced* (seimbang), *High Reach* (jangkauan luas), *Niche Focus* (terfokus ke komunitas), dan *Low Competition* (persaingan rendah).
- **📱 Optimasi Multi-Platform**: Tips dan pilihan tagar yang disesuaikan secara khusus untuk algoritma platform-platform utama.
- **🖼️ Dukungan Analisis Gambar (Vision AI)**: Unggah gambar Anda, dan AI akan menganalisis visual (objek, suasana, gaya) untuk menghasilkan hashtag yang sangat relevan secara otomatis.
- **📝 Saran Caption**: Secara otomatis memberikan draf ide caption yang *engaging* dengan penempatan tagar yang natural.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS (v4), Framer Motion, Lucide React
- **Backend**: Node.js, Express.js
- **AI Integration**: Google Gen AI SDK (`@google/genai`) menggunakan model Gemini (Gemini 3.6 Flash)
- **Bahasa**: TypeScript

## 📋 Prasyarat

Sebelum menjalankan aplikasi, pastikan sistem Anda telah memiliki:
- [Node.js](https://nodejs.org/) (Versi 18+ direkomendasikan)
- Package manager seperti `npm`

## 🚀 Instalasi dan Setup

1. **Clone repository ini**:
   ```bash
   git clone https://github.com/susiloblogger/Hashtag-Generator.git
   cd Hashtag-Generator
   ```

2. **Instal seluruh dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variable**:
   Aplikasi membutuhkan API Key dari Gemini. Salin file `.env.example` menjadi `.env` atau buat file `.env` di *root directory*:
   ```env
   GEMINI_API_KEY=masukkan_api_key_gemini_anda_di_sini
   ```
   *(Dapatkan API key gratis dari [Google AI Studio](https://aistudio.google.com/app/apikey))*

4. **Jalankan Aplikasi pada Mode Development**:
   ```bash
   npm run dev
   ```
   Frontend Vite dan Backend Express akan terintegrasi dan berjalan di *localhost* (secara default berjalan di port 3000).

## 📦 Build untuk Production

Untuk melakukan build proyek agar siap di-*deploy* ke production:

```bash
npm run build
```
Proses ini akan mem-*bundle* Vite ke folder `dist` dan server ke `dist/server.cjs`. 
Kemudian jalankan servernya:
```bash
npm run start
```

## 📂 Struktur Utama Proyek

- `src/` : Source code utama untuk UI / Frontend (Komponen React, style, aset).
- `server.ts` : File utama backend (Express.js) yang mengatur rute API integrasi Gemini.
- `vite.config.ts` : Konfigurasi Vite *bundler*.

## 🤝 Kontribusi

*Pull request* dipersilakan! Untuk perubahan besar, harap buka isu (issue) terlebih dahulu untuk mendiskusikan apa yang ingin Anda ubah.

## 📝 Lisensi

[MIT](https://choosealicense.com/licenses/mit/)
