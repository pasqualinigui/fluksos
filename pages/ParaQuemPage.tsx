import React from 'react';
import Button from '../components/Button.tsx';
import ScrollRevealWrapper from '../components/ScrollRevealWrapper.tsx';
import { COLORS, TYPOGRAPHY } from '../constants.ts';
import { CheckIcon } from '../components/icons/MiscIcons.tsx';

const IDENTIFICATION_ITEMS = [
  "Sente que a operação depende 100% de você?",
  "Passa mais tempo apagando incêndios do que planejando o futuro?",
  "Vê sua equipe desmotivada com tarefas repetitivas e manuais?",
  "Tem receio de cometer erros que podem custar caro?",
  "Busca uma forma de ter mais controle e previsibilidade no seu negócio?",
  "Quer mais tempo livre para focar no estratégico ou até mesmo para você?",
];

const ParaQuemPage: React.FC = () => {
  return (
    <div className="space-y-16 md:space-y-24 py-8">
      {/* Seção 1: Título e Descrição */}
      <ScrollRevealWrapper>
        <section className="max-w-3xl mx-auto text-center md:text-left">
          <h1 className={`${TYPOGRAPHY.h1} text-[${COLORS.textPrimary}] mb-6`}>
            Feito para quem está na linha de frente.
          </h1>
          <p className={`${TYPOGRAPHY.body} text-[${COLORS.textSecondary}] text-lg leading-relaxed`}>
            Você é o coração da sua empresa. O visionário, o executor, muitas vezes o bombeiro.
            Sabemos que gerenciar uma Empresa é um desafio constante: equilibrar pratos, tomar decisões cruciais,
            e ainda encontrar tempo para inovar. Se você se sente sobrecarregado, como se fosse o gargalo
            do próprio crescimento, e sonha em ter processos mais eficientes que liberem seu tempo e energia
            para o que realmente importa... você está no lugar certo. A Fluksos entende a sua realidade.
          </p>
        </section>
      </ScrollRevealWrapper>

      {/* Seção 2: Checklist de Identificação */}
      <section className="max-w-3xl mx-auto">
        <ScrollRevealWrapper delay="100ms">
          <h2 className={`${TYPOGRAPHY.h2} text-center text-[${COLORS.textPrimary}] mb-10`}>
            Se você se identifica com isso, podemos ajudar:
          </h2>
        </ScrollRevealWrapper>
        <ul className="space-y-4">
          {IDENTIFICATION_ITEMS.map((item, index) => (
            <ScrollRevealWrapper key={index} delay={`${150 + index * 75}ms`}>
              <li className="flex items-start">
                <CheckIcon className={`w-6 h-6 text-[${COLORS.accent}] mr-3 mt-1 flex-shrink-0`} />
                <span className={`${TYPOGRAPHY.body} text-[${COLORS.textPrimary}]`}>{item}</span>
              </li>
            </ScrollRevealWrapper>
          ))}
        </ul>
      </section>

      {/* Seção 3: CTA */}
      <ScrollRevealWrapper delay="300ms">
        <section className={`bg-[${COLORS.border}] bg-opacity-50 p-8 md:p-16 rounded-lg text-center backdrop-blur-sm`}>
          <h2 className={`${TYPOGRAPHY.h2} text-[${COLORS.textPrimary}] mb-6`}>
            Menos sobrecarga, mais estratégia.
          </h2>
          <p className={`${TYPOGRAPHY.body} text-[${COLORS.textSecondary}] mb-10 max-w-xl mx-auto`}>
            Vamos conversar sobre como a automação inteligente pode aliviar suas dores e impulsionar seu negócio.
          </p>
          <Button to="/contato" variant="primary" size="large">
            Agende um Diagnóstico Gratuito
          </Button>
        </section>
      </ScrollRevealWrapper>
    </div>
  );
};

export default ParaQuemPage;