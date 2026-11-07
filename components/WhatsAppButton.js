import { useState, useEffect } from 'react';
import { useT } from '../lib/i18n';

export default function WhatsAppButton() {
  const { t } = useT();
  const [isOpen, setIsOpen] = useState(false);
  const [shown, setShown] = useState(false);

  // Animate the popup in after it mounts
  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    setShown(false);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const whatsappNumber = '923177194108';
  const whatsappMessage = encodeURIComponent(t('common.whatsappMessage'));
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      {/* Chat popup — appears when the floating button is clicked */}
      {isOpen && (
        <div
          className={`fixed bottom-24 right-6 z-50 w-[22rem] max-w-[calc(100vw-3rem)] transition-all duration-300 ${
            shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="bg-[#075E54] px-5 py-4 flex items-center">
              <img
                src="/logo-mark.png"
                alt="Precon Detailing"
                className="w-10 h-10 rounded-full bg-white object-contain p-0.5"
              />
              <div className="ml-3 flex-1">
                <p className="text-white font-semibold leading-tight">Precon Detailing</p>
                <p className="text-green-100 text-xs flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-1.5"></span>
                  {t('common.whatsappOnline')}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat popup"
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body — the question bubble */}
            <div className="bg-[#ECE5DD] px-5 py-5">
              <div className="bg-white rounded-xl rounded-tl-none shadow-sm p-4 max-w-[95%]">
                <p className="text-sm text-gray-800 leading-relaxed">{t('common.whatsappQuestion')}</p>
                <p className="text-[11px] text-gray-400 text-right mt-1">Precon Detailing</p>
              </div>
            </div>

            {/* CTA */}
            <div className="px-5 py-4 bg-white">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-[#25D366] hover:bg-[#1eb856] text-white font-semibold py-3 px-4 rounded-full transition-all hover:scale-[1.02]"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t('common.whatsappStart')}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating button — always visible */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={t('common.whatsappChat')}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#1eb856] transition-all hover:scale-110"
      >
        {/* Soft pulse ring */}
        {!isOpen && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-30 top-0 left-0 pointer-events-none"></span>
        )}

        {isOpen ? (
          <svg className="w-8 h-8 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8 relative" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}

        {/* Unread badge — invites the click */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold border-2 border-white">
            1
          </span>
        )}
      </button>
    </>
  );
}
