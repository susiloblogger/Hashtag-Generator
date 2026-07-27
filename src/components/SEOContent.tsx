import React from 'react';
import { HelpCircle, TrendingUp, Target, Users, Zap, Search } from 'lucide-react';

export const SEOContent: React.FC = () => {
  const faqs = [
    {
      question: "Apa itu TagarAI?",
      answer: "TagarAI adalah tool generator dan analis hashtag berbasis Artificial Intelligence (AI) yang membantu kreator konten dan bisnis menemukan tagar paling relevan, berpotensi viral, dan optimal untuk berbagai platform media sosial."
    },
    {
      question: "Bagaimana cara kerja generator hashtag ini?",
      answer: "Sistem AI kami menganalisis kata kunci, topik, atau gambar yang Anda unggah, lalu mencocokkannya dengan database tren media sosial terkini untuk menghasilkan daftar hashtag yang dikategorikan berdasarkan volume (populer, niche, mikro)."
    },
    {
      question: "Platform media sosial apa saja yang didukung?",
      answer: "Saat ini TagarAI dioptimalkan untuk menghasilkan tagar dan strategi untuk Instagram, TikTok, LinkedIn, Twitter (X), dan YouTube Shorts."
    },
    {
      question: "Apakah saya bisa mencari hashtag berdasarkan gambar?",
      answer: "Ya! Anda dapat mengunggah foto konten Anda, dan AI visi komputer kami akan mendeteksi objek, suasana, dan konteks gambar untuk menghasilkan hashtag yang sangat akurat secara otomatis."
    },
    {
      question: "Apa bedanya strategi 'Campuran Seimbang' dan 'High Reach'?",
      answer: "'Campuran Seimbang' mengkombinasikan tagar populer, spesifik niche, dan mikro agar konten Anda mendominasi pencarian bertahap. Sedangkan 'High Reach' fokus murni pada tagar dengan jutaan postingan untuk impresi massal yang cepat namun persaingannya sangat tinggi."
    },
    {
      question: "Apakah penggunaan hashtag masih efektif untuk bisnis?",
      answer: "Sangat efektif. Hashtag berfungsi sebagai algoritma pengkategorian (SEO media sosial). Tagar yang tepat memastikan produk atau layanan bisnis Anda ditemukan oleh audiens spesifik yang memiliki niat pembelian atau ketertarikan tinggi."
    },
    {
      question: "Berapa banyak hashtag yang sebaiknya digunakan di Instagram?",
      answer: "Menurut pedoman terbaru Instagram, disarankan menggunakan 3 hingga 5 hashtag yang sangat relevan per postingan untuk hasil optimal, alih-alih melakukan spam dengan 30 hashtag."
    },
    {
      question: "Bisakah saya menyimpan hashtag yang sudah dibuat?",
      answer: "Tentu. Kami menyediakan fitur 'Koleksi' di mana Anda dapat menyimpan grup tagar favorit Anda di penyimpanan lokal browser (Local Storage) untuk digunakan kembali kapan saja tanpa batas."
    },
    {
      question: "Apakah layanan pembuat hashtag ini gratis?",
      answer: "Ya, TagarAI dapat digunakan 100% secara gratis untuk membantu Anda meningkatkan performa dan jangkauan media sosial tanpa biaya berlangganan."
    },
    {
      question: "Apakah data analisis volume tagar selalu akurat?",
      answer: "TagarAI menggunakan estimasi berbasis tren dan data terkini dari berbagai platform media sosial. Angka volume postingan berfungsi sebagai indikator strategis (bukan real-time exact count) yang sangat efektif untuk memandu Anda memilih tagar dengan persaingan yang tepat."
    }
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="w-full mt-12 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* SEO Benefits Section */}
      <section className="mb-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Tingkatkan Reach Media Sosial Bisnis Anda
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            TagarAI tidak sekadar menebak kata acak. Kami menggunakan algoritma NLP canggih untuk menganalisis konteks konten dan memberikan manfaat nyata bagi strategi digital marketing bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100 hover:border-indigo-300 transition-colors">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4 shadow-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Dominasi Algoritma</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Meningkatkan peluang konten masuk ke halaman Explore (Instagram) atau FYP (TikTok) melalui struktur hierarki tagar yang terkalibrasi.
            </p>
          </div>
          
          <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 hover:border-emerald-300 transition-colors">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Targeting Spesifik</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Fokus menjangkau komunitas niche yang tepat. Bukan audiens acak, melainkan calon konsumen dengan interest tinggi pada produk/jasa UMKM Anda.
            </p>
          </div>

          <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 hover:border-amber-300 transition-colors">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4 shadow-sm">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Efisiensi Waktu</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tim social media dan digital marketer tidak perlu lagi riset tagar manual selama berjam-jam. Dapatkan set tagar teroptimasi hanya dalam hitungan detik.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-slate-100 rounded-lg text-slate-700">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="flex gap-4 items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-sm">
                {index + 1}
              </span>
              <div>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-1.5 leading-snug">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
