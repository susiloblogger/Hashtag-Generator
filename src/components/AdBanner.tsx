import React, { useEffect } from 'react';

interface AdBannerProps {
  className?: string;
  dataAdSlot?: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  className = '',
  dataAdSlot = 'XXXXXXXXXX', // Ganti dengan ID Ad Slot asli Anda
  dataAdFormat = 'auto',
  dataFullWidthResponsive = 'true',
}) => {
  useEffect(() => {
    try {
      // Pastikan fungsi window.adsbygoogle dipanggil setelah komponen di-render
      // TypeScript compiler mungkin akan komplain jika kita tidak define adsbygoogle, 
      // jadi kita gunakan (window as any).
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Error loading Google AdSense:', error);
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden flex justify-center bg-slate-100 rounded-2xl border border-slate-200 min-h-[100px] items-center ${className}`}>
      {/* Fallback text (opsional) saat iklan diblokir/belum tayang */}
      <span className="text-slate-400 text-sm font-medium absolute -z-10">Advertisement</span>
      
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXX" // Ganti dengan Publisher ID asli Anda
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive}
      />
    </div>
  );
};
