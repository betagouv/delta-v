import { DataElement } from '..';
import Declaration from '@/assets/images/Declaration.jpg';
import Identification from '@/assets/images/Identification.jpg';
import { Link } from '@/components/common/Link';
import { Typography } from '@/components/common/Typography';

export const PrepareMyDocuments: DataElement[] = [
  {
    id: '1',
    question: 'Préparer vos documents de voyage',
    iconName: 'folder',
    answer: (
      <div className="mt-2 flex w-full flex-col gap-4">
        <p>
          Vous arrivez en France depuis l’étranger ? Vous devez être en possession de documents en
          cours de validité :
        </p>
        <div className="flex w-full items-center">
          <img src={Identification.src} />
        </div>
        <Typography weight="bold" color="secondary" textPosition="text-center">
          Votre carte nationale d’identité ou votre passeport selon votre situation.
        </Typography>
        <div>
          Pour toute question relative aux documents d’identité, aux visas ou aux autorisation de
          sortie du territoire pour les mineurs, consultez le site{' '}
          <Link href="https://www.service-public.fr/" tag="span" external>
            <span className="text-link underline">Internet service-public.fr</span>
          </Link>{' '}
          et celui du{' '}
          <Link
            href="https://www.gouvernement.fr/ministere-de-l-europe-et-des-affaires-etrangeres"
            tag="span"
            external
          >
            <span className="text-link underline">
              ministère de l’Europe et des affaires étrangères
            </span>
          </Link>
          .
        </div>
        <Typography weight="bold" color="secondary">
          Vous ramenez avec vous des marchandises depuis l’étranger et revenez en France.
        </Typography>
        <Typography color="secondary">
          Vous devez déclarer à la douane ces produits que vous transportez avec vous. Pour
          faciliter votre arrivée en France, préparez tous les documents suivants :
        </Typography>
        <div className="flex w-full items-center">
          <img src={Declaration.src} />
        </div>
        <div>
          Votre déclaration de capitaux si vous en avez et les éventuelles factures permettant de
          prouver l’achat et la valeur de ces produits.
        </div>
      </div>
    ),
  },
];
