import { AccordionData } from '@/components/atoms/Accordion/Accordion';
import { Link } from '@/components/atoms/Link';

export const Declaration: AccordionData[] = [
  {
    id: 'declaration-1',
    question: 'Qu’est ce qu’une déclaration ?',
    answer: (
      <p>
        Une déclaration est la formalité où vous indiquez à l’administration des douanes les
        marchandises que vous transportez sur vous et dans vos bagages personnels.\n\nCes produits
        peuvent avoir été achetés ou vous avoir été offerts à l’étranger.
      </p>
    ),
  },
  {
    id: 'declaration-2',
    question: 'Comment déclarer mes produits ?',
    answer: (
      <p>
        Pour procéder aux formalités de déclaration, adressez-vous aux services douaniers présents à
        votre arrivée sur le territoire français (dans le port, l'aéroport, dans la gare ou au point
        de passage routier que vous empruntez). Si vous ne croisez pas d’agents des douanes à votre
        passage de la frontière, vous pouvez également vous rapprocher des{' '}
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
    id: 'declaration-3',
    question: 'Pourquoi doit-on payer des taxes ?',
    answer: (
      <p>
        Vous devez payer des taxes sur les produits que vous ramenez de l’étranger quand le prix ou
        le nombre de ces objets dépasse certains seuils (ou “franchises”) fixés par la
        réglementation française. Ces limites peuvent être des seuils de valeur (“j’ai ramené un
        produit dont la valeur dépasse X euros”) ou de quantité (“j’ai ramené X bouteilles de
        bière”).
      </p>
    ),
  },
  {
    id: 'declaration-4',
    question: 'Où puis-je faire ma déclaration ?',
    answer: (
      <p>
        Je peux déclarer à mon arrivée sur le territoire français. Si je ne croise pas de douaniers
        à l’occasion de mon retour, je peux également me rapprocher des{' '}
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
    id: 'declaration-5',
    question: 'Quand dois-je déclarer ?',
    answer: (
      <p>
        Je dois effectuer ma déclaration auprès des services douaniers dès mon arrivée sur le
        territoire français.\n\n Si je ne croise pas d’agents des douanes au passage de la
        frontière, je peux également me rapprocher des{' '}
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
    id: 'declaration-6',
    question: 'Je ne sais pas comment déclarer ?',
    answer: (
      <div className="flex flex-col gap-2">
        <p>
          Vous pouvez d’ores et déjà simuler votre déclaration et vous adressez-vous aux services
          douaniers présent à votre arrivée sur le territoire français (dans le port, aéroport, dans
          la gare ou au point de passage routier que vous empruntez).
        </p>
        <p>
          Si vous ne croisez pas d’agents des douanes au passage de la frontière, vous pouvez
          également vous rapprocher des{' '}
          <Link
            href="https://www.douane.gouv.fr/service-en-ligne/annuaire-des-services-douaniers"
            external
          >
            <span className="text-link">services douaniers les plus proches de chez vous</span>
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    id: 'declaration-7',
    question: 'Dois-je déclarer toutes les marchandises ?',
    answer: (
      <div className="flex flex-col gap-2">
        <p>
          Certains produits que vous ramenez avec vous de l’étranger sont interdits en France et
          d’autres nécessitent l’accomplissement de formalités spécifiques.
        </p>
        <p>
          Les produits ne faisant pas partie de ces deux catégories et ayant été achetés à
          l’étranger doivent faire l’objet d’une déclaration.
        </p>
      </div>
    ),
  },
  {
    id: 'declaration-8',
    question: 'Puis-je faire une déclaration pour plusieurs personnes ?',
    answer: (
      <div className="flex flex-col gap-2">
        <p>La déclaration des produits rapportés est individuelle.</p>
        <p>
          Un objet ne peut pas être “partagé” entre deux personnes ou plus. Les franchises
          s’appliquent individuellement et ne sauraient être cumulées.
        </p>
      </div>
    ),
  },
  {
    id: 'declaration-9',
    question: 'Quelle valeur dois-je déclarer ?',
    answer: (
      <p>
        Pour déclarer un produit que vous avez acheté à l’étranger ou qui vous a été offert à
        l'étranger, vous devez déclarer la valeur à laquelle il a été acheté. Pour prouver ladite
        valeur, vous pouvez fournir tout document permettant de l’établir comme une facture par
        exemple.
      </p>
    ),
  },
  {
    id: 'declaration-10',
    question: 'J’ai perdu mes factures',
    answer: (
      <p>
        Si vous ne disposez pas d’un moyen de prouver la valeur à laquelle vous avez acheté le
        produit ou la valeur du produit que l'on vous a offert à l'étranger, rapprochez vous des
        agents douaniers présents à votre arrivée sur le territoire français pour établir la valeur
        de votre produit.
      </p>
    ),
  },
];
