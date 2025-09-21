import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button.tsx';
import Card from '../components/Card.tsx';
import ScrollRevealWrapper from '../components/ScrollRevealWrapper.tsx'; 
import TestimonialCard from '../components/TestimonialCard.tsx';
import { COLORS, TYPOGRAPHY } from '../constants.ts';
import { ClockIcon, SpeechBubbleIcon, WarningTriangleIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/icons/MiscIcons.tsx';

const DORES = [
  { title: "Perdendo tempo com retrabalho?", description: "Tarefas manuais repetitivas consomem horas preciosas que poderiam ser investidas no crescimento.", icon: <ClockIcon /> },
  { title: "Clientes esperando por respostas?", description: "A demora na comunicação pode custar vendas e a satisfação do cliente.", icon: <SpeechBubbleIcon /> },
  { title: "Medo de erros operacionais?", description: "Processos manuais são propensos a falhas que geram prejuízos e stress.", icon: <WarningTriangleIcon /> },
];

const CASOS_DE_USO_PREVIEW = [
  { title: "Gestão de Leads Inteligente", description: "Capture, qualifique e encaminhe leads automaticamente, 24/7." },
  { title: "Atendimento ao Cliente Otimizado", description: "Respostas rápidas e personalizadas para encantar seus clientes." },
  { title: "Processos Financeiros Simplificados", description: "Automatize cobranças, conciliações e relatórios financeiros." },
];

const TECNOLOGIAS = ["N8N", "Anthropic", "Groq", "OpenAI", "Gemini", "GitHub", "PostgreSQL"];

const TESTIMONIALS = [
  {
    quote: "A Fluksos transformou nossa gestão de leads. O que antes levava horas, agora é instantâneo e não perdemos mais nenhuma oportunidade!",
    name: "Ana Beatriz Silva",
    role: "Diretora de Vendas, InovaTech Soluções",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&h=100&fit=crop&crop=faces",
    rating: 5,
  },
  {
    quote: "Estávamos sobrecarregados com processos manuais. As automações implementadas pela Fluksos nos deram o fôlego que precisávamos para crescer.",
    name: "Carlos Alberto Mendes",
    role: "CEO, Criativa Mente Hub",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&h=100&fit=crop&crop=faces",
    rating: 5,
  },
  {
    quote: "O medo de erros na operação financeira era constante. Com a Fluksos, ganhamos precisão, segurança e muito mais tempo para análises estratégicas.",
    name: "Juliana Santos Costa",
    role: "Gerente Financeira, Construtora Progresso Real",
    imageUrl: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=100&h=100&fit=crop&crop=faces",
    rating: 5,
  },
  {
    quote: "Nunca imaginei que automatizar nosso atendimento ao cliente traria tanto impacto positivo. A equipe da Fluksos foi incrível!",
    name: "Rafael Oliveira Lima",
    role: "Coordenador de Sucesso do Cliente, Tech Accel",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=100&h=100&fit=crop&crop=faces",
    rating: 5,
  },
  {
    quote: "A automação dos nossos relatórios economizou dezenas de horas por mês. Agora temos dados precisos e tempo para agir sobre eles.",
    name: "Fernanda Pereira Souza",
    role: "Analista de BI, Data Insights Co.",
    imageUrl: "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=100&h=100&fit=crop&crop=faces",
    rating: 5,
  },
  {
    quote: "Desde que implementamos as automações de marketing com a Fluksos, nossa geração de leads qualificados triplicou. Recomendo demais!",
    name: "Lucas Martins Ferreira",
    role: "Especialista em Marketing Digital, Conecta Ads",
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=100&h=100&fit=crop&crop=faces",
    rating: 5,
  },
];


const HomePage: React.FC = () => {
  const testimonialsScrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (testimonialsScrollContainerRef.current) {
      const scrollAmount = testimonialsScrollContainerRef.current.offsetWidth * 0.8; // Scroll by roughly 80% of visible width
      testimonialsScrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="space-y-16 md:space-y-24 py-8">
      {/* Seção 1: Herói */}
      <section className="text-center min-h-[75vh] md:min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[${COLORS.background}] via-[${COLORS.background}]/80 to-[${COLORS.background}]"></div>
        
        <div className="relative z-10 p-4">
          <ScrollRevealWrapper>
            <h1 className={`${TYPOGRAPHY.h1} text-[${COLORS.textPrimary}] mb-6 max-w-3xl mx-auto`}>
              Liberte sua empresa das tarefas manuais.
            </h1>
          </ScrollRevealWrapper>
          <ScrollRevealWrapper delay="100ms">
            <p className={`${TYPOGRAPHY.body} text-[${COLORS.textSecondary}] mb-10 max-w-2xl mx-auto`}>
              Implementamos automações inteligentes para que você foque no que realmente importa: o crescimento do seu negócio.
            </p>
          </ScrollRevealWrapper>
          <ScrollRevealWrapper delay="200ms">
            <Button to="/contato" variant="primary" size="large">
              Fale com um Especialista
            </Button>
          </ScrollRevealWrapper>
        </div>
      </section>

      {/* Seção 2: Dores */}
      <ScrollRevealWrapper>
        <section>
          <h2 className={`${TYPOGRAPHY.h2} text-center text-[${COLORS.textPrimary}] mb-12`}>
            Sua rotina se parece com isso?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {DORES.map((dor, index) => (
              <ScrollRevealWrapper key={index} delay={`${index * 100}ms`}>
                <Card icon={dor.icon} title={dor.title} description={dor.description} className="h-full" />
              </ScrollRevealWrapper>
            ))}
          </div>
        </section>
      </ScrollRevealWrapper>

      {/* Seção 3: Prova Social (Tecnologias) */}
      <ScrollRevealWrapper>
        <section className="text-center">
          <h2 className={`${TYPOGRAPHY.h2} text-[${COLORS.textPrimary}] mb-8`}>Algumas tecnologias que usamos</h2>
          <div className="max-w-4xl mx-auto">
             {/* Manually creating two rows for balanced layout */}
             <div className="flex flex-col items-center gap-y-4">
              {/* Row 1 */}
              <div className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-12">
                {TECNOLOGIAS.slice(0, 4).map((tech, index) => (
                  <ScrollRevealWrapper key={tech} delay={`${index * 50}ms`} className="inline-block">
                    <span className={`font-['IBM_Plex_Mono'] text-xl md:text-2xl text-[${COLORS.textSecondary}] opacity-75 hover:opacity-100 transition-opacity`}>{tech}</span>
                  </ScrollRevealWrapper>
                ))}
              </div>
              {/* Row 2 */}
              <div className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-12">
                {TECNOLOGIAS.slice(4).map((tech, index) => (
                  <ScrollRevealWrapper key={tech} delay={`${(index + 4) * 50}ms`} className="inline-block">
                    <span className={`font-['IBM_Plex_Mono'] text-xl md:text-2xl text-[${COLORS.textSecondary}] opacity-75 hover:opacity-100 transition-opacity`}>{tech}</span>
                  </ScrollRevealWrapper>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollRevealWrapper>

      {/* Seção 4: Apresentação dos Casos de Uso */}
      <ScrollRevealWrapper>
        <section>
          <h2 className={`${TYPOGRAPHY.h2} text-center text-[${COLORS.textPrimary}] mb-12`}>
            Veja como podemos te ajudar na prática
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {CASOS_DE_USO_PREVIEW.map((caso, index) => (
              <ScrollRevealWrapper key={index} delay={`${index * 100}ms`}>
                <Card title={caso.title} description={caso.description} className="h-full">
                    <Link to="/casos-de-uso" className={`mt-4 inline-block text-[${COLORS.accent}] hover:underline`}>
                        Saber mais &rarr;
                    </Link>
                </Card>
              </ScrollRevealWrapper>
            ))}
          </div>
          <div className="text-center mt-12">
            <ScrollRevealWrapper delay="300ms">
              <Button to="/casos-de-uso" variant="secondary">
                Ver todos os casos de uso
              </Button>
            </ScrollRevealWrapper>
          </div>
        </section>
      </ScrollRevealWrapper>

      {/* Seção 5: Testimonials Carousel */}
      <ScrollRevealWrapper>
        <section id="testimonials" className="relative">
          <h2 className={`${TYPOGRAPHY.h2} text-center text-[${COLORS.textPrimary}] mb-12`}>
            O Que Nossos Clientes Dizem
          </h2>
          
          <div className="relative">
            <div 
              ref={testimonialsScrollContainerRef}
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-4 gap-6 md:gap-8 scrollbar-hide scroll-px-4" // Added padding and scroll-padding for glow effect
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <ScrollRevealWrapper 
                  key={index} 
                  delay={`${index * 50}ms`} 
                  className="w-[85vw] sm:w-[45vw] md:w-[30vw] lg:w-[28vw] flex-shrink-0 snap-center md:snap-start" // snap-center for better mobile, snap-start for desktop
                >
                  <TestimonialCard
                    quote={testimonial.quote}
                    name={testimonial.name}
                    role={testimonial.role}
                    imageUrl={testimonial.imageUrl}
                    rating={testimonial.rating}
                    className="h-full" // Ensure cards maintain consistent height or internal alignment handles it
                  />
                </ScrollRevealWrapper>
              ))}
            </div>

            {/* Carousel Navigation Buttons */}
            <button
              onClick={() => scrollTestimonials('left')}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 md:p-2 bg-[${COLORS.border}]/50 hover:bg-[${COLORS.accent}]/80 text-[${COLORS.textPrimary}] rounded-full transition-colors ml-1 md:-ml-4`}
              aria-label="Depoimento Anterior"
            >
              <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={() => scrollTestimonials('right')}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 md:p-2 bg-[${COLORS.border}]/50 hover:bg-[${COLORS.accent}]/80 text-[${COLORS.textPrimary}] rounded-full transition-colors mr-1 md:-mr-4`}
              aria-label="Próximo Depoimento"
            >
              <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </section>
      </ScrollRevealWrapper>

      {/* Seção 6: CTA Final */}
      <ScrollRevealWrapper>
        <section className={`bg-[${COLORS.border}] bg-opacity-50 p-8 md:p-16 rounded-lg text-center backdrop-blur-sm mt-16 md:mt-24`}>
          <h2 className={`${TYPOGRAPHY.h2} text-[${COLORS.textPrimary}] mb-6`}>Pronto para transformar sua operação?</h2>
          <p className={`${TYPOGRAPHY.body} text-[${COLORS.textSecondary}] mb-10 max-w-xl mx-auto`}>
            Descubra como a Fluksos pode personalizar soluções de automação para os desafios únicos da sua Empresa.
          </p>
          <Button to="/contato" variant="primary" size="large">
            Fale com um Especialista
          </Button>
        </section>
      </ScrollRevealWrapper>
    </div>
  );
};

// Helper style for scrollbar-hide if not using a Tailwind plugin
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;
document.head.append(style);

export default HomePage;