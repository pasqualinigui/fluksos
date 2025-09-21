import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, COLORS, WHATSAPP_LINK, EMAIL_LINK, WHATSAPP_DISPLAY_NUMBER } from '../constants.ts';
import { FluksosLogoIcon, WhatsAppIcon, EmailIcon } from './icons/MiscIcons.tsx';

const Footer: React.FC = () => {
  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if on homepage, Link component handles navigation
    // Forcing scroll to top as per request "jogar a página para o topo"
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // If it's a Link to="/", and we are not on home, it will navigate.
    // If we are on home, Link to="/" might not trigger scroll, so we force it.
    // To prevent default if it were a plain <a> and we only want scroll:
    // event.preventDefault(); 
  };

  return (
    <footer className={`bg-[${COLORS.background}] border-t border-[${COLORS.border}] text-[${COLORS.textSecondary}]`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link 
              to="/" 
              onClick={handleLogoClick} 
              className="flex items-center space-x-2 mb-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[${COLORS.accent}] rounded"
              aria-label="Fluksos Home, ir para o topo"
            >
               <FluksosLogoIcon className={`h-8 w-auto text-[${COLORS.accent}] group-hover:opacity-80 transition-opacity`} />
               <span className={`font-['IBM_Plex_Mono'] text-2xl font-medium text-[${COLORS.textPrimary}] group-hover:text-[${COLORS.accent}] transition-colors`}>Fluksos</span>
            </Link>
            <p className="text-sm">
              Automação inteligente para Empresas.<br />
              Liberte sua empresa das tarefas manuais.
            </p>
          </div>
          
          <div>
            <h3 className={`text-lg font-['IBM_Plex_Mono'] text-[${COLORS.textPrimary}] mb-4`}>Navegação</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={`hover:text-[${COLORS.accent}] transition-colors focus:outline-none focus-visible:text-[${COLORS.accent}] focus-visible:underline rounded`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`text-lg font-['IBM_Plex_Mono'] text-[${COLORS.textPrimary}] mb-4`}>Contato</h3>
            <ul className="space-y-2">
              <li>
                <a href={EMAIL_LINK} className={`flex items-center space-x-2 hover:text-[${COLORS.accent}] transition-colors focus:outline-none focus-visible:text-[${COLORS.accent}] rounded`}>
                  <EmailIcon className="h-5 w-5" />
                  <span>contato@fluksos.com.br</span>
                </a>
              </li>
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-2 hover:text-[${COLORS.accent}] transition-colors focus:outline-none focus-visible:text-[${COLORS.accent}] rounded`}>
                  <WhatsAppIcon className="h-5 w-5" />
                  <span>{WHATSAPP_DISPLAY_NUMBER}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[${COLORS.border}] text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Fluksos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;