import { AccordionData } from '@/components/atoms/Accordion/Accordion';
import { Link } from '@/components/atoms/Link';

export const Border: AccordionData[] = [
  {
    id: 'border-1',
    question: 'J’ai oublié de déclarer une marchandise',
    answer: (
      <p>
        En cas d’oubli de déclaration d’une ou de plusieurs marchandises, adressez-vous aux services
        douaniers présent à votre arrivée sur le territoire français. Si vous êtes déjà entrés en
        France, rapprochez-vous des{' '}
        <Link
          href="https://www.douane.gouv.fr/service-en-ligne/annuaire-des-services-douaniers"
          external
        >
          <span className="text-link">services douaniers les plus proches de chez vous</span>
        </Link>
        .
      </p>
    ),
  },
  {
    id: 'border-2',
    question: 'Puis-je déclarer sur place ?',
    answer: (
      <p>
        Si je veux déclarer ma marchandise à mon arrivée en France, je dois me rapprocher des
        services douaniers que je croise.
      </p>
    ),
  },
  {
    id: 'border-3',
    question: 'Dois-je me présenter aux agents des douanes ?',
    answer: (
      <div className="flex flex-col gap-2">
        <p>
          Pour pouvoir déclarer le (ou les) produit(s) achetés à l’étranger que je ramène avec moi
          je dois me présenter auprès des services douaniers présent à mon arrivée sur le territoire
          français.
        </p>
        <p>C’est avec eux que je vais pouvoir réaliser ma déclaration.</p>
      </div>
    ),
  },
];
