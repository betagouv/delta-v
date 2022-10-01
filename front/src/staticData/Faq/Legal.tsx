import { DataElement } from '..';

export const Legal: DataElement[] = [
  {
    id: 'legal-1',
    question: 'Pourquoi les contrefaçons sont-elles interdites ?',
    answer: (
      <p>
        Il est interdit de rapporter, avec vous, des contrefaçons car ces produits sont souvent
        dangereux pour vous ou pour vos proches : vêtements aux matières irritantes pour la peau,
        jouets inflammables pour les enfants, médicaments dangereux pour la santé…
      </p>
    ),
  },
  {
    id: 'legal-2',
    question:
      'Pourquoi certains végétaux et produits végétaux sont-ils interdits ou soumis à contrôle ?',
    answer: (
      <p>
        Il est interdit de ramener certains végétaux ou produits végétaux car ces derniers peuvent
        être dangereux pour votre santé ou pour l’écosystème français. Certains de ces produits sont
        soumis à des formalités particulières.
      </p>
    ),
  },
  {
    id: 'legal-3',
    question: 'Pourquoi je ne peux pas rapporter n’importe quelle marchandise ?',
    answer: (
      <p>
        Il n’est pas possible de ramener certains produits en France car leur usage y est
        strictement interdit : stupéfiants et psychotropes (sauf exception), contrefaçon , chiens
        d’attaque, certains végétaux , certaines espèces animales et végétales sauvages, produits et
        objets comportant des images ou représentation de mineurs à caractère pornographique.
      </p>
    ),
  },
  {
    id: 'legal-4',
    question: 'Qu’est ce que je risque si j’oublie de déclarer ?',
    answer: (
      <div className="flex flex-col gap-2">
        <p>
          Si vous oubliez de déclarer ou si vous dépassez certaines quantités autorisées (notamment
          pour le tabac ou l'alcool), les sanctions sont les suivantes :
        </p>
        <ul className="ml-5 list-outside list-disc">
          <li>
            droits de consommation à payer (par exemple : 210 € si vous rapportez 5 cartouches de
            cigarettes)
          </li>
          <li>amende jusqu'à 750 €</li>
          <li>
            confiscation de vos produits (notamment de tabac ou d'alcool au-delà des limites
            autorisées)
          </li>
          <li>
            saisie et confiscation de votre véhicule personnel ayant servi au transport des
            marchandises
          </li>
          <li>peine de prison d'un an</li>
        </ul>
      </div>
    ),
  },
];
