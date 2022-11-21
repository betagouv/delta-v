import { DataElement } from '..';
import { Link } from '@/components/common/Link';

export const Payment: DataElement[] = [
  {
    id: 'payment-1',
    question: 'Pourquoi n’ai-je rien à payer ?',
    answer: (
      <>
        <p>Souvent, les produits achetés à l’étranger ne dépassent pas les limites autorisées.</p>
        <p>
          Ces limites peuvent concerner leur prix ou la quantité de ces produits ramenés en France.
          Dans ce cas, la déclaration est correctement effectuée mais vous n’avez ni droits ni taxes
          à payer sur ces produits.
        </p>
      </>
    ),
  },
  {
    id: 'payment-2',
    question: 'Comment les taxes à payer sont-elles calculées ?',
    answer: (
      <p>
        Les taxes dépendent de plusieurs critères : le prix du produit (achat ou cadeau), sa nature,
        le pays où il a été acheté/offert… Le simulateur DéclareDouane vous permet justement
        d’estimer les éventuels droits et taxes que vous auriez à payer selon ces critères.
      </p>
    ),
  },
  {
    id: 'payment-3',
    question: 'Quelles sont les taxes à payer ?',
    answer: (
      <p>
        Selon les produits que vous ramenez de l’étranger et les critères de ceux-ci (prix, nature,
        pays d’origine…), vous pouvez être amenés à régler différentes droits et taxes : TVA, droits
        de douane, taxes spécifiques selon les produits...
      </p>
    ),
  },
  {
    id: 'payment-4',
    question: 'Comment payer les droits et taxes ?',
    answer: (
      <div className="flex flex-col">
        <p>
          Pour procéder au paiement des éventuels droits et taxes à payer sur les produits que vous
          ramenez avec vous de l'étranger, rapprochez vous des agents douaniers présents à votre
          arrivée sur le territoire française. Si vous ne croisez pas d’agents des douanes à votre
          passage de la frontière, vous pouvez également vous rapprocher des{' '}
          <Link
            href="https://www.douane.gouv.fr/service-en-ligne/annuaire-des-services-douaniers"
            tag="span"
            external
          >
            <span className="text-link">services douaniers les plus proches de chez vous</span>
          </Link>
          .
        </p>
        <p className="mt-4 mb-1">Le règlement des sommes à payer peut :</p>
        <div>
          <ul className="ml-5 list-outside list-disc">
            <li>
              dans certains cas être réalisé par des prestataires (qui vous facturent dès lors les
              droits et taxes acquittés);
            </li>
            <li>être réglés par vous-mêmes.</li>
          </ul>
        </div>
        <p className="mt-4 mb-1">Exemples :</p>
        <ul className="ml-5 list-outside list-disc">
          <li>
            importation de biens en provenance de pays tiers dont le montant dépasse les seuils des
            franchises voyageurs,
          </li>
          <li>
            dédouanement d’un véhicule dans le cadre d’un achat ou d’un déménagement pour une
            résidence secondaire,
          </li>
          <li>
            achats dans un autre pays de l’Union européenne de biens soumis à droits d’accise dans
            des quantités supérieures aux seuils admis,
          </li>
          <li>amendes, etc.</li>
        </ul>
        <p className="mt-4 mb-1">
          Les moyens de paiement mis à votre disposition par la Douane sont alors les suivants :
        </p>
        <ul className="ml-5 list-outside list-disc">
          <li>
            la carte bancaire, via l’utilisation d’un terminal de paiement électronique (TPE) dans
            un service douanier (à partir de 1 500 euros, vous devrez signer la facturette).
          </li>
          <li>
            le chèque, avec production d’un chèque de banque pour le règlement des créances dont le
            montant est supérieur à 1 500 euros.
          </li>
          <li>
            le numéraire (espèces), lorsque le montant de la créance n’excède pas 1 000 euros.
          </li>
        </ul>
      </div>
    ),
  },
];
