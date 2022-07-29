import { AccordionData } from '@/components/common/Accordion/Accordion';

export const ForbiddenGoods: AccordionData[] = [
  {
    id: '5',
    question: 'Les marchandises interdites',
    iconName: 'forbidden',
    answer: (
      <div className="mt-4 flex w-full flex-col">
        <div>
          Il n’est pas possible de ramener certains produits en France car leur usage y est
          strictement interdit : stupéfiants et psychotropes (sauf exception), contrefaçon , chiens
          d’attaque, certains végétaux , certaines espèces animales et végétales sauvages, produits
          et objets comportant des images ou représentation de mineurs à caractère pornographique.
        </div>
      </div>
    ),
  },
];
