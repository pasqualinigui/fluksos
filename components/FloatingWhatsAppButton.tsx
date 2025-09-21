import React from 'react';
import { COLORS, WHATSAPP_LINK } from '../constants.ts';
import { WhatsAppIcon } from './icons/MiscIcons.tsx';

const FloatingWhatsAppButton: React.FC = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 bg-[${COLORS.success}] text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-40 flex items-center justify-center`} // z-40 should be sufficient
      aria-label="Fale conosco pelo WhatsApp"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
};

export default FloatingWhatsAppButton;