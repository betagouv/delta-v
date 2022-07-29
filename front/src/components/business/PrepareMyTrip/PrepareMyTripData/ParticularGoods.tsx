import { AccordionData } from '@/components/common/Accordion/Accordion';

export const ParticularGoods: AccordionData[] = [
  {
    id: '4',
    question: 'Les marchandises soumises à une règlementation particulière',
    iconName: 'officerCap',
    answer: (
      <div className="mt-4 flex w-full flex-col">
        <div>
          Il est interdit de ramener certains végétaux ou produits végétaux car ces derniers
          <span className="bold">
            peuvent être dangereux pour votre santé ou pour l’écosystème français.
          </span>{' '}
          Certains de ces produits sont soumis à des
          <span className="text-link underline">formalités particulières</span>.
        </div>
      </div>
    ),
  },
];
