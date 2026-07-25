import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Kembali ke Beranda
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-slate-700 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-6 mb-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Kebijakan Privasi</h1>
            <p className="text-slate-500 text-sm mt-1">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Pendahuluan</h2>
          <p>
            Selamat datang di AI Hashtag Generator. Kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi data yang Anda bagikan saat menggunakan layanan kami. Dokumen Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Data yang Kami Proses</h2>
          <p>
            Aplikasi kami berfungsi untuk menghasilkan hashtag (tagar) cerdas berbasis Artificial Intelligence (AI). Untuk menjalankan fungsinya, kami memproses:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Input Teks & Gambar:</strong> Kata kunci, topik, atau gambar yang Anda unggah untuk dianalisis oleh sistem AI kami (didukung oleh teknologi Google Gemini). Data ini hanya dikirim secara *real-time* ke server AI untuk menghasilkan output dan <strong>tidak kami simpan secara permanen</strong> di server kami.</li>
            <li><strong>Penyimpanan Lokal (Local Storage):</strong> Fitur "Hashtag Tersimpan" sepenuhnya disimpan secara lokal di dalam browser peramban (browser) perangkat Anda. Kami tidak memiliki akses ke data yang Anda simpan tersebut.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Layanan Pihak Ketiga & Iklan</h2>
          <p>
            Kami menggunakan layanan pihak ketiga untuk operasional dan monetisasi aplikasi, yang mungkin menggunakan *cookies* atau teknologi pelacakan serupa:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Google AdSense:</strong> Kami menayangkan iklan melalui Google AdSense. Google dan mitra iklannya menggunakan *cookies* untuk menayangkan iklan berdasarkan riwayat kunjungan Anda ke situs ini atau situs web lainnya di internet. Anda dapat menyisih dari iklan yang dipersonalisasi dengan mengunjungi <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">Pengaturan Iklan Google</a>.</li>
            <li><strong>Google Gemini API:</strong> Input yang Anda berikan diproses secara aman melalui API Google untuk menghasilkan hasil analisis dan rekomendasi tagar.</li>
            <li><strong>Web Analytics:</strong> Kami mungkin menggunakan layanan analitik (seperti Vercel Analytics) untuk melacak penggunaan situs secara anonim guna memperbaiki pengalaman pengguna.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Keamanan Data</h2>
          <p>
            Meskipun tidak ada metode transmisi data melalui internet yang 100% aman, kami berupaya menggunakan sarana komersial yang wajar untuk melindungi informasi Anda. Aplikasi kami tidak memerlukan pembuatan akun, sehingga tidak ada pengumpulan data pribadi sensitif (seperti nama, email, atau kata sandi).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">5. Perubahan Kebijakan</h2>
          <p>
            Kami berhak untuk memperbarui atau mengubah Kebijakan Privasi ini kapan saja. Setiap perubahan akan diinformasikan di halaman ini dengan memperbarui tanggal "Terakhir diperbarui" di bagian atas halaman.
          </p>
        </section>
      </div>
    </div>
  );
};
