
export const COLORS = {
  background: '#0D1117', // Azul-Noite
  accent: '#00FFFF',     // Ciano Elétrico
  textPrimary: '#E6EDF3', // Branco-Titânio
  textSecondary: '#8B949E', // Cinza-Médio
  border: '#30363D',      // Cinza-Borda
  success: '#238636',    // Verde-Sucesso
  error: '#DA3633',      // Vermelho-Erro
};

export const NAV_LINKS = [
  { name: 'Início', path: '/' },
  { name: 'Casos de Uso', path: '/casos-de-uso' },
  { name: 'Para Quem', path: '/para-quem' },
  { name: 'Contato', path: '/contato' },
];

export const TYPOGRAPHY = {
  h1: "font-['IBM_Plex_Mono'] font-medium text-4xl md:text-5xl",
  h2: "font-['IBM_Plex_Mono'] font-normal text-3xl md:text-4xl", // Adjusted from Regular to Normal as per Tailwind
  h3: "font-['Inter'] font-bold text-xl md:text-2xl", // Slightly increased for better hierarchy
  body: "font-['Inter'] font-normal text-base leading-relaxed",
};

export const WHATSAPP_LINK = "https://wa.me/5547991228386"; // Updated WhatsApp link
export const WHATSAPP_DISPLAY_NUMBER = "+55 (47) 99122-8386"; // Added display number
export const EMAIL_LINK = "mailto:contato@fluksos.com.br";
