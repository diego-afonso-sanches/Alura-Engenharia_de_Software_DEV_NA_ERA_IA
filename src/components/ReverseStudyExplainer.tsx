import React from 'react';
import { Target, ArrowRightCircle, Lightbulb, Compass, X } from 'lucide-react';
import { ObjectiveFormData } from '../types/objective';

interface ReverseStudyExplainerProps {
  isOpen: boolean;
  onClose: () => void;
  onUseTemplate: (template: ObjectiveFormData) => void;
}

export const ReverseStudyExplainer: React.FC<ReverseStudyExplainerProps> = ({
  isOpen,
  onClose,
  onUseTemplate,
}) => {
  if (!isOpen) return null;

  const quickTemplates: Array<{
    title: string;
    description: string;
    days: number;
  }> = [
    {
      title: 'Resolver 10 exercícios da banca antes da teoria',
      description: 'Estudo reverso: tento resolver as questões. As dúvidas que surgirem apontam exatamente quais tópicos teóricos preciso estudar.',
      days: 7,
    },
    {
      title: 'Programar uma calculadora simples na prática',
      description: 'Em vez de ler a documentação inteira, vou montar a interface e pesquisar os comandos específicos conforme for precisando.',
      days: 5,
    },
    {
      title: 'Gravar um áudio de 2 minutos conversando em Francês',
      description: 'Identificar as palavras que me faltaram e a pronúncia errada para depois estudar vocabulário direcionado àquela fala.',
      days: 4,
    },
  ];

  return (
    <section className="bg-gradient-to-br from-indigo-50/90 via-white to-sky-50/60 border border-indigo-100/80 rounded-2xl p-4 sm:p-6 mb-6 shadow-sm transition-all relative overflow-hidden">
      <div className="absolute top-3 right-3">
        <button
          onClick={onClose}
          type="button"
          className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          title="Fechar painel"
          aria-label="Fechar explicação"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-3xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Compass className="w-4 h-4" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Como funciona o Método de Estudo Reverso?
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          O estudo tradicional faz você consumir dezenas de horas de teoria sem saber como aplicar. No <strong>Estudo Reverso</strong>, você começa pelo <strong>resultado prático desejado</strong> (o problema, a questão de prova ou o projeto) e estuda a teoria <em>apenas sob demanda</em> para resolver esse desafio.
        </p>

        {/* 3 Passos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="bg-white/80 p-3 rounded-xl border border-indigo-100 shadow-2xs">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs mb-1">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">1</span>
              <span>Defina a Chegada</span>
            </div>
            <p className="text-xs text-slate-500">
              Escolha uma meta prática concreta: um exercício, um código ou uma redação.
            </p>
          </div>

          <div className="bg-white/80 p-3 rounded-xl border border-indigo-100 shadow-2xs">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs mb-1">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">2</span>
              <span>Mapeie o Bloqueio</span>
            </div>
            <p className="text-xs text-slate-500">
              Tente fazer agora mesmo. Anote exatamente o conceito em que você travou.
            </p>
          </div>

          <div className="bg-white/80 p-3 rounded-xl border border-indigo-100 shadow-2xs">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs mb-1">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">3</span>
              <span>Estudo Focado</span>
            </div>
            <p className="text-xs text-slate-500">
              Consulte livros ou vídeos somente sobre aquele ponto específico e conclua.
            </p>
          </div>
        </div>

        {/* Ideias Rápidas para começar */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Sugestões rápidas de metas reversas (clique para usar no formulário):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickTemplates.map((template, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  const targetDate = new Date(Date.now() + template.days * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split('T')[0];
                  onUseTemplate({
                    title: template.title,
                    description: template.description,
                    deadline: targetDate,
                    status: 'a_iniciar',
                  });
                }}
                className="inline-flex items-center gap-1.5 text-xs bg-white hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 px-2.5 py-1.5 rounded-lg transition-colors text-left"
              >
                <Target className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className="font-medium line-clamp-1">{template.title}</span>
                <ArrowRightCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0 ml-1" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
