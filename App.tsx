import React, { useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton.tsx';
import HomePage from './pages/HomePage.tsx';
import CasosDeUsoPage from './pages/CasosDeUsoPage.tsx';
import ParaQuemPage from './pages/ParaQuemPage.tsx';
import ContatoPage from './pages/ContatoPage.tsx';
import ScrollToTop from './components/ScrollToTop.tsx'; // Importa o novo componente
import { COLORS } from './constants.ts';

import type { Container, Engine, ISourceOptions } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const App: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions: ISourceOptions = {
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        onClick: {
          enable: false, 
        },
      },
      modes: {
        repulse: {
          distance: 60,
          duration: 0.4,
          speed: 0.5
        },
      },
    },
    particles: {
      color: {
        value: COLORS.accent,
      },
      links: {
        color: COLORS.border,
        distance: 120,
        enable: true,
        opacity: 0.25,
        width: 1,
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 0.4, 
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800, 
        },
        value: 35, 
      },
      opacity: {
        value: 0.3, 
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 }, 
      },
    },
    detectRetina: true,
    background: {
      color: 'transparent',
    }
  };

  return (
    <HashRouter>
      <ScrollToTop /> {/* Adiciona o ScrollToTop aqui */}
      <div className={`flex flex-col min-h-screen bg-[${COLORS.background}] text-[${COLORS.textPrimary}] font-['Inter'] relative`}>
        {/* Global Particles Background */}
        <div className="absolute inset-0 z-0">
          <Particles
            id="tsparticles-global"
            init={particlesInit}
            options={particlesOptions}
            height="100%"
            width="100%"
          />
        </div>
        
        {/* Main Content Area - ensure it's above particles */}
        <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/casos-de-uso" element={<CasosDeUsoPage />} />
                <Route path="/para-quem" element={<ParaQuemPage />} />
                <Route path="/contato" element={<ContatoPage />} />
              </Routes>
            </main>
            <Footer />
        </div>
        <FloatingWhatsAppButton /> {/* WhatsApp button should be above particles too */}
      </div>
    </HashRouter>
  );
};

export default App;