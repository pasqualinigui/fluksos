import React, { useState } from 'react';
import Button from '../components/Button.tsx';
import FormField from '../components/FormField.tsx';
import ScrollRevealWrapper from '../components/ScrollRevealWrapper.tsx';
import { COLORS, TYPOGRAPHY, WHATSAPP_LINK, EMAIL_LINK, WHATSAPP_DISPLAY_NUMBER } from '../constants.ts';
import { FormData, FormErrors } from '../types.ts';
import { WhatsAppIcon, EmailIcon } from '../components/icons/MiscIcons.tsx';

const ContatoPage: React.FC = () => {
  const initialFormData: FormData = {
    name: '',
    email: '',
    company: '',
    phone: '',
    challenge: '',
    consent: false,
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Telefone/WhatsApp é obrigatório.';
    if (!formData.challenge.trim()) newErrors.challenge = 'Descreva seu desafio, por favor.';
    if (!formData.consent) newErrors.consent = 'Por favor, confirme que você não é um robô.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setIsSuccess(false);
    setErrors(prev => ({ ...prev, general: undefined }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      setIsSuccess(true);
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      setErrors(prev => ({ ...prev, general: 'Ocorreu um erro ao enviar. Tente novamente.' }));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      // The ScrollRevealWrapper ensures the success message animates in smoothly.
      <ScrollRevealWrapper> 
        <section className="py-12 text-center max-w-xl mx-auto min-h-[50vh] flex flex-col justify-center items-center">
          <h1 className={`${TYPOGRAPHY.h1} text-[${COLORS.accent}] mb-6`}>Mensagem Enviada!</h1>
          <p className={`${TYPOGRAPHY.body} text-[${COLORS.textPrimary}] mb-8`}>
            Obrigado pelo seu contato! Recebemos sua mensagem e um de nossos especialistas entrará em contato em até 24h.
          </p>
          <Button onClick={() => setIsSuccess(false)} variant="primary">Enviar Nova Mensagem</Button>
        </section>
      </ScrollRevealWrapper>
    );
  }

  return (
    <div className="py-8">
      <ScrollRevealWrapper>
        <section className="text-center mb-12">
          <h1 className={`${TYPOGRAPHY.h1} text-[${COLORS.textPrimary}] mb-4`}>Vamos conversar?</h1>
          <p className={`${TYPOGRAPHY.body} text-[${COLORS.textSecondary}] max-w-2xl mx-auto`}>
            Preencha o formulário e um de nossos especialistas fará um diagnóstico gratuito dos seus processos.
            Ou, se preferir, entre em contato diretamente.
          </p>
        </section>
      </ScrollRevealWrapper>

      <div className="grid md:grid-cols-5 gap-12">
        <ScrollRevealWrapper className="md:col-span-2" delay="100ms">
          <div className="space-y-6">
            <h2 className={`${TYPOGRAPHY.h3} text-[${COLORS.textPrimary}]`}>Outras formas de contato:</h2>
            <a href={EMAIL_LINK} className={`flex items-center space-x-3 p-4 rounded-lg bg-[${COLORS.border}] bg-opacity-30 hover:border-[${COLORS.accent}] border border-transparent transition-all group`}>
              <EmailIcon className={`w-8 h-8 text-[${COLORS.accent}] group-hover:opacity-80 transition-opacity`} />
              <div>
                <p className={`font-medium text-[${COLORS.textPrimary}] group-hover:text-[${COLORS.accent}] transition-colors`}>Email</p>
                <p className={`text-sm text-[${COLORS.textSecondary}]`}>contato@fluksos.com.br</p>
              </div>
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-3 p-4 rounded-lg bg-[${COLORS.border}] bg-opacity-30 hover:border-[${COLORS.accent}] border border-transparent transition-all group`}>
              <WhatsAppIcon className={`w-8 h-8 text-[${COLORS.accent}] group-hover:opacity-80 transition-opacity`} />
              <div>
                <p className={`font-medium text-[${COLORS.textPrimary}] group-hover:text-[${COLORS.accent}] transition-colors`}>WhatsApp</p>
                <p className={`text-sm text-[${COLORS.textSecondary}]`}>{WHATSAPP_DISPLAY_NUMBER}</p>
              </div>
            </a>
          </div>
        </ScrollRevealWrapper>

        <ScrollRevealWrapper className="md:col-span-3" delay="200ms">
          <form onSubmit={handleSubmit} noValidate className={`bg-[${COLORS.border}] bg-opacity-30 p-6 md:p-8 rounded-lg shadow-xl backdrop-blur-sm`}>
            <FormField label="Nome Completo" type="text" name="name" value={formData.name} onChange={handleChange} error={errors.name} placeholder="Seu nome" isRequired />
            <FormField label="Email Profissional" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="seu@email.com" isRequired />
            <FormField label="Nome da Empresa" type="text" name="company" value={formData.company} onChange={handleChange} error={errors.company} placeholder="Sua empresa LTDA" />
            <FormField label="Telefone / WhatsApp" type="tel" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} placeholder="(XX) 9XXXX-XXXX" isRequired />
            <FormField label="Qual seu maior desafio operacional hoje?" type="textarea" name="challenge" value={formData.challenge} onChange={handleChange} error={errors.challenge} placeholder="Descreva brevemente sua principal dor ou objetivo..." isRequired rows={5} />
            <FormField label="Não sou um robô" type="checkbox" name="consent" value={formData.consent} onChange={handleChange} error={errors.consent} isRequired /> 
            
            {errors.general && <p className={`mb-4 text-sm text-[${COLORS.error}]`}>{errors.general}</p>}

            <Button type="submit" variant="primary" size="large" fullWidth={true} disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
          </form>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
};

export default ContatoPage;