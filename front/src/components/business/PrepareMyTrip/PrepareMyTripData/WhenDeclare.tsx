import { AccordionData } from '@/components/common/Accordion/Accordion';
import { Link } from '@/components/common/Link';
import { SvgIcon } from '@/components/common/SvgIcon';

export const WhenDeclare: AccordionData[] = [
  {
    id: '2',
    question: 'Quand déclarer ?',
    iconName: 'watch',
    answer: (
      <div className="mt-2 flex w-full flex-col gap-8">
        <p>
          Pour déclarer un (ou des) produit(s) que vous avez acheté(s) à l’étranger et que vous
          ramenez avec vous en France au moment de votre arrivée en France, adressez-vous aux
          services douaniers présent à votre arrivée sur le territoire français :
        </p>
        <div className="flex w-full flex-col items-center gap-14">
          <div className="flex flex-row gap-10">
            <div className="flex flex-col items-center">
              <div className="h-8 w-auto">
                <SvgIcon name="car" />
              </div>
              <label className="w-28 text-center">
                Poste
                <br /> frontière
              </label>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-8 w-auto">
                <SvgIcon name="plane" />
              </div>
              <label className="w-28 text-center">Aéroport</label>
            </div>
          </div>
          <div className="flex flex-row gap-14">
            <div className="flex flex-col items-center">
              <div className="h-8 w-auto">
                <SvgIcon name="train" />
              </div>
              <label className="w-28 text-center">Gare internationale</label>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-8 w-auto">
                <SvgIcon name="boat" />
              </div>
              <label className="w-28 text-center">Port international</label>
            </div>
          </div>
        </div>
        <div>
          Si je ne croise pas de douaniers à l’occasion de mon retour, je peux également me
          rapprocher des{' '}
          <Link
            href="https://www.douane.gouv.fr/service-en-ligne/annuaire-des-services-douaniers"
            external
          >
            <span className="text-link underline">
              services douaniers les plus proches de chez moi
            </span>
          </Link>
          .
        </div>
      </div>
    ),
  },
];
