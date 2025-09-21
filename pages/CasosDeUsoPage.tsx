import React, { useState, useMemo } from 'react';
import Card from '../components/Card.tsx';
import Button from '../components/Button.tsx';
import ScrollRevealWrapper from '../components/ScrollRevealWrapper.tsx';
import { COLORS, TYPOGRAPHY } from '../constants.ts';
import { CasoDeUso } from '../types.ts';

const ALL_CASOS: CasoDeUso[] = [
  // Vendas
  { id: '1', category: 'Vendas', problemTitle: 'Gestão de Leads do Instagram', resultDescription: 'Nunca mais perca um contato. Responda em tempo real e envie para o seu CRM automaticamente.', tags: ['Vendas', 'Marketing', 'CRM'] },
  { id: '5', category: 'Vendas', problemTitle: 'Follow-up de Propostas Comerciais', resultDescription: 'Automatize lembretes e acompanhamentos para propostas enviadas, aumentando sua taxa de conversão.', tags: ['Vendas', 'CRM'] },
  { id: '7', category: 'Vendas', problemTitle: 'Qualificação Automática de Leads com IA', resultDescription: 'Utilize IA para pontuar e priorizar leads com base em perfil e interações, focando seu time nos mais promissores.', tags: ['Vendas', 'IA', 'CRM'] },
  { id: '8', category: 'Vendas', problemTitle: 'Agendamento Inteligente de Reuniões', resultDescription: 'Sincronize agendas e permita que leads marquem reuniões automaticamente, eliminando trocas de emails.', tags: ['Vendas', 'Produtividade'] },
  { id: '9', category: 'Vendas', problemTitle: 'Personalização de Propostas em Escala', resultDescription: 'Crie propostas comerciais personalizadas dinamicamente a partir de templates e dados do CRM.', tags: ['Vendas', 'Documentos'] },
  { id: '21', category: 'Vendas', problemTitle: 'Pós-venda Automatizado', resultDescription: 'Envie pesquisas de satisfação, colete feedback e identifique oportunidades de upsell automaticamente.', tags: ['Vendas', 'Retenção', 'Feedback'] },

  // Marketing
  { id: '2', category: 'Marketing', problemTitle: 'Automação de Campanhas de Email', resultDescription: 'Segmente sua audiência e envie emails personalizados baseados em gatilhos e comportamento.', tags: ['Marketing', 'Email'] },
  { id: '10', category: 'Marketing', problemTitle: 'Segmentação Dinâmica de Audiência', resultDescription: 'Adapte suas listas de marketing em tempo real conforme o comportamento e interações dos usuários.', tags: ['Marketing', 'Dados'] },
  { id: '11', category: 'Marketing', problemTitle: 'Publicação e Agendamento em Mídias Sociais', resultDescription: 'Planeje e automatize postagens em diversas plataformas, mantendo uma presença online consistente.', tags: ['Marketing', 'Redes Sociais'] },
  { id: '12', category: 'Marketing', problemTitle: 'Monitoramento de Marca e Análise de Sentimento', resultDescription: 'Acompanhe menções à sua marca online e use IA para analisar o sentimento do público.', tags: ['Marketing', 'IA', 'Reputação'] },
  { id: '13', category: 'Marketing', problemTitle: 'Geração de Conteúdo Assistida por IA', resultDescription: 'Use IA para gerar rascunhos, ideias e otimizar textos para blogs, anúncios e redes sociais.', tags: ['Marketing', 'IA', 'Conteúdo'] },
  { id: '22', category: 'Marketing', problemTitle: 'Criação e Agendamento de Newsletters', resultDescription: 'Automatize a compilação de conteúdo relevante e o envio periódico de newsletters para sua base.', tags: ['Marketing', 'Email', 'Conteúdo'] },
  
  // Operações
  { id: '3', category: 'Operações', problemTitle: 'Onboarding Automatizado de Clientes', resultDescription: 'Simplifique o processo de boas-vindas para novos clientes, garantindo uma ótima primeira impressão.', tags: ['Operações', 'Clientes'] },
  { id: '6', category: 'Operações', problemTitle: 'Geração de Relatórios Periódicos', resultDescription: 'Colete dados de diversas fontes e gere relatórios customizados automaticamente.', tags: ['Operações', 'Dados'] },
  { id: '14', category: 'Operações', problemTitle: 'Gestão de Tarefas e Notificações de Projetos', resultDescription: 'Automatize a criação de tarefas, atribuições e envie notificações de progresso em projetos.', tags: ['Operações', 'Produtividade', 'Projetos'] },
  { id: '15', category: 'Operações', problemTitle: 'Suporte ao Cliente Nível 1 com Chatbots', resultDescription: 'Implemente chatbots inteligentes para responder dúvidas frequentes e triar atendimentos 24/7.', tags: ['Operações', 'Atendimento', 'IA'] },
  { id: '16', category: 'Operações', problemTitle: 'Automatização de Pedidos e Inventário', resultDescription: 'Para empresas com produtos, automatize o processamento de pedidos e atualizações de inventário.', tags: ['Operações', 'E-commerce', 'Estoque'] },
  { id: '23', category: 'Operações', problemTitle: 'Triagem Inteligente de Emails', resultDescription: 'Categorize e encaminhe e-mails recebidos (suporte, vendas, etc.) para os times ou fluxos corretos.', tags: ['Operações', 'Comunicação', 'Produtividade'] },

  // Financeiro
  { id: '4', category: 'Financeiro', problemTitle: 'Conciliação Bancária Inteligente', resultDescription: 'Reduza horas de trabalho manual cruzando transações bancárias com seus registros automaticamente.', tags: ['Financeiro', 'Contabilidade'] },
  { id: '17', category: 'Financeiro', problemTitle: 'Emissão Automatizada de NF e Boletos', resultDescription: 'Integre com seu sistema financeiro para emitir notas fiscais e boletos automaticamente após vendas.', tags: ['Financeiro', 'Faturamento'] },
  { id: '18', category: 'Financeiro', problemTitle: 'Lembretes de Pagamento e Gestão de Inadimplência', resultDescription: 'Envie lembretes automáticos de vencimento e inicie fluxos de cobrança para reduzir inadimplência.', tags: ['Financeiro', 'Cobrança'] },
  { id: '19', category: 'Financeiro', problemTitle: 'Análise de Fluxo de Caixa com IA', resultDescription: 'Utilize IA para analisar seu fluxo de caixa, identificar tendências e gerar projeções financeiras.', tags: ['Financeiro', 'IA', 'Planejamento'] },
  { id: '20', category: 'Financeiro', problemTitle: 'Aprovação de Despesas Simplificada', resultDescription: 'Crie workflows automatizados para solicitação, aprovação e reembolso de despesas.', tags: ['Financeiro', 'Processos'] },
  { id: '24', category: 'Financeiro', problemTitle: 'Geração de DRE e Balancetes', resultDescription: 'Automatize a coleta de dados e a montagem de Demonstrativos de Resultado e Balancetes periódicos.', tags: ['Financeiro', 'Relatórios', 'Contabilidade'] },
];

const CATEGORIES = ['Todos', 'Vendas', 'Marketing', 'Operações', 'Financeiro'];

const CasosDeUsoPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('Todos');

  const filteredCasos = useMemo(() => {
    if (activeFilter === 'Todos') {
      return ALL_CASOS;
    }
    return ALL_CASOS.filter(caso => caso.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-12 py-8">
      <ScrollRevealWrapper>
        <section className="text-center">
          <h1 className={`${TYPOGRAPHY.h1} text-[${COLORS.textPrimary}] mb-4`}>
            Casos de Uso: Automação na Prática
          </h1>
          <p className={`${TYPOGRAPHY.body} text-[${COLORS.textSecondary}] max-w-2xl mx-auto`}>
            Soluções reais para os desafios diários de empresas. Veja como a automação pode impulsionar seus resultados.
          </p>
          <p className={`${TYPOGRAPHY.body} text-[${COLORS.textSecondary}] max-w-2xl mx-auto mt-4 text-sm`}>
            Estes são apenas alguns exemplos. A Fluksos se especializa em entender suas necessidades únicas e desenvolver automações sob medida para o seu negócio.
          </p>
        </section>
      </ScrollRevealWrapper>

      {/* Seção 2: Filtro */}
      <ScrollRevealWrapper delay="100ms">
        <section className="flex flex-wrap justify-center gap-2 md:gap-4 my-12">
          {CATEGORIES.map((category, index) => (
            <ScrollRevealWrapper key={category} delay={`${index * 50}ms`} className="inline-block">
              <Button
                variant="filter"
                isActive={activeFilter === category}
                onClick={() => setActiveFilter(category)}
                size="small"
                className="rounded-full"
              >
                {category}
              </Button>
            </ScrollRevealWrapper>
          ))}
        </section>
      </ScrollRevealWrapper>

      {/* Seção 3: Grade de Casos de Uso */}
      {filteredCasos.length > 0 ? (
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCasos.map((caso, index) => (
            <ScrollRevealWrapper 
              key={`${activeFilter}-${caso.id}`} // Ensure key changes with filter and ID for re-animation
              delay={`${(index % 3) * 100}ms`} 
              triggerOnce={false} // Allow re-animation on filter change
            >
              <Card 
                title={caso.problemTitle} 
                description={caso.resultDescription}
                tags={caso.tags}
                className="h-full flex flex-col justify-between" 
              >
                  {/* For MVP, cards are informational. */}
              </Card>
            </ScrollRevealWrapper>
          ))}
        </section>
      ) : (
        <ScrollRevealWrapper>
          <p className={`text-center text-[${COLORS.textSecondary}]`}>Nenhum caso de uso encontrado para esta categoria.</p>
        </ScrollRevealWrapper>
      )}
    </div>
  );
};

export default CasosDeUsoPage;